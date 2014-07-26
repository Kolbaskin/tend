var validator = require('yode-validator');

Ext.define('Gvsu.modules.orgs.model.OrgsPubl', {    
    extend: "Gvsu.modules.orgs.model.OrgsModel"
    
    ,regPatterns: {
        name: ['name', false]
        ,fullname: ['name', false]
        ,headers: ['string', false]
        ,founders: ['string', false]
        ,inn: ['number', false]
        ,kpp: ['number', false]
        ,ogrn: ['number', false]
        ,legal_address: ['string', false]
        ,fact_address: ['string', false]
        ,www: ['string', false]
        ,contact_person: ['name', false]
        ,headers_phones: ['phone', true]
        ,phone: ['phone', true]
        ,email: ['email', true]
        ,sro: ['number', false]
        ,info: ['string', false]
    }
    
    ,getInfo: function(params, cb) {
        var me = this;
        [
            function(next) {
                if(!params.auth) 
                    cb(null, {code: 401})
                else
                    next()
            }
            ,function(next) {
                me.src.db.collection('gvsu_users').findOne({_id: params.auth}, {org: 1}, function(e,d) {
                    if(d && d.org) 
                        next(d.org)
                    else
                        cb({})
                })
            }
            ,function(org_id) {
                me.src.db.collection('gvsu_orgs').findOne({_id: org_id}, {}, function(e,d) {
                    cb(d)
                })
            }
        ].runEach()
    }
    
    ,saveInfo: function(params, cb) {
        var me = this
            ,res = validator.validateAll(this.regPatterns, params)
        
        res.success = false;
        
        [
            function(next) {
                if(!params.auth) {
                    cb({success: false})   
                } else
                    next()
            }
            ,function(next) {
                if(!res.errors) {
                    next()   
                } else {
                    cb(res)
                }
            }
            // Looking for user's organisation
            ,function(next) {
                me.src.db.collection('gvsu_users').findOne({_id: params.auth}, {org: 1}, function(e,d) {
                    if(d) 
                        next(d.org) 
                    else {
                        cb({success: false})
                    }
                })
            }
            
            ,function(org, next) {
                var find = {$or: [{name: res.values.name}, {fullname: res.values.fullname}, {inn: res.values.inn}]};
                
                if(org) find._id = {$ne: org}
                
                me.src.db.collection('gvsu_orgs').findOne(find, {_id: 1}, function(e,d) {
                    if(d && d._id) {
                        res.errors = {name:'dbl'}
                        cb(res)
                    } else {
                        next(org)                        
                    }
                })    
            }
            ,function(org, next) {
                res.values.active = false
                if(org) {
                    me.src.db.collection('gvsu_orgs').update({_id: org}, {$set:res.values}, function(e,d) {
                        next(org, false)
                    })
                } else {
                    me.src.db.collection('gvsu_orgs').insert(res.values, function(e,d) {
                        if(d && d[0] && d[0]._id) {
                            next(d[0]._id, true)
                        }
                    })    
                }
            }
            ,function(org, log, next) {
                var vals = {status: false}
                if( log ) vals.org = org
                me.src.db.collection('gvsu_users').update({_id: params.auth}, {$set: vals}, function(e,d) {
                    next(org)
                })    
            }
            ,function(org) {
                me.markAsModerate({org: org})
                cb(res)
            }
        ].runEach()
    }
    
    ,markAsModerate: function(params, cb) {
        var me = this;
        
        [
            function(next) {
                if(params && params.org) {
                    me.src.db.collection('gvsu_orgs').findOne({_id: params.org}, {}, function(e,org) {
                        next(org)
                    })
                } else if(!!cb) cb()
            }
            
            ,function(org, next) {
                me.src.db.collection('gvsu_orgs').update({_id: org._id}, {$set:{active: 0}}, function(e,d) {
                    org.active = 0
console.log('changeModelData:', org)
                    me.changeModelData('Gvsu.modules.orgs.model.OrgsModel', 'ins', org)
                    if(!!cb) cb()
                })
            }
            
        ].runEach()
  
    }
})