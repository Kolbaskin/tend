var fs = require('fs')
    ,exec = require('child_process').exec

Ext.define('Gvsu.modules.docs.model.Docs', {    
     extend: "Core.data.DataModel"
     
     ,getTypes: function(params, cb) {
         this.src.db.collection('gvsu_docstypes').find({}).sort({indx: 1}).toArray(function(e, data) {
            cb(data)    
        })
     }
     
     ,list: function(params, cb) {
         var me = this
             ,docTypes
             ,org;
         [
            function(next) {
                me.getTypes(null, next)
            }
            
            ,function(types, next) {
                docTypes = types;
                me.src.db.collection('gvsu_users').findOne({_id: params.auth}, {org: 1}, function(e, user) {
                    org = user.org
                    next()
                })
            }
            
            ,function(next) {
                me.src.db.collection('gvsu_userdocs').find({org: org}, {}, function(e, docs) {
                    next(docs)
                })
            }
            
            ,function(docs, next) {
                docs.each(function(doc) {
                    for(var i=0;i<docTypes.length;i++) {
                        if(docTypes[i]._id == doc.doc_type) {
                            doc.required = docTypes[i].required;
                            doc.days = me.calcDays(doc, docTypes[i].duration);
                            docTypes.splice(i,1)
                            break;
                        }
                    }
                    return doc;
                }, true)
                next(docs)
            }
            
            ,function(docs) {
                docTypes.each(function(dtype) {
                    docs.push({
                        doc_name: dtype.name,
                        required: dtype.required,
                        status: -1
                    })    
                })
                cb(docs)
            }
         ].runEach()
     }
     
     ,calcDays: function(doc, duration) {
        var tm = (new Date(doc.date_fin)).getTime() - (new Date()).getTime()
        if(tm<=0) return 0;
        return parseInt(tm/(3600000*24))  
     }
     
     ,getFileExt: function(fname) {
         var ex = fname.lastIndexOf('.')
         return (ex<0? '':fname.substr(ex+1).toLowerCase());
     }
     
     ,getFileName: function(fname) {
         var ex = fname.lastIndexOf('/')
         return (ex<0? '':fname.substr(ex+1));
     }
     
     ,add: function(params, cb) {
        var me = this
            ,dirsToRemove
            ,orgId
            ,date_fin = '';
        
        [
            function(next) {
                if(params.auth && params.files.file)
                    next()    
                else
                    cb({success: false})
            }
            
            // Прочитаем ID компании
            ,function(next) {
                me.src.db.collection('gvsu_users').findOne({_id: params.auth}, {org: 1}, function(e, data) {
                    if(data && data.org) {
                        orgId = data.org
                        next()
                    } else 
                        cb({success: false, mess: 'The organisation is not found.'})
                })
            }
            
            // ищем тип документа и определеяем срок действия
            ,function(next) {
                me.src.db.collection('gvsu_docstypes').findOne({_id: params.gpc.type}, {duration: 1}, function(e, d) {
                    if(d && d.duration) {
                        var date = new Date();
                        date.setTime(date.getTime() + (d.duration * 24 * 3600 * 1000));
                        date_fin = date
                    } 
                    next();
                })    
            }
            
            // Пробуем создать картинки для документов
            ,function(next) {
                var ex = me.getFileExt(params.files.file.name);
                if(['zip', 'gz', 'tar', 'rar', '7z'].indexOf(ex) != -1) {
                    me.unArchivate(params.files.file, function(files) {
                        me.convert(files, next)
                    })
                } else {
                    me.convert([params.files.file], next)
                }
            }
            
            // Добавляем запись
            ,function(files, dirToClear, next) {
                dirsToRemove = dirToClear;
                if(files && files.length) {
                    me.src.db.collection('gvsu_userdocs').insert({
                        uid: params.auth,
                        org: orgId,
                        date_add: new Date(),
                        date_fin: date_fin,
                        doc_type: params.gpc.type,
                        doc_name: params.gpc.name,
                        file_name: params.files.file.name,
                        status: 0
                    }, function(e, data) {

                        if(data && data[0]) {
                            me.changeModelData('Gvsu.modules.docs.model.OrgDocsModel', 'ins', data[0])
                            next(files, data[0])    
                        } else {
                            cb({success: false})
                        }
                    }) 
                    
                } else 
                    cb({success: false})
            }
            
            // создаем каталог
            ,function(files, data, next) {
                var dir = me.config.userDocDir + '/' + data._id
                fs.mkdir(dir, function(e, d) {
                    next(files, dir + '/')
                })
            }
            
            // Копируем исходный файл
            ,function(files, dir, next) {   
                fs.rename(params.files.file.path, dir + params.files.file.name, function(e, d) {
                    next(files, dir) 
                })
            }
            
            // копируем файлы
            ,function(files, dir, next) {   
                var func = function(i) {
                    if(i>=files.length) {
                        next() 
                        return;
                    }
                    fs.rename(files[i], dir + i + '.png', function(e, d) {
                        func(i+1)    
                    })
                }
                func(0)
            }
            
            // Удалим временные каталоги
            ,function() {
                if(dirsToRemove && dirsToRemove.length) {
                    var func = function(i) {
                        if(i>=dirsToRemove.length) return;
                        exec('rm -R ' + dirsToRemove[i], function() {
                            func(i+1)    
                        })
                    }
                    func(0)
                }
                cb({success: true})
            }
        ].runEach();
     }
     
     ,unArchivate: function(file, cb) {
         
     }
     
     ,convert: function(files, cb) {
        var me = this
            ,outFiles = []
            ,dirToClear = [];
            
        var func = function(i) {
            if(i>=files.length) {
                cb(outFiles, dirToClear)
                return
            }
            var ex = me.getFileExt(files[i].name);
            var next = function(fls, clrDir) {
                
                if(clrDir) dirToClear.push(clrDir);
                
                //fs.unlink(files[i].path, function() {
                    for(var j=0;j<fls.length;j++) {
                        outFiles.push(fls[j])
                    }
                    func(i+1)
                //})
            }
            if(['gif', 'png', 'jpg', 'bmp', 'jpeg', 'tif'].indexOf(ex) != -1) {
                me.convertImg(files[i], next)
            } else
            if(ex == 'pdf') {
                me.convertPdf(files[i], next)    
            } else {
                me.convertOffice(files[i], next)
            } 
        }
        func(0)
    }
     
    ,convertImg: function(file, cb) {
        var me = this;
        exec(me.config.convertors.img.replace('{srcPath}', file.path).replace('{distPath}', file.path + '.png'), function(e, stdout, stderr) {
            cb([file.path + '.png'])
        })
    }
     
    ,convertPdf: function(file, cb) {
        var me = this;
        [
            function(next) {
                exec(me.config.convertors.pdf2img.replace('{srcPath}', file.path).replace('{distPath}', file.path + '.png'), function(e, stdout, stderr) {
                    next()    
                })
            }
            ,function(next) {
                fs.exists(file.path + '.png', function(exists) {
                    if(exists) 
                        cb([file.path + '.png'])
                    else
                        next()
                })
            }
            ,function() {
                var out = [];
                var func = function(i) {
                    fs.exists(file.path + '-' + i + '.png', function(exists) {
                        if(exists) { 
                            out.push(file.path + '-' + i + '.png')
                            func(i+1)
                        } else
                            cb(out)
                        
                    })
                }
                func(0)
            }
        ].runEach();
    }
     
    ,convertOffice: function(file, cb) {
        var me = this;
        [
            function(next) {
                exec(me.config.convertors.office2pdf.replace('{srcPath}', file.path).replace('{distPath}', file.path + '_pdf'), function(e, stdout, stderr) {
//console.log('e:', e)  
//console.log('stdout:', stdout)  
//console.log('stderr:', stderr)  
                    next()
                })
            }
            ,function(next) {                
                me.convertPdf({
                    path: file.path + '_pdf/' + me.getFileName(file.path) + '.pdf'                    
                }, function(files) {
                    next(files)    
                })
            }
            ,function(files) {
                //exec('rm -R ' + file.path + '_pdf', function() {
                    cb(files, file.path + '_pdf')    
                //})    
            }
        ].runEach()
        
         
    }
     
})