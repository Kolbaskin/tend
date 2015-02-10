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
        ,contact_person: ['string', false]
        ,headers_phones: ['string', false]
        ,phone: ['string', false]
        ,email: ['email', false]
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
                me.markAsModerate({org: org}, null, 0)
                cb(res)
            }
        ].runEach()
    }
    
    ,markAsModerate: function(params, cb, active) {
        var me = this;
        
        [
            function(next) {
                if(params && params.org) {
                    me.src.db.collection('gvsu_orgs').findOne({_id: params.org}, {}, function(e,org) {
                        if(active === null) active = org.active;
                        next(org)
                    })
                } else if(!!cb) cb()
            }
            
            // проверим, все ли документы в наличии и не устарели
            ,function(org, next) {
                me.callModel('Gvsu.modules.docs.model.Docs.checkOrgDocs', {org: org._id}, function(log) {
                    org.docsComplite = log
                    next(org)
                })
            }
            
            // проверим выбрано ли хотя бы одно направление
            ,function(org, next) {
                me.callModel('Gvsu.modules.distinations.model.DistinationsPubl.checkOrgDist', {org: org._id}, function(log) {
                    org.distComplite = log
                    next(org)
                })
            }
            
            ,function(org, next) {
                me.src.db.collection('gvsu_orgs').update({_id: org._id}, {$set:{active: active}}, function(e,d) {
                    org.active = active
                    me.changeModelData('Gvsu.modules.orgs.model.OrgsModel', 'ins', org)
                    if(!!cb) cb()
                    next(org)
                })
            }
            
            ,function(org) {
                if(org.docsComplite && org.distComplite) {
                    me.sendMessageToModerator(org)    
                }
            }
            
        ].runEach()
  
    }
    
    ,sendMessageToModerator: function(org) {
        var me = this;

        org.url = 'http://' + me.request.headers.host + '/admin/#' + encodeURIComponent(JSON.stringify({
           controller: 'Gvsu.modules.orgs.controller.Orgs',
           data: {
               _id: org._id,
               name: org.name
           }
        }))
       
        me.callModel('Gvsu.modules.mail.controller.Mailer.orgActivateRequest', org, function() {

        })  
        
    }
    
    // Проверка статусов организаций
    ,checkOranisationsStatus: function() {
        var me = this;
        [
            function(next) {
                me.checkOranisationsStatusDay(3, 2, next)
            }
            ,function(next) {
                me.checkOranisationsStatusDay(15, 1, next)
            }
            ,function(next) {
                me.checkOranisationsStatusDay(30, 0, function() {
                        
                })
            }
        ].runEach()
        
    }
    
    ,checkOranisationsStatusDay: function(days, warn, cb) {
        var me = this;
        
        [
            // ищем доки за 30 дней до конца
            function(next) {
                
                var dt = new Date((new Date()).getTime() + days*24*3600000)
                me.src.db.collection('gvsu_userdocs').find({date_fin: {$lte: Ext.Date.format(dt, 'Y-m-d')}}, {}, function(e,d) {
                    if(d && d.length) {
                        var out = [], delta = 24*3600000;
                        d.each(function(r) {
                            if((r.date_fin.getTime() - r.date_add.getTime())>delta) out.push(r)    
                        })
                        next(out)    
                    } else cb()
                })
            }
            
                    
            ,function(docs, next) {
                var ids = []
                docs.each(function(r) {if(ids.indexOf(r.org) == -1) ids.push(r.org)})
                me.src.db.collection('gvsu_orgs').find({_id: {$in: ids}}, {_id: 1, email: 1}, function(e,d) {
                    if(d && d.length) {
                        next(docs, d)    
                    } else cb()
                })
            }
            
            // Удалим документы с истекшим сроком годности
            ,function(docs, orgs, next) {
                me.checkDeprecatedDocs(docs, orgs, next)    
            }
            
            ,function(docs, orgs, next) {
                var out = []
                orgs.each(function(o) {
                    o.docs = []
                    for(var i=0;i<docs.length;i++) {
                        if(docs[i].warn<warn && docs[i].org == o._id) {
                            o.docs.push(docs[i].doc_name)
                        }
                    }
                    if(o.docs.length) out.push(o)
                })
                next(out, docs)
            }
            
            ,function(orgs, docs, next) {
                me.callModel('Gvsu.modules.mail.controller.Mailer.orgStatusDay', {
                    orgs: orgs,
                    warn: warn
                }, function() {
                    next(docs)
                })     
            }
            ,function(docs) {
                var ids = []
                docs.each(function(r) {ids.push(r._id)})
                me.src.db.collection('gvsu_userdocs').update({_id: {$in: ids}}, {$set: {warn: (warn+1)}}, function(e,d) {
                    cb()
                })
            }
        ].runEach()
    }
    
    ,checkDeprecatedDocs: function(docs, orgs, cb) {
        var me = this
            ,delIds = []
            ,normDocs = []
            ,now = new Date();
        
        [
            function(next) {
                docs.each(function(d) {
                    if(d.date_fin<now) {
                        delIds.push(d)    
                    } else {
                        normDocs.push(d)
                    }
                }) 
                next()
            }
            ,function(next) {
                if(delIds.length) next()
                else cb(docs, orgs)    
            }
            // Удалим документ
            ,function(next) {
                var f = function(i) {
                    if(i>=delIds.length) {
                        cb(normDocs, orgs)
                        return;
                    }
                    me.callModel('Gvsu.modules.docs.model.Docs.delDoc', {del: delIds[i]._id, auth: delIds[i].uid, org: delIds[i].org}, function() {
                        f(i+1)    
                    })
                }
                f(0)
            }
            
        ].runEach()
        
        
        
        
        
    }
})