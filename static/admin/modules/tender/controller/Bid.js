/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.tender.controller.Bid', {
    extend: 'Gvsu.modules.docs.controller.OrgDocs'
    ,id:'tender-bid-win'
    
    ,dirPrefix: 'bid-'
    
    ,launcher: {
        text: D.t('Заявки участников'),
        iconCls:'tender'
    }
    
    ,addControls: function(win) {
        
        var me = this
        me.control(win,{
            "[action=xls]": {click: function() {me.createXls(win)}}
        })
        me.callParent(arguments)
    }
    
    ,addFormControls: function(win) {
        var me = this
        me.control(win,{
            "[action=print]": {click: function() {me.printDoc(win, '')}},
            "[action=download]": {click: function() {me.downloadDoc(win, '')}},
            "[action=print1]": {click: function() {me.printDoc(win,1)}},
            "[action=download1]": {click: function() {me.downloadDoc(win,1)}},
            "[action=sendWinLetter]": {click: function() {me.sendWinLetter(win)}}
        })
        me.callParent(arguments)
    }
    
    ,afterModify: function(form, data) {
        var me = this
            ,id = localStorage.getItem('uid')
            ,token = localStorage.getItem('token');
        
        form.docID = data._id
        
        me.model.getDocPreview(data, function(res) {
            var str = '', str1 = '';
            var domain = location.href.split('/')
            domain = domain[0] + '//' + domain[2]
            for(var i=0;i<res.pages;i++) {
                str += '<img src="' + domain + '/Gvsu.modules.docs.controller.Docs.getDocPreview/doc.png?doc=bid-' + data._id + '&page=' + i + '&id=' + id + '&token=' + token + '" width="100%" />'    
            }
            for(var i=0;i<res.pages1;i++) {
                str1 += '<img src="' + domain + '/Gvsu.modules.docs.controller.Docs.getDocPreview/doc.png?doc=bid1-' + data._id + '&page=' + i + '&id=' + id + '&token=' + token + '" width="100%" />'    
            }
            form.down('[name=previewPanel]').on('boxready', function(el) {
                el.body.update(str)  
            })
            form.down('[name=previewPanel1]').on('boxready', function(el) {
                el.body.update(str1)  
            })//            
        })
    }
    
    ,printDoc: function(form, n) {
        var w = window.open('about:blank')
        var html = form.down('[name=previewPanel'+n+']').body.getHTML()
        html = '<div style="width:720px;">' + html + '</div>'
        w.document.body.innerHTML = html
        w.print()
    }
    
    ,downloadDoc: function(form, n) {
        var me = this
            ,doc = form.down('[name=_id]').value
            ,id = localStorage.getItem('uid')
            ,token = localStorage.getItem('token')
            ,fn = form.down('[name=file'+n+'_name]').value;
        
        if(doc) 
           location = '/Gvsu.modules.docs.controller.Docs.getDocSrc/?doc=bid'+n+'-' + doc + '&id='+id+'&token='+token+'&fn='+encodeURIComponent(fn)
    }
    
    ,createXls: function(win) {
//console.log('win:', win)  
        //var me = this
        //    ,store = win.store
      
        this.model.exportData(win.store.filters)
        
    }
    
    ,sendWinLetter: function(win) {
        win.down('[name=winner]').setValue(true)  
        this.model.sendWinnerLetter({
            tid:win.down('[name=pid]').getValue(),
            bid:win.down('[name=_id]').getValue()
        })
    }
    
});

