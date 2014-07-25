Ext.define('Gvsu.modules.tender.model.TenderModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_tender'
    
    ,fields: [{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'publ',
        type: 'boolean',
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
        name: 'form',
        type: 'int',
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
        name: 'avance_comp',
        type: 'int',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'date_doc',
        type: 'date',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'min_sro',
        type: 'int',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'prolong',
        type: 'int',
        editable: true,
        visable: true
    },{
        name: 'descript',
        type: 'text',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'inv_sro',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'inv_dir',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'inv_orgs',
        type: 'arraystring',
        editable: true,
        filterable: false,
        visable: true
    }
    ]
    
    ,testrun: function() {
  
    }
    /*
    ,afterSave: function(data, cb) {
        var me = this;
        me.src.db.collection('gvsu_users').update({org: data._id}, {$set: {status: data.active}}, function(e,d) {
            cb(data)
        })
    }
    */
})