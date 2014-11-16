Ext.define('Gvsu.modules.tender.controller.Tender',{
    extend: "Core.Controller"
    
    ,prepDates: function(arr, fields) {
        if(!Ext.isArray(fields)) fields = [fields]
        arr.each(function(item) {
            fields.each(function(field) {
                if(item[field]) {
                    item[field] = Ext.Date.format(item[field], 'd.m.Y')    
                }
            })
            return item;
        }, true)    
        return arr;
    }
    
    ,listMain: function(params, cb) {
        var me = this
            ,data = {tenders: [], winners: []};
        
        [
            function(next) {
                me.callModel('.TenderPubl.getOpened', {}, function(list) {
                    data.tenders = me.prepDates(list, 'date_doc');
                    next()
                })
            }
            
            ,function(next) {
                me.callModel('.TenderPubl.getWinners', {}, function(list) {
                    data.winners = me.prepDates(list, 'date_doc');
                    next()
                })
            }
            
            ,function() {
                me.tplApply('.TenderListMain', data, cb)
            }
        ].runEach();
    }
    
    ,tenders: function(params, cb) {
        var me = this;
        if(params.pageData.page) {
            me.getTender(params, cb)
        } else {
            me.listMain(params, cb)
        }
    }
    
    ,getTender: function(params, cb) {
        var me = this;
        var id = parseInt(params.pageData.page);
        if(isNaN(id)) {cb('');return;};
        
        [
            function(next) {
                me.callModel('.TenderPubl.getTender', {_id: id}, function(data) {
                    next(data)
                })
            }
            
            ,function(data, next) {
                if(!data || !data.date_doc) {
                    cb()
                    return;
                    
                }
                data.date_doc = Ext.Date.format(data.date_doc, 'd.m.Y')
                data.status = 1;
                if(data.date_fin < new Date()) data.status = 2;
                next(data)
            }
            
            ,function(data, next) {
                var prm = {
                        user: params.pageData.user,
                        tender: data
                }
                me.callModel('.TenderPubl.checkAccess', prm, function(allowed) {
                    data.allowed = allowed
                    next(data)
                })    
            }
            
            ,function(data, next) {
                if(params.gpc.max_contract_val && data.allowed)
                    me.callModel('.TenderPubl.saveBid', params, function(bidData) {
                        data.bid = bidData
                        data.saved = true
                        next(data)
                    })
                else {
                    data.saved = false
                    next(data)
                }
            }
            
            // Поищем готовую заявку этой организации на этот тендер
            ,function(data, next) {
                if(data.allowed) {
                    me.callModel('.TenderPubl.getMyBid', {
                        tender: data._id,
                        org: params.pageData.user.org
                    },function(bid) {
                        if(bid && Object.keys(bid).length) {
                            data.bid = {}
                            for(var i in bid) data.bid[i] = encodeURIComponent(bid[i])
                            data.bid.date_start = Ext.Date.format(bid.date_start, 'Y-m-d')
                            data.bid.date_fin = Ext.Date.format(bid.date_fin, 'Y-m-d')
                            me.tplApply('.TenderOneEasyForm', data, cb)
                        } else {
                            next(data)
                        }
                    })
                } else {
                    next(data)
                }
            }
            
            ,function(data) {
                data.bid = {}
                if(params.gpc.accept)
                    me.tplApply('.TenderOneEasyForm', data, cb)
                else    
                    me.tplApply('.TenderOne', data, cb)
            }
            
        ].runEach()
        
    }
   
    ,$getPositions: function() {
        var me = this;
        var id = parseInt(me.params.gpc.tender);
        if(isNaN(id)) {me.sendJSON({});return;};
       
        me.callModel('.TenderPubl.getPositions', {
            tender: id,
            uid: me.params.cookies.uid,
            token: me.params.cookies.token,
            auth: '?'
        }, function(data) {
            me.sendJSON(data)    
        })
    }
    
});
