Ext.define('Gvsu.modules.cabinet.controller.Cabinet',{
    extend: "Core.Controller"
    
    ,dashboard: function(params, cb) {
        var me = this
            ,data = {status: false, user: {}};
            
        [
            // Getting user profile
            function(next) {
                params.cookies.auth = '?'
                me.callModel('Gvsu.modules.users.model.User.getInfo', params.cookies, function(user) {
                    data.user = user
                    next()
                })
            }
            
            ,function() {
                me.tplApply('.cabinet', data, cb)        
            }
        ].runEach()
        
    }
    
    
})