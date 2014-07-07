var validator = require('yode-validator');

Ext.define('Gvsu.modules.orgs.model.OrgsPubl', {    
     extend: "Gvsu.modules.orgs.model.OrgsModel"
    
    ,regPatterns: {
        login: [/^[a-z0-9_а-яА-Я]{3,12}$/i, true]
        ,email: ['email', true]
        ,password: ['password', true]
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
                me.src.db.collection('gvsu_users').findOne({$or: [{login: res.values.login}, {email: res.values.email}]}, {_id: 1}, function(e,d) {
                    if(d && d._id) {
                        res.errors = {login:'dbl'}
                        cb(res)
                    } else {
                        next()                        
                    }
                })    
            }
            ,function(next) {
                res.values.token = Math.random()
                me.passwordField.getValueToSave(res.values.password, function(pass) {
                    next(pass)
                })
            }
            ,function(pass) {
                var svPass = res.values.password + ''
                res.values.password = pass
                res.values.activated = false
                me.src.db.collection('gvsu_users').insert(res.values, function(e,d) {
                    if(d && d[0] && d[0]._id) {
                        res.values._id = d[0]._id
                        res.values.password = svPass
                        res.success = true
                    }
                    cb(res)
                })    
            }
        ].runEach()
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
})