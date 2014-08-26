Ext.define('Gvsu.modules.tender.model.BidPosModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_userprices'
    
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
        name: 'org',
        exp: false,
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'bid',
        exp: false,
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'price1',
        type: 'float',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'price2',
        exp: false,
        type: 'float',
        filterable: true,
        editable: true,
        visable: true
    }]
    
})