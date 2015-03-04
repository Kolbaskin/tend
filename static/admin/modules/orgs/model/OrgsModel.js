Ext.define('Gvsu.modules.orgs.model.OrgsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_orgs'
    
    ,fields: [{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'active',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'name',
        type: 'string',
        sort: 1,
        filterable: true,
        unique: true,
        editable: true,
        visable: true
    },{
        name: 'fullname',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'headers',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'founders',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'inn',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'kpp',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'ogrn',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'legal_address',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'fact_address',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'www',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'headers_phones',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'contact_person',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'phone',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'email',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'sro',
        type: 'number',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'info',
        type: 'string',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'distinations',
        type: 'arraystring',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'notes',
        type: 'string',
        editable: false,
        filterable: false,
        visable: true
    }
    ]
    
    ,afterSave: function(data, cb) {
        var me = this;
        [
            function(next) {
                me.src.db.collection('gvsu_users').update({org: data._id}, {$set: {status: data.active}}, function(e,d) {
                    next()
                })
            }
            ,function(next) {
                if(data.active) {
                    me.src.db.collection('gvsu_userdocs').update({org: data._id, status: {$in:[0,1]}}, {$set: {status: 2}}, function(e,d) {
                        next()
                    })
                } else cb(data)
            }
            ,function() {
                me.src.db.collection('gvsu_userdocs').update({org: data._id, status: {$in:[0,1]}}, {$set: {status: 2}}, function(e,d) {
                    cb(data)
                })
            }
        ].runEach()
    }
})