var validator = require('yode-validator');

Ext.define('Gvsu.modules.users.model.User', {    
     extend: "Core.AbstractModel"
    
    ,regPatterns: {
        login: [/^[a-z0-9_а-яА-Я]{3,12}$/i, true]
        ,email: ['email', true]
        ,password: ['password', false]
        ,fname: ['name', true]
        ,name: ['name', true]
        ,sname: ['name', true]
        ,phone: ['phone', true]
        ,mobile: ['phone', true]
        ,position: ['string', true]
        ,company: ['string', true]
    }
    
    ,constructor: function(cfg) {
        this.passwordField = Ext.create('Core.fieldtype.password', {config: cfg.config})
        this.callParent(arguments)
    }
    
    

    ,registration: function(params, cb) {
        
        var me = this
            ,res = validator.validateAll(this.regPatterns, params)
        
        res.success = false;
        
        [
            function(next) {
                if(!res.errors) {
                    next()   
                } else
                    cb(res)
            }
            ,function(next) {
                var find = {$or: [{login: res.values.login}, {email: res.values.email}]};
                
                if(params.auth) find._id = {$ne: params.auth}
                
                me.src.db.collection('gvsu_users').findOne(find, {_id: 1, login: 1, email: 1}, function(e,d) {
                    if(d && d._id) {
                        res.errors = {}
                        
                        if(d.login == res.values.login) res.errors.login = 'dbl'
                        if(d.email == res.values.email) res.errors.email = 'dbl'
                        
                        cb(res)
                    } else {
                        next()                        
                    }
                })    
            }
            ,function(next) {
                if(params.auth) {
                    next(null)    
                }
                res.values.token = Math.random()
                me.passwordField.getValueToSave(res.values.password, function(pass) {
                    next(pass)
                })
            }
            ,function(pass, next) {
                if(!pass && params.auth) {
                    next()
                    return;
                }
                var svPass = res.values.password + ''
                res.values.password = pass
                res.values.activated = false
                
                me.checkCompany(res.values, function(org) {
                    
                    if(org) {
                        res.values.org = org
                        me.src.db.collection('gvsu_users').insert(res.values, function(e,d) {
                            if(d && d[0] && d[0]._id) {
                                res.values._id = d[0]._id
                                res.values.password = svPass
                                res.success = true                       
                            }
                            cb(res)
                        })   
                    } else {
                        res.errors = {company:'dbl'}
                        res.success = false
                        res.values = null
                        cb(res)    
                    }
                })
            }
            ,function(next) {
                me.src.db.collection('gvsu_users').update({_id: params.auth}, {$set:res.values}, function(e,d) {
                    res.success = true
                    next(res)
                })
            }
            
            ,function(res) {
                me.callModel('Gvsu.modules.mail.controller.Mailer.orgActivateRequest', res, function() {
                    cb(res)
                })
            }
            
        ].runEach()
    }
    
    ,checkCompany: function(data, cb) {
        var me = this;
        me.src.db.collection('gvsu_orgs').findOne({name: data.company}, {_id:1}, function(e,d) {
            if(d && d._id) cb(0)
            else {
                me.src.db.collection('gvsu_orgs').insert({name: data.company}, function(e,d) {
                    if(d && d[0] && d[0]._id) 
                        cb(d[0]._id)
                    else
                        cb(0)
                })
            }
        })    
    }
    
    ,activate: function(params, cb) {
        var me = this;
        [
            function(next) {
                me.src.db.collection('gvsu_users').findOne({_id: params._id}, {token:1, _id:1}, function(e,d) {
                    
                    if(d) next(d)
                    else cb({success: false})
                })
            }
            ,function(d, next) {
                if(params.token == d.token) {
                    me.src.db.collection('gvsu_users').update({_id: d._id}, {$set:{token: '', activated: 1}}, function(e,d) {
                        cb({success: true})
                    })
                } else {
                    cb({success: false})
                }
            }
        ].runEach()
    }
    
    ,getInfo: function(params, cb) {
        this.src.db.collection('gvsu_users').findOne({_id: params.auth}, {}, function(e,d) {
            cb(d)
        })
    }
    
    
    
    ,changePassword: function(params, cb) {
        var me = this;
        [
            function(next) {
                if(!params.auth) cb({success: false})
                else next()
            }
            ,function(next) {
                me.src.db.collection('gvsu_users').findOne({_id: params.auth}, {password: 1}, function(e, d) {
                    next(d.password)    
                })   
            }
            ,function(pass, next) {
                me.passwordField.getValueToSave(params.oldPassword, function(oldPass) {
                    if(pass == oldPass) {
                        next()
                    }
                    else cb({success: false})
                })    
            }
            ,function(next) {
                me.passwordField.getValueToSave(params.newPassword, function(newPass) {
                    next(newPass)
                })
            }
            ,function(newPass) {
                me.src.db.collection('gvsu_users').update({_id: params.auth}, {$set: {password: newPass}}, function(e, pass) {
                    cb(null)    
                })    
            }
        ].runEach()
    }
    
    ,exit: function(params, cb) {
        var me = this;
        if(params.uid && params.token) { 
            me.src.mem.get(params.token, function(e, r){
                if(r == params.uid) {    
                    me.src.mem.delete(params.token, function(e, rr){     
                        cb(true);
                    });
                } else 
                    cb(null);                
            });
        } else 
            cb(null);    
    }
})