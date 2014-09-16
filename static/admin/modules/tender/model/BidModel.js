Ext.define('Gvsu.modules.tender.model.BidModel', {    
     extend: "Gvsu.modules.docs.model.OrgDocsModel"
    
    ,collection: 'gvsu_tenderbid'
    
    ,dirPrefix: 'bid-'
    
    ,fields: [{
        name: '_id',
        type: 'ObjectID',
        exp: false,
        visable: true
    },{
        name: 'pid',
        exp: false,
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'orgid',
        exp: false,
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'orgname',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'file_name',
        exp: false,
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'file1_name',
        exp: false,
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'date_start',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'date_fin',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'price_pos',
        type: 'float',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'price_full',
        type: 'float',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'conditions_advance',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'max_contract_val',
        type: 'float',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'notes',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'file_descript',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'winner',
        type: 'boolean',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'status',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    }]
    
    ,$getDocPreviewCount: function(data, cb) {
        if(!data || !data._id) {
            cb({pages: 0})
            return;
        }
        var fs = require('fs')
            ,me = this
            ,pages = 0
            ,dir = me.config.userDocDir + '/bid-' + data._id + '/';
            
        var func = function(i, next) {
            fs.exists(dir + i + '.png', function(exists) {
                if(exists) {
                    pages++;
                    func(i+1, next)
                } else
                    next(pages)
            })    
        }
        func(0, function(n) {
            out = {pages: n, pages1: 0}
            pages = 0;
            dir = me.config.userDocDir + '/bid1-' + data._id + '/';
            func(0, function(n1) {
                out.pages1 = n1
                cb(out)    
            })
        })
    }
    
    ,sendWinnerLetter: function(data, cb) {
        this.runOnServer('sendWinnerLetter', data, cb)    
    }
    
    ,$sendWinnerLetter: function(params, cb) {
        var me = this;
        [
            function(next) {
                me.src.db.collection(me.collection).update({_id: parseInt(params.bid)}, {$set: {winner: 1}}, function() {next()})
            }
            ,function() {
                me.callModel('Gvsu.modules.mail.controller.Mailer.winnerLetter', params, function(list) {
                    cb({})
                })    
            }
        ].runEach();
        
    }
    
    ,$read: function(data, cb) {
        var me = this;
        data.fieldSet.push('pid');       
        [
            function(next) {
                me.getPermissions(function(permis) {
                    if(permis.read)
                        me.getData(data, function(data) {
                            next(data, permis)    
                        })
                    else
                        me.error(401)
                })
            }
            
            ,function(data, permis, next) {
                
                if(!data || !data.list || !data.list.length) {
                    cb(data)
                    return;
                }
                
                if(permis.modify)
                    cb(data)
                else
                    next(data)
            }
            
            ,function(data, next) {
                var ids = [];
                data.list.each(function(d) {if(ids.indexOf(d.pid) == -1) ids.push(d.pid)})
                me.src.db.collection('gvsu_tender').find({_id:{$in: ids}}, {date_doc: 1, _id: 1}, function(e, tends) {
                    if(tends && tends.length) 
                        next(data, tends)
                    else
                        cb(data)
                })
            }
            
            ,function(data, tends) {
                var now = new Date();
                tends.each(function(tend) {
                    if(tend.date_doc > now) {
                        data.list.each(function(item) {
                            if(item.pid == tend._id) {
                                item.orgname = '???'
                                item.price_pos = '???'
                                item.price_full = '???'
                            }
                            return item;
                        }, true)    
                    }
                })
                cb(data)
            }
            
        ].runEach()
        
        
    }
})