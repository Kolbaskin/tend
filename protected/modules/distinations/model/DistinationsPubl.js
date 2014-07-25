Ext.define('Gvsu.modules.distinations.model.DistinationsPubl', {    
    extend: "Core.data.DataModel"
    
    ,setWorksList: function(params, cb) {
         
        var me = this;
        
        [
            function(next) {
                if(params && params.auth) {
                    me.src.db.collection('gvsu_users').findOne({_id: params.auth},{org: 1},function(e, user) {
                        if(!user) 
                            cb();
                        else
                            next(user.org)
                    })
                } else {
                    cb()    
                }
            }
            
            ,function(org) {
                me.src.db.collection('gvsu_orgs').update({_id: org}, {$set:{distinations: params.works.join(',')}}, function() {
                    cb()   
                })
            }
        ].runEach()
            
    }
    
    ,getWorksList: function(params, cb) {
         
        var me = this
            ,checkedItems = [];
         
        [
            function(next) {
                if(params && params.auth) {
                    
                    me.src.db.collection('gvsu_users').findOne({_id: params.auth},{org: 1},function(e, user) {
                        if(!user) {
                            next();
                            return;
                        }
                        me.src.db.collection('gvsu_orgs').findOne({_id: user.org},{distinations: 1},function(e, org) {
                            if(org && org.distinations) {
                                checkedItems = org.distinations.split(',')
                                checkedItems.each(function(row) {
                                    return parseInt(row)
                                }, true)
                            }
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
                            work.checked = (checkedItems.indexOf(work._id) != -1)

                            item.works.push(work)
                        }
                    })
                    return item
                }, true)  
                cb(items)
            }
            
        ].runEach()
    }
});
     