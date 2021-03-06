var fs = require('fs');

Ext.define('Gvsu.modules.docs.controller.Docs',{
    extend: "Core.Controller"
    
    ,docs: function(params, cb) {
        var me = this;
        
        [
            function(next) {
                if(params.gpc.type) {
                    me.callModel('Gvsu.modules.docs.model.Docs.add', {
                        uid: params.cookies.uid,
                        token: params.cookies.token,
                        auth: '?',
                        gpc: params.gpc,
                        files: params.files
                    }, function(data) {
                        next(true)
                    })
                } else {
                    next(false)
                }
            }
            
            ,function(added) {
                if(params.pageData.page)
                    me.addDoc(params, cb)
                else 
                    me.docsList(params, cb)
            }
        ].runEach()
    }
    
    ,docsList: function(params, cb) {
        var me = this;
        [
            
            function(next) {
                if(params.gpc.del) {
                    params.cookies.auth = '?'
                    params.cookies.del = parseInt(params.gpc.del)
                    if(!isNaN(params.gpc.del)) {
                        me.callModel('Gvsu.modules.docs.model.Docs.delDoc', params.cookies, function(data) {
                            next()
                        })
                    } else next()
                } else next()
            }
            
            ,function(next) {
                params.cookies.auth = '?'
                me.callModel('Gvsu.modules.docs.model.Docs.list', params.cookies, function(data) {
                    
                    if(data) {
                        data.each(function(item) {
                            if(item.date_add) 
                                item.date_add = Ext.Date.format(item.date_add, 'd.m.Y')
                            if(item.date_fin) 
                                item.date_fin = Ext.Date.format(item.date_fin, 'd.m.Y')
                            return item;
                        }, true)
                    }
                    me.tplApply('.documents', {list: data}, cb)
                })
            }
        ].runEach();
    }
    
    ,addDoc: function(params, cb) {
        var me = this   
            ,type = parseInt(params.pageData.page);
        
        [
            function(add, next) {
                me.callModel('Gvsu.modules.docs.model.Docs.getTypes', {}, function(data) {
                    me.tplApply('.documentAddForm', {list:data, type: type, addStatus: add, maxSize: me.config.maxUploadSize}, cb)
                })
            }
        ].runEach()
    }
    
    ,getPermissions: function(adminId, callback) {
        var me = this
            ,mn = 'Gvsu-modules-docs-model-OrgDocsModel';      
        [
            function(call) {
                if(!adminId) 
                    callback(false)
                else
                    call()
            }
            ,function(call) {                 
                me.callModel('Admin.model.User.getUserAccessRates', {auth: adminId}, function(permis) {                   
                    if(permis) 
                        call(permis)
                    else    
                        callback(false)
                })
            }
            ,function(permis, call) {
                if(permis.superuser)
                    callback(true)
                else
                    call(permis)
            }
            ,function(permis) {
                if(permis && permis.modelAccess && permis.modelAccess[mn])
                   callback(permis.modelAccess[mn].read) 
                else 
                   callback(false) 
            }
        ].runEach()
    }
    
    ,$getDocPreview: function() {

        var me = this
            ,fs = require('fs')
            ,params = me.params;


        var error = function() {
            me.error(404)    
        };
        
        [
            function(next) {
                me.checkAuthorization(params.gpc, function(id) {
                    if(id) {
                        next(id)
                    } else
                        error(null)
                })    
            }
            
            ,function(id, next) {
                me.getPermissions(id, function(perm) {
                    if(perm)  
                        next()
                    else
                        error(null)
                })   
            }
            
            ,function(next) {
                if(params.gpc.doc) {
                    fs.exists(me.config.userDocDir + '/' + params.gpc.doc, function(exists) {
                        if(exists) next()
                        else error(null)
                    })
                } else error(null)
            }
            
            ,function(next) {
                if(params.gpc.page) {
                    fs.exists(me.config.userDocDir + '/' + params.gpc.doc + '/' + params.gpc.page + '.png', function(exists) {
                        if(exists) next()
                        else error(null)
                    })
                } else error(null)
            }
            
            ,function() {
                fs.readFile(me.config.userDocDir + '/' + params.gpc.doc + '/' + params.gpc.page + '.png', function(e, d) {
                    me.sendImage(d)    
                })
            }
        ].runEach()
    }
    
    ,$getDocSrc: function() {
        var me = this;
        
        var error = function() {
            me.error(404)    
        };
        
        [
            function(next) {
                me.checkAuthorization(me.params.gpc, function(id) {
                    if(id) {
                        next(id)
                    } else
                        error(null)
                })    
            }
            
            ,function(id, next) {
                me.getPermissions(id, function(perm) {
                    if(perm)  
                        next()
                    else
                        error(null)
                })   
            }
            
            ,function(next) {
                //me.src.db.collection('gvsu_userdocs').findOne({_id: me.params.gpc.doc}, {file_name: 1}, function(e,d) {
                    if(me.params.gpc && me.params.gpc.fn) {
                        var path = me.config.userDocDir + '/' + me.params.gpc.doc + '/' + me.params.gpc.fn;
                        fs.exists(path, function(l) {
                            if(l) {
                                next(path, me.params.gpc.fn)    
                            }
                        })
                    }
                //})    
            }
            
            ,function(path, fn) {
                me.getFileCont(path, fn, function() {
                    me.error(404)    
                })
            }
            
        ].runEach();
    }
    
    ,getFileCont: function(path, fn, callback) {
        var me = this
            ,head = {code: 200, status: 'OK', heads: {}}
            
        fs.stat(path, function(err,s) {
            if(err) {
                callback(null, {code: 404})
            } else {
                head.heads['Content-Type'] = 'application/force-download';    
                head.heads['Content-Length'] = s.size;
                head.heads['Content-Description'] = 'File Transfer';
                head.heads['Content-Disposition'] = 'attachment; filename="'+encodeURIComponent(fn)+'"'
    
                var data = fs.createReadStream(path)
                        
                me.response.writeHeader(200, head.heads);
                    
                data.on('data', function (chunk) {
                   if(!me.response.write(chunk)){
                       data.pause();
                   }
                });
                data.on('end', function () {
                   me.response.end();
    
                });
                me.response.on("drain", function () {
                   data.resume();
                });
            }
        })    
    }
    
})