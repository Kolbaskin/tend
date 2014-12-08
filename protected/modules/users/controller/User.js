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
        
        [
            function(next) {
                if(params.gpc && params.gpc._id && params.gpc.token) {
                    me.callModel('.User.activate', params.gpc, function(res) {
                        me.tplApply('.loginForm', res, cb)
                    })
                } else
                    next()
            }
            
            ,function(next) {
                if(params.gpc.exit) {
                    me.callModel('.User.exit', params.cookies, function() {
                        params.pageData.user = {}
                        next()
                    })
                } else 
                    next()
            }
            
            ,function(next) {
                if(params.pageData.user && params.pageData.user.login)
                    cb('')
                else
                    next()
            }
            
            ,function() {
                me.tplApply('.loginForm', {success: false, remind: (params.gpc.remind === '')}, cb)
            }
            
        ].runEach()
    }
       
    ,getLoginStatus: function(pageData, cb) {
        var me = this;
        pageData.params.cookies.auth = '?'
        me.callModel('.User.getInfo', pageData.params.cookies, function(user) {
            pageData.user = user  
            cb(pageData)
        })
    }   
       
    // Public methods -------------------------------------------------
    
    ,$login: function() {
        var me = this; 
        
        me.callModel('Admin.model.User.getAutorization', {
            collection: 'gvsu_users', 
            find: {login: me.params.gpc.login}, 
            password: me.params.gpc.pass,
            passField: 'password',
            lifetime: 60000
        }, function(data) {
            me.sendJSON(data)
        })        
    }
    
    ,$changePassword: function(params, cb) {
        var me = this;
        if(me.params.gpc && me.params.gpc.oldPassword && me.params.gpc.newPassword) {
            me.params.gpc.auth = '?'
            me.callModel('.User.changePassword', me.params.gpc).sendJSON()
        } else {
            me.sendJSON({success: false})
        }    
    }
    
    ,$remind: function() {
        var me = this;
        me.callModel('.User.remind', {
            email: me.params.gpc.remind
        }, function(data) {
            me.sendJSON(data)
        })
    }
    
    ,setNewPassword: function(params, cb) {
        var me = this;
        
        if(params.gpc.code && params.gpc._id && params.gpc.pass && params.gpc.pass == params.gpc.pass1) {
            me.callModel('.User.saveNewPassword', params.gpc, function(data) {
                params.gpc.success = true;
                me.tplApply('.newPasswordForm', params.gpc, cb)
            })
        } else {
            params.gpc.success = false;
            this.tplApply('.newPasswordForm', params.gpc, cb)
        }
    }
        
})