Ext.define('Gvsu.modules.tender.model.PositionsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_tenderpos'
    
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
        name: 'name',
        type: 'string',
        filterable: true,
        unique: true,
        editable: true,
        visable: true
    },{
        name: 'comments',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'uname',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'counts',
        type: 'float',
        editable: true,
        filterable: true,
        visable: true
    }
    ]
    
})