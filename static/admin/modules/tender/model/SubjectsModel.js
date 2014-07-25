Ext.define('Gvsu.modules.tender.model.SubjectsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_tendersubj'
    
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
        name: 'customer',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'object',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'dist', 
        type: 'int',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'price',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'date_start',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'date_fin',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'requires',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'notes',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'indx',
        type: 'sortfield',
        sort: 1,
        filterable: true,
        editable: true,
        visable: true
    }
    ]
    
    /*
    ,afterSave: function(data, cb) {
        var me = this;
        me.src.db.collection('gvsu_users').update({org: data._id}, {$set: {status: data.active}}, function(e,d) {
            cb(data)
        })
    }
    */
})