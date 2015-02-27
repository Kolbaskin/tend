Ext.define('Gvsu.modules.distinations.model.SelWorksModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_worksorg'
    
    ,fields:[{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'pid',
        type: 'int',
        visable: true,
        filterable: true,
        editable: true,
        bindTo: {collection: 'gvsu_orgs', keyField: '_id', fields: {name:1, _id:1}}
    },{
        name: 'workid',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'status',
        type: 'int',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'notes',
        type:  'string',
        editable: true,
        visable: true
    }]
    
    ,acceptAll: function(params) {
        this.runOnServer('acceptAll', params, function() {})    
    }
    
    ,$acceptAll: function(params) {
        var me = this;
        me.getPermissions(function(permis) {
            if(permis.modify) {
                me.src.db.fieldTypes.ObjectID.StringToValue(params.parentCode, function(pid) {
                    me.src.db.collection(me.collection).update({pid: pid}, {$set: {status: 2}}, function() {
                        me.changeModelData(Object.getPrototypeOf(me).$className, 'ins', {})
                    })
                })
                console.log(params)
            }
            else
                me.error(401)
        })    
    }
})
