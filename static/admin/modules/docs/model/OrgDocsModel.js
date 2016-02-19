Ext.define('Gvsu.modules.docs.model.OrgDocsModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_userdocs'
    
    ,dirPrefix: ''
    
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
        name: 'notes',
        type: 'string',
        filterable: false,
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
    
    ,getDocPreview: function(data, cb) {
        this.runOnServer('getDocPreviewCount', data, cb)    
    }
    
    ,afterRemove: function(ids, cb) {
        var me = this
            ,exec = require('child_process').exec;
        
        var func = function(i) {
            if(i>=ids.length) {
                cb(true)
                return;
            }
            exec('rm -R ' + me.config.userDocDir + '/' + me.dirPrefix + ids[i], function() {
                func(i+1)    
            })
        }
        func(0)
    }
    
    ,$write: function(data, callback) {
        var me = this
        if(data.status == 3) {
            me.src.db.collection(me.collection).findOne({_id: data._id}, {org: 1}, function(e,d) {
                if(d) {
                   me.src.db.collection('gvsu_orgs').update({_id: d.org}, {$set:{notes: data.notes}}, function(e,x) { 

                      Ext.create('Gvsu.modules.history.model.HistoryModel', {scope: me}).write({
                          obj: 'Документ: ' + data.doc_name || 'doc',
                          mess: data.notes,
                          pid: d.org
                      },function() {})
  
                   })
                }
            })
        }
        this.callParent(arguments)
    }
    
    ,$getDocPreviewCount: function(data, cb) {
        if(!data || !data._id) {
            cb({pages: 0})
            return;
        }
        var fs = require('fs')
            ,me = this
            ,pages = 0
            ,dir = me.config.userDocDir + '/' + me.dirPrefix + data._id + '/';
            
        var func = function(i) {
            fs.exists(dir + i + '.png', function(exists) {
                if(exists) {
                    pages++;
                    func(i+1)
                } else
                    cb({pages: pages})
            })    
        }
        func(0)
    }
    
    ,markAsModerated: function(id) {
        this.runOnServer('markAsModerated', {id:id}, function() {})    
    }
    
    ,$markAsModerated: function(data, cb) {
        var me = this;
        [
            function(next) {
                if(!data.id)
                    me.error(404)
                else 
                    next()
            }
            ,function(next) {
                me.getPermissions(function(permis) {
                    if(permis.modify) 
                        next()
                    else
                        me.error(401)
                        
                })
            }
            ,function(next) {
                var id = me.src.db.fieldTypes.ObjectID.StringToValue(data.id)
                me.src.db.collection(me.collection).update({_id: id}, {$set: {status: 1}}, function() {
                    cb({success: true})    
                })
            }
        ].runEach()
    }
    
})
