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
        
        [
            function(next) {
                var id = parseInt(params.pageData.page)

                if(isNaN(id)) cb('')
                else {
                    me.callModel('.TenderPubl.getTender', {_id: id}, function(data) {
                        next(data)
                    })
                }
            }
            
            ,function(data, next) {
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
            
            ,function(data) {
                if(params.gpc.date_start && data.allowed)
                    me.callModel('.TenderPubl.saveBid', params, function(bidData) {
                        data.bid = bidData
                        me.tplApply('.TenderOneEasyForm', data, cb)
                    })
                else if(params.gpc.accept)
                    me.tplApply('.TenderOneEasyForm', data, cb)
                else    
                    me.tplApply('.TenderOne', data, cb)
            }
            
        ].runEach()
        
    }
    
});