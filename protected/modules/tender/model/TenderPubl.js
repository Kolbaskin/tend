var fs = require("fs")
    ,exec = require('child_process').exec;

Ext.define('Gvsu.modules.tender.model.TenderPubl', {    
     extend: "Core.data.DataModel"
     
     ,getDistinations: function(cb) {
         var me = this;
         
         [
            function(next) {
                me.src.db.collection('gvsu_distworks').find({}, {_id:1, pid: 1, name: 1})
                .toArray(function(e,data) {
                    if(data) next(data) 
                    else cb([])
                })
            }
            ,function(works, next) {
                me.src.db.collection('gvsu_distinations').find({}, {_id:1, name: 1})
                .toArray(function(e,data) {
                    if(data) next(works, data) 
                    else cb([])
                })
            }
            ,function(works, dists) {
                var out = {}
                works.each(function(work) {
                    for(var i=0;i<dists.length;i++) {
                        if(dists[i]._id == work.pid) {
                            out[work._id] = {dist: dists[i].name, work: work.name}
                            break;
                        }
                    }
                }) 
                cb(out)
            }
         ].runEach()
     }
     
     ,getOpened: function(params, cb) {
        var me = this;
        
        [
            // Прочитаем все активные тендеры
            function(next) {
                var curDate = Ext.Date.format(new Date(), 'Y-m-d');
                
                me.src.db.collection('gvsu_tender').find(
                {
                    publ: 1, 
                    date_doc: {$gte: curDate}
                },{
                    _id: 1,
                    name: 1,
                    date_doc: 1
                })
                .sort({date_doc: 1})
                .toArray(function(e, data) {
                    if(data && data.length) next(data)
                    else cb([])
                })
            }
            
            // Выберем предметы активных тендеров
            ,function(list, next) {
                var ids = []
                list.each(function(item) {ids.push(item._id)})
                me.src.db.collection('gvsu_tendersubj').find({pid: {$in: ids}}, {pid: 1, object: 1, dist: 1, name: 1})
                .sort({indx: 1})
                .toArray(function(e, data) {
                    if(data && data.length) next(list, data)
                    else cb(list)
                })
            }
            
            // Соединим предметы с тендерами
            ,function(tenders, subjects, next) {
                subjects.each(function(item) {
                    for(var i=0;i<tenders.length;i++) {
                        if(tenders[i]._id == item.pid) {
                            //if(!item.name) 
                            item.name = tenders[i].name;
                            item.date_doc = tenders[i].date_doc;
                            break;
                        }
                    }
                    return item;
                }, true) 
                next(subjects)
            }
            
            ,function(list, next) {
                me.getDistinations(function(works) {
                    list.each(function(item) {
                        if(works[item.dist]) {
                            item.cat_name = works[item.dist].dist
                            item.work_name = works[item.dist].work
                        }
                        return item;
                    }, true)  
                    next(list)
                })    
            }
            
            ,function(list, next) {
                var log, out = []
                for(var i=0;i<list.length;i++) {
                    for(var j=0;j<out.length;j++) {
                        if(out[j].pid == list[i].pid) break;    
                    }
                    if(j==out.length) {
                        out.push(list[i])
                        out[j].c_name = []
                        out[j].w_name = []
                    }
                    out[j].c_name.push(list[i].cat_name)
                    out[j].w_name.push(list[i].work_name)
                }
                cb(out)
            }
            
        ].runEach()

     }
     
     ,getTender: function(params, cb) {
         var me = this;
         [
            // Прочитаем все активные тендеры
            function(next) {
                me.src.db.collection('gvsu_tender').findOne(
                {
                    publ: 1, 
                    _id: params._id
                }, {}, function(e, data) {
                    if(data) next(data)
                    else cb()
                })
            }
            
            // Выберем предметы активных тендеров
            ,function(data, next) {
                me.src.db.collection('gvsu_tendersubj').find({pid: data._id}, {object: 1, dist: 1})
                .sort({indx: 1})
                .toArray(function(e, subjects) {
                    if(subjects && subjects.length) next(data, subjects)
                    else cb()
                })
            }
                        
            ,function(data, subjects, next) {
                data.objects = []
                data.dists   = []
                data.works   = []
                
                me.getDistinations(function(works) {
                    subjects.each(function(item) {
                        if(works[item.dist]) {
                            if(data.objects.indexOf(item.object) == -1) data.objects.push(item.object)
                            if(data.dists.indexOf(works[item.dist].dist) == -1) data.dists.push(works[item.dist].dist)
                            if(data.works.indexOf(works[item.dist].work) == -1) data.works.push(works[item.dist].work)
                        }
                    })  
                    next(data)
                })    
            }
            
            ,function(data, next) {
                cb(data)
            }
        ].runEach();
     }
     
     ,checkAccess: function(params, cb) {
         var me = this;
         
         [
             function(next) {
                if(!params.user) cb(false)
                else next()
             }
             
             // Проверим по датам
             ,function(next) {
                 var cd = new Date()
                 if(params.tender.date_doc < cd || params.tender.date_fin < cd || params.tender.date_start > cd)
                    cb(false)
                 else
                    next()
             }
             
             // сверим размеры СРО организации и тендера
             ,function(next) {
                 me.src.db.collection('gvsu_orgs').findOne({_id: params.user.org}, {sro: 1}, function(e, org) {
                     if(org) {
                         org.sro = parseInt(org.sro)
                         params.tender.min_sro = parseInt(params.tender.min_sro)
                         
                         if(!org.sro && org.sro !== 0) next()
                         else
                         if(params.tender.min_sro && params.tender.min_sro > org.sro) cb(false)
                         else next()
                     }
                     else cb(false)
                 })
             }
             
             // проверим наличие необходимых направлений
             ,function(next) {
                 me.src.db.collection('gvsu_worksorg').find({pid: params.user.org, status: 2}, {workid: 1}).toArray(function(e, works) {
                     allowedWorks = []
                     works.each(function(work) {
                         allowedWorks.push(work.workid)   
                     })
                     next(allowedWorks)
                 })   
             }
             
             ,function(allowedWorks) {
                 me.src.db.collection('gvsu_tendersubj').find({pid: params.tender._id}, {dist: 1}).toArray(function(e, dists) { 
                    if(dists) for(var i=0;i<dists.length;i++) {
                        if(allowedWorks.indexOf(dists[i].dist) == -1) {
                            cb(false)
                            return;
                        }
                    }
                    cb(true)
                 })
             }
         ].runEach()
     }
     
    ,saveBid: function(params, cb) {
        var me = this
            ,bid = {}
            ,tenderId = parseInt(params.pageData.page);
         
        var docs = Ext.create('Gvsu.modules.docs.model.Docs', {src: me.src, config: me.config});
         
        [  
            // Сохраним строковые данные
            function(next) {
    
                if(!params.pageData.user || isNaN(tenderId))
                    cb({})
                else
                    next()
            }
                    
            ,function(next) {
                bid = {
                    date_start: new Date(params.gpc.date_start)
                    ,date_fin: new Date(params.gpc.date_fin)
                    ,price_pos: params.gpc.price_pos
                    ,price_full: params.gpc.price_full
                    ,conditions_advance: params.gpc.conditions_advance
                    ,max_contract_val: params.gpc.max_contract_val
                    ,notes: params.gpc.notes
                    ,file_descript: params.gpc.file_descript     
                }
                if(params.files && params.files.file)
                    bid.file_name = params.files.file.name
                if(params.files && params.files.file1)
                    bid.file1_name = params.files.file1.name
                next()
            }
            
            ,function(next) {
                me.src.db.collection('gvsu_orgs').findOne({_id: params.pageData.user.org}, {name: 1}, function(e,d) {
                    if(d) bid.orgname = d.name
                    next()
                })
            }
            
            ,function( next) {
                bid.status = 0
                me.src.db.collection('gvsu_tenderbid').findOne({pid: tenderId, orgid: params.pageData.user.org}, {_id: 1}, function(e,d) {
                    if(d && d._id) {
                        me.src.db.collection('gvsu_tenderbid').update({_id: d._id}, {$set: bid}, function(e,dd) {
                            bid._id = d._id
                            me.changeModelData('Gvsu.modules.tender.model.BidModel', 'upd', bid)
                            next()    
                        })
                    } else {
                        bid.pid = tenderId
                        bid.orgid = params.pageData.user.org
                        me.src.db.collection('gvsu_tenderbid').insert(bid, function(e,d) {
                            if(d && d[0] && d[0]._id) {
                                bid._id = d[0]._id 
                                me.changeModelData('Gvsu.modules.tender.model.BidModel', 'ins', bid)
                                next()
                            } else cb({})
                        })
                    }
                })
            }
            
            ,function(next) {
                if(params.files && params.files.file && params.files.file.size)
                    me.saveBidFile(bid._id, params.files.file, 'bid-', next)
                else
                    next()
            }
            
            ,function(next) {
                if(params.files && params.files.file1 && params.files.file1.size)
                    me.saveBidFile(bid._id, params.files.file1, 'bid1-', next)
                else
                    next()
            }
            
            ,function() {
                cb(bid)
            }
        ].runEach();
    }
    
    ,saveBidFile: function(bidId, file, dName, cb) {
        
        var me = this
            ,filesTmp
            ,dirTmp
            ,dir = me.config.userDocDir + '/' + dName + bidId;
         
        var docs = Ext.create('Gvsu.modules.docs.model.Docs', {src: me.src, config: me.config});
         
        [  
            function(next) {
                var ex = docs.getFileExt(file.name);
                if(['zip', 'gz', 'tar', 'rar', '7z'].indexOf(ex) != -1) {
                    docs.unArchivate(file, ex, function(files) {
                        docs.convert(files, next)
                    })
                } else {
                    docs.convert([file], next)
                }
            }
            
            // Почистим старые файлы заявки (если есть)
            ,function(files, dirToClear, next) {
                filesTmp = files;
                dirTmp = dirToClear;
                fs.exists(dir, function(ex) {
                    if(ex) {
                        exec('rm -R ' + dir, function() {
                            next()    
                        })    
                    } else {
                        next()
                    }
                })
            }
            
            // создаем каталог для файлов заявки
            ,function(next) {
                fs.mkdir(dir, function(e, d) {
                    next()
                })                
            }
            
            // копируем исходный файл
            ,function(next) {
                fs.rename(file.path, dir + '/' + file.name, function(e, d) {
                    next() 
                })               
            }
            
            // копируем файлы превью
            ,function(next) {   
                var func = function(i) {
                    if(i>=filesTmp.length) {
                        next() 
                        return;
                    }
                    fs.rename(filesTmp[i], dir + '/' + i + '.png', function(e, d) {
                        func(i+1)    
                    })
                }
                func(0)
            }
            
            // почитсим временный каталог
            ,function() {
                if(dirTmp && dirTmp.length) {
                    var func = function(i) {
                        if(i>=dirTmp.length) return;
                        exec('rm -R ' + dirTmp[i], function() {
                            func(i+1)    
                        })
                    }
                    func(0)
                }
                cb()
            }
            
        ].runEach();
    }
    
    ,getMyBid: function(params, cb) {
        this.src.db.collection('gvsu_tenderbid').findOne({pid: params.tender, orgid: params.org}, {}, function(e,d) {
            cb(d)    
        })
    }
     
    ,getWinners: function(params, cb) {
        var me = this;
        
        [
            // Прочитаем последних 10 победителей
            function(next) {
                me.src.db.collection('gvsu_tenderbid').find({winner: 1}, {pid: 1, orgname: 1}).sort({mtime: -1}).limit(10).toArray(function(e, winners) {
                    if(winners) next(winners)
                    else cb([])
                })
            }
            
            // Прочитаем тендеры победителей
            ,function(winners, next) {
                var ids = []
                winners.each(function(w) {ids.push(w.pid)})
                me.src.db.collection('gvsu_tender').find({_id: {$in: ids}}, {_id: 1, name: 1}).toArray(function(e, tenders) {
                    if(tenders)  {
                        winners.each(function(w) {
                            for(var i=0;i<tenders.length;i++) {
                                if(tenders[i]._id == w.pid) {
                                    w.name = tenders[i].name;
                                    break;
                                }
                            }
                            w.dist = []
                            w.object = []
                            return w;
                        }, true)
                        next(winners, ids)
                    } else cb([])
                })
            }
            
            // прочитаем объекты и коды направлений и видов работы
            // Выберем предметы активных тендеров
            ,function(winners, ids, next) {
                me.src.db.collection('gvsu_tendersubj').find({pid: {$in: ids}}, {pid: 1, object: 1, dist: 1})
                .sort({indx: 1})
                .toArray(function(e, data) {
                    if(data && data.length) next(winners, data)
                    else cb([])
                })
            }
            
            // Соединим предметы с тендерами
            ,function(winners, subjects, next) {
                winners.each(function(w) {
                    for(var i=0;i<subjects.length;i++) {
                        if(subjects[i].pid == w.pid) {
                            w.object.push(subjects[i].object);
                            w.dist.push(subjects[i].dist);
                            break;
                        }
                    }
                    return w;
                }, true) 
                next(winners)
            }
            
            ,function(winners, next) {
                me.getDistinations(function(works) {
                    winners.each(function(w) {
                        w.cat_name = []
                        w.work_name = []
                        w.dist.each(function(d) {
                            if(works[d]) {
                                if(w.cat_name.indexOf(works[d].dist) == -1)
                                    w.cat_name.push(works[d].dist);
                                if(w.work_name.indexOf(works[d].work) == -1)
                                    w.work_name.push(works[d].work);
                            }
                        })
                        return w;
                    }, true)  
                    next(winners)
                })    
            }
            
            
            ,function(winners) {
                cb(winners)
            }
        ].runEach()
        
    }
});