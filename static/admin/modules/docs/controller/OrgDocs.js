/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.docs.controller.OrgDocs', {
    extend: 'Core.controller.Controller',
    id:'docstypes-win',   
    
    dirPrefix: '',

    launcher: {
        text: D.t('Документы организации'),
        iconCls:'docstypes'        
    }
    
    ,addFormControls: function(win) {
        var me = this
        me.control(win,{
            "[action=print]": {click: function() {me.printDoc(win)}},
            "[action=download]": {click: function() {me.downloadDoc(win)}}
        })
        me.callParent(arguments)
    }
    
    ,beforeModify: function(form, data) {
        if(data.status == 0) {
            this.model.markAsModerated(data._id)  
            data.status = 1;
        }
    }
    
    ,afterModify: function(form, data) {
        var me = this
            ,id = localStorage.getItem('uid')
            ,token = localStorage.getItem('token');
        
        form.docID = data._id
        
        me.model.getDocPreview(data, function(res) {
            var str = ''
            var domain = location.href.split('/')
            domain = domain[0] + '//' + domain[2]
            for(var i=0;i<res.pages;i++) {
                str += '<img src="' + domain + '/Gvsu.modules.docs.controller.Docs.getDocPreview/doc.png?doc=' + me.dirPrefix + data._id + '&page=' + i + '&id=' + id + '&token=' + token + '" width="100%" />'    
            }
            
            form.down('[name=previewPanel]').body.update(str)            
        })
    }
    
    ,printDoc: function(form) {
        var w = window.open('about:blank')
        var html = form.down('[name=previewPanel]').body.getHTML()
        html = '<div style="width:720px;">' + html + '</div>'
        w.document.body.innerHTML = html
        w.print()
    }
    
    ,downloadDoc: function(form) {
        var me = this
            ,doc = form.down('[name=_id]').value
            ,id = localStorage.getItem('uid')
            ,token = localStorage.getItem('token')
            ,fn = form.down('[name=file_name]').value;
        
        if(doc) 
           location = '/Gvsu.modules.docs.controller.Docs.getDocSrc/?doc=' + me.dirPrefix + doc + '&id='+id+'&token='+token+'&fn='+encodeURIComponent(fn)
    }
    
});

