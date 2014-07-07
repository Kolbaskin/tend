Ext.define('Gvsu.modules.users.model.PublUsersModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_users'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'name',
        type: 'string',
        filterable: true,
        //unique: true,
        editable: true,
        visable: true
    },{
        name: 'login',
        type: 'string',
        filterable: true,
        unique: true,
        editable: true,
        visable: true
    },{
        name: 'password',
        type: 'password',
        filterable: false,
        editable: true,
        visable: true
    },{
        name: 'org',
        type: 'int',
        editable: true,
        visable: true
    }
    
    ,{
        name: 'email',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'fname',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'name',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'sname',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'phone',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'mobile',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'position',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'company',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'activated',
        type: 'boolean',
        filterable: true,
        editable: false,
        visable: true
    }]
})
