Ext.define('Gvsu.modules.cabinet.controller.Cabinet',{
    extend: "Core.Controller"
    
    ,publicMethods: {
        dashboard: 'User dashboard'
    }
    
    ,dashboard: function(params, cb) {
        var me = this
            ,data = {status: false, user: {}, doc_days: ''};

console.log('Dashboard');
            
        [
            // Getting user profile
            function(next) {
                params.cookies.auth = '?'
                me.callModel('Gvsu.modules.users.model.User.getInfo', params.cookies, function(user) {
                    data.user = user
                    next()
                })
            }
            
            // Посмотрим какой документ скоро нужно продлевать
            ,function(next) {
                params.cookies.auth = '?'
                me.callModel('Gvsu.modules.docs.model.Docs.getDocDays', params.cookies, function(days) {
                    data.doc_days = days
                    next()
                })
            }
            
            ,function() {
                me.tplApply('.cabinet', data, cb)        
            }
        ].runEach()
    }
    
    
})