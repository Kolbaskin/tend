Ext.define('Gvsu.modules.distinations.model.DistinationsComboModel', {    
     extend: "Gvsu.modules.distinations.model.DistinationsModel"
    
    ,$read: function(params, cb) {
        var me = this;
        
        [
            function(next) {
                me.src.db.collection('gvsu_distinations').find({},{_id: 1, name: 1}).sort({indx: 1})
                .toArray(function(e, d) {
                    if(d && d.length)
                        next(d)
                    else
                        cb({total:0, list:''})
                })    
            }
            
            ,function(dists, next) {
                me.src.db.collection('gvsu_distworks').find({},{_id: 1, name: 1, pid: 1}).sort({indx: 1})
                .toArray(function(e, d) {
                    if(!d || !d.length) {
                        cb({total:0, list:''})
                        return;
                    }
                    d.each(function(r) {
                        for(var i=0;i<dists.length;i++) {
                            if(r.pid == dists[i]._id) {
                                if(dists[i].items === undefined) dists[i].items = []
                                dists[i].items.push(r)
                                break;    
                            }
                        }
                    })
                    next(dists)
                })    
            }
            
            ,function(dists) {
                var out = []
                
                dists.each(function(d) {
                    if(d.items) {
                        out.push({_id:0, name: d.name})
                        d.items.each(function(r) {
                            out.push({_id:r._id, name: r.name})
                        })
                    }
                })
                cb({total: out.length, list: out})
            }
            
        ].runEach()
    }
    
    
})
