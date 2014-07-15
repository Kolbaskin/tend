/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.docs.controller.OrgDocs', {
    extend: 'Core.controller.Controller',
    id:'docstypes-win',   

    launcher: {
        text: D.t('Документы организации'),
        iconCls:'docstypes'        
    }
    
    ,afterModify: function(form, data) {
        var me = this
            ,id = localStorage.getItem('uid')
            ,token = localStorage.getItem('token')
        
        me.model.getDocPreview(data, function(res) {
            var str = ''
            for(var i=0;i<res.pages;i++) {
                str += '<img src="/Gvsu.modules.docs.controller.Docs.getDocPreview/doc.png?doc='+data._id+'&page='+i+'&&id='+id+'&token='+token+'" width="100%" />'    
            }
            form.down('[name=previewPanel]').body.update(str)            
        })
    }
    
});

