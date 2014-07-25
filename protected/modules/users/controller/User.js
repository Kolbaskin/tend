Ext.define('Gvsu.modules.users.controller.User',{
    extend: "Core.Controller"
    
    ,profile: function(params, cb) {
        var me = this;
        [
            function(next) {
                params.cookies.auth = '?'
                me.callModel('Gvsu.modules.users.model.User.getInfo', params.cookies, function(user) {
                    me.tplApply('.profile', user, cb)
                })
            }
        ].runEach();
    }
    
    ,$saveProfile: function() {
        var me = this;
        this.params.gpc.auth = '?'
        me.callModel('.User.registration', this.params.gpc, function(res) {
            me.sendJSON(res.errors)
        }) 
    }
    
    ,regform: function(params, cb) {  
        //this.callModel('.OrgsPubl.test').toTemplate('.registration', cb)
        this.tplApply('.registration', {}, cb)
    }
    
    /**
     * @method
     * AJAX API method for user registration
     */
    ,$registration: function() { 
        var me = this;
        me.callModel('.User.registration', this.params.gpc, function(res) {
            if(res.success) {
                res.values.host = me.request.headers.host;
                me.tplApply('.activateMail', res.values, function(html) {
                    me.src.mailTransport.sendMail({
                        from: me.config.messages.activateMailFrom,
                        to: res.values.email,
                        subject: me.config.messages.activateMailSubject,
                        html: html
                    })
                })
            }                    
            me.sendJSON(res.errors)
        }) 
    }
    
    /**
     * @method
     * Show login form or activate user by link
     * 
     */
    ,login: function(params, cb) {
        var me = this;
        if(params.gpc && params.gpc._id && params.gpc.token) {
            me.callModel('.User.activate', params.gpc, function(res) {
                me.tplApply('.loginForm', res, cb)
            })
        } else {
            me.tplApply('.loginForm', {success: false}, cb)
        }
    }
    
    ,$login: function() {
        var me = this; 
        
        me.callModel('Admin.model.User.getAutorization', {
            collection: 'gvsu_users', 
            find: {login: me.params.gpc.login}, 
            password: me.params.gpc.pass,
            passField: 'password',
            lifetime: 60000
        }).sendJSON()        
    }
    
    ,$changePassword: function(params, cb) {
        var me = this;
        if(me.params.gpc && me.params.gpc.oldPassword && me.params.gpc.newPassword) {
            me.params.gpc.auth = '?'
            me.callModel('.User.changePassword', me.params.gpc).sendJSON()
        } else {
            me.sentJSON({success: false})
        }    
    }
        
})