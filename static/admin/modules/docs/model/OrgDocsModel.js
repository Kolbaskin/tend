Ext.define('Gvsu.modules.docs.model.OrgDocsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_userdocs'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'uid',
        type: 'int',
        filterable: true,
        editable: false,
        visable: true
    },{
        name: 'org',
        type: 'int',
        filterable: true,
        editable: false,
        visable: true
    },{
        name: 'doc_name',
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
        name: 'doc_type',
        type: 'int',
        filterable: false,
        editable: true,
        visable: true
    },{
        name: 'date_add',
        type: 'date',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'date_fin',
        type: 'date',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'status',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    }]
})
