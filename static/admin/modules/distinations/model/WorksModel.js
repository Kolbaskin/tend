Ext.define('Gvsu.modules.distinations.model.WorksModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_distworks'
    
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
        name: 'indx',
        type: 'sortfield',
        filterable: true,
        sort: 1,
        editable: true,
        visable: true
    },{
        name: 'name',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    }]
})
