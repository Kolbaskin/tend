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
            exec('rm -R ' + me.config.userDocDir + '/' + ids[i], function() {
                func(i+1)    
            })
        }
        func(0)
    }
    
    ,$getDocPreviewCount: function(data, cb) {
        if(!data || !data._id) {
            cb({pages: 0})
            return;
        }
        var fs = require('fs')
            ,me = this
            ,pages = 0
            ,dir = me.config.userDocDir + '/' + data._id + '/';
            
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
    
    
})
