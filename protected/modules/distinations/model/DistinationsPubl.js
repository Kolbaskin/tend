Ext.define('Gvsu.modules.distinations.model.DistinationsPubl', {    
    extend: "Core.data.DataModel"
    
    ,setWorksList: function(params, cb) {
         
        var me = this
            ,org;
        
        [
            function(next) {
                if(params && params.auth) {
                    me.src.db.collection('gvsu_users').findOne({_id: params.auth},{org: 1},function(e, user) {
                        if(!user) 
                            cb();
                        else {
                            org = user.org
                            next()
                        }
                    })
                } else {
                    cb()    
                }
            }
            
            ,function(next) {
                if(!Ext.isArray(params.works)) params.works = [params.works]
                for(var i=params.works.length;i>=0;i--) {
                    params.works[i] = parseInt(params.works[i])
                    if(isNaN(params.works[i])) params.works.splice(i)    
                }
                next();
            }
            
            ,function(next) {
                me.src.db.collection('gvsu_worksorg').find({pid: org}, {workid: 1}, function(e, data) {
                    next(data)   
                })
            }  
            
            ,function(oldworks, next) {
                var updates = []
                
                for(var i=oldworks.length-1;i>=0;i--) {
                    for(var j=0;j<params.works.length;j++) {
                        if(params.works[j] == oldworks[i].workid) {
                            oldworks.splice(i,1)
                            updates.push(params.works[j])
                            params.works.splice(j,1)
                            break;
                        }
                    }
                }
                next(params.works, updates, oldworks)
            }
            
            ,function(insIds, updIds, delIds, next) {
                var ins = []
                insIds.each(function(id) {
                    ins.push({pid: org, workid: id, status: 1})
                })
                me.src.db.collection('gvsu_worksorg').insert(ins, function() {
                    next(updIds, delIds)   
                })
            }
            
            ,function(updIds, delIds, next) {
                me.src.db.collection('gvsu_worksorg').update({pid: org, workid: {$in: updIds}}, {status: 1}, function() {
                    next(delIds)   
                })
            }
            
            ,function(delIds, next) {
                delIds.each(function(r) {return r.workid}, true)
                me.src.db.collection('gvsu_worksorg').remove({pid: org, workid: {$in: delIds}}, function() {
                    next()   
                })
            }
            
            ,function() {
                me.changeModelData('Gvsu.modules.distinations.model.SelWorksModel', 'ins', {})
                me.callModel('Gvsu.modules.orgs.model.OrgsPubl.markAsModerate', {org: org}, function() {})
                cb()
            }
        ].runEach()
            
    }
    
    
    
    ,getWorksList: function(params, cb) {
         
        var me = this
            ,checkedItems = [];
            
        var checkItem = function(work) {
            for(var i=0;i<checkedItems.length;i++) {
                if(checkedItems[i].workid == work._id)  {
                    work.checked = true;
                    work.notes = checkedItems[i].notes;
                    work.status = checkedItems[i].status;
                    break;
                } 
            }
            return work;
        };
         
        [
            function(next) {
                if(params && params.auth) {
                    
                    me.src.db.collection('gvsu_users').findOne({_id: params.auth},{org: 1},function(e, user) {
                        if(!user) {
                            next();
                            return;
                        }
                        me.src.db.collection('gvsu_worksorg').find({pid: user.org},{workid: 1, status: 1, notes: 1}).toArray(function(e, data) {
                            if(data) checkedItems = data
                            next()
                        })  
                    })
                } else {
                    next()    
                }
            }
            ,function(next) {
                me.src.db.collection('gvsu_distinations').find({},{_id: 1, name: 1}).sort({indx:1}).toArray(function(e, items) {
                    if(!items || !items.length) 
                        cb([])
                    else
                        next(items)
                })   
            }
            
            ,function(items, next) {
                me.src.db.collection('gvsu_distworks').find({},{_id: 1, name: 1, pid: 1}).sort({indx:1}).toArray(function(e, works) {
                    if(!works || !works.length) 
                        cb([])
                    else
                        next(items, works)
                })    
            }
            
            ,function(items, works, next) {
                items.each(function(item) {
                    item.works = []
                    works.each(function(work) {
                        if(work.pid == item._id) {
                            work.checked = false;//(checkedItems.indexOf(work._id) != -1)
                            work.notes = '';
                            work.status = 0;
                            item.works.push(checkItem(work))
                        }
                    })
                    return item
                }, true)  
                cb(items)
            }
            
        ].runEach()
    }
    
    ,checkOrgDist: function(data, cb) {
        this.src.db.collection('gvsu_worksorg').findOne({pid: data.org, status: {$ne: 3}},{_id:1},function(e, d) {
            cb(!!d._id)
        })
    }
});
     