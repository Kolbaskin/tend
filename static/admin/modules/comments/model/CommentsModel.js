Ext.define('Gvsu.modules.comments.model.CommentsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'comments'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'pid',
        type: 'ObjectID',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'mess',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'ctime',
        type: 'date',
        filterable: true,
        editable: false,
        sort: -1,
        visable: true
    },{
        name: 'maker',
        type: 'ObjectID',
        bindTo: {collection: 'admin_users', keyField: '_id', fields: {login:1, name:1, _id:1}},
        filterable: true,
        editable: false,
        visable: true
    }]
})
