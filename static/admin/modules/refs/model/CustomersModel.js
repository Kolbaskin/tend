Ext.define('Gvsu.modules.refs.model.CustomersModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_customers'
    
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
        name: 'indx',
        type: 'sortfield',
        sort: 1,
        filterable: true,
        editable: true,
        visable: true
    }]
    
})
