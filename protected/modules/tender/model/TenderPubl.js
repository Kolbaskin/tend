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
                            if(!item.name) item.name = tenders[i].name;
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
                cb(list)
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
                next()
            }
            
            ,function(next) {
                me.src.db.collection('gvsu_orgs').findOne({_id: params.pageData.user.org}, {name: 1}, function(e,d) {
                    if(d) bid.orgname = d.name
                    next()
                })
            }
            
            ,function( next) {
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
                if(params.files && params.files.file)
                    me.saveBidFile(bid._id, params.files.file, next)
                else
                    next()
            }
            
            ,function() {
                cb(bid)
            }
        ].runEach();
    }
    
    ,saveBidFile: function(bidId, file, cb) {
        var me = this;
         
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
            
            ,function(files, dirToClear, next) {
                cb()
            }
        ].runEach();
    }
     
    ,getWinners: function(params, cb) {
        cb([])    
    }
});