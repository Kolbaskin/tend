Ext.define('Gvsu.modules.docs.model.DocTypesModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_docstypes'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'name',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'duration',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'descript',
        type: 'text',
        filterable: false,
        editable: true,
        visable: true
    },{
        name: 'required',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'indx',
        type: 'sortfield',
        sort: 1,
        filterable: true,
        editable: true,
        visable: true
    }]
})
