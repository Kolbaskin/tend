Ext.define('Gvsu.modules.tender.model.BidModel', {    
     extend: "Gvsu.modules.docs.model.OrgDocsModel"
    
    ,collection: 'gvsu_tenderbid'
    
    ,dirPrefix: 'bid-'
    
    ,fields: [{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'pid',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'orgid',
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
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'file1_name',
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
})