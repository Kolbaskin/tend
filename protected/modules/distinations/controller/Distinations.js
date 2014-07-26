Ext.define('Gvsu.modules.distinations.controller.Distinations',{
    extend: "Core.Controller"
    
    ,categories: function(params, cb) {
        var me = this;
        [
            function(next) {

                if(params.gpc.works !== undefined) {
                    params.gpc.auth = '?'
                    params.gpc.uid = params.cookies.uid
                    params.gpc.token = params.cookies.token
                    me.callModel('.DistinationsPubl.setWorksList', params.gpc, function() {
                        next()    
                    }) 
                } else
                    next()
            }
            
            ,function(next) {
                params.cookies.auth = '?'
                me.callModel('.DistinationsPubl.getWorksList', params.cookies, function(data) {
                    me.tplApply('.distinations', {items: data}, cb)
                })
            }
        ].runEach();
    }
    
})