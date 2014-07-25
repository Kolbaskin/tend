Ext.define('Gvsu.modules.distinations.model.DistinationsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_distinations'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
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
