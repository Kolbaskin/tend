Ext.define('Gvsu.modules.distinations.model.SelWorksModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_worksorg'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'pid',
        type: 'int',
        visable: true,
        filterable: true,
        editable: true
    },{
        name: 'workid',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'status',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'notes',
        type:  'string',
        editable: true,
        visable: true
    }]
})
