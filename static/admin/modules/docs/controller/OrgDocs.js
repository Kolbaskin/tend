/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.docs.controller.OrgDocs', {
    extend: 'Core.controller.Controller',
//    id:'docs-win',   
    
    dirPrefix: '',

    launcher: {
        text: D.t('Документы организации'),
        iconCls:'docstypes'        
    }
    
    ,addFormControls: function(win) {

        var me = this
        me.control(win,{
            "[action=print]": {click: function() {me.printDoc(win)}},
            "[action=download]": {click: function() {me.downloadDoc(win)}},
            "[action=rotate]": {click: function() {me.rotatePage(win)}}
            
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
            var str = []
            var domain = location.href.split('/')
            domain = domain[0] + '//' + domain[2]
            for(var i=0;i<res.pages;i++) {                
                str.push({id: i+1, img: domain + '/Gvsu.modules.docs.controller.Docs.getDocPreview/doc.png?doc=' + me.dirPrefix + data._id + '&page=' + i + '&id=' + id + '&token=' + token })  
            }
            form.previewStore.loadData(str)
            //form.down('[name=previewPanel]').body.update(str)            
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
    
    ,beforeSave: function(form, data, cb) {
        if(data.status == 3 && !data.notes) {
            alert('Укажите причину отказа');
            form.down('[action=formsave]').setDisabled(false)
            form.down('[action=formapply]').setDisabled(false)
            form.down('[name=notes]').focus()
            return false;
        } else {
            cb(data)
            return true;
        }
    }
    
    ,rotatePage: function(win, img) {
        var me = this
            ,img = win.down('form').previewImage;
            
        me.rotate(180, img.getEl().dom)    
    }
    
    ,rotate: function(deg, src) {
        var me = this
            ,ctx
            ,canvas = document.createElement("canvas")
            ,img = document.createElement("img");
        
        function drawRotated(degrees){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.save();
            ctx.translate(canvas.width/2,canvas.height/2);
            ctx.rotate(degrees*Math.PI/180);
            ctx.drawImage(img,-img.width/2,-img.height/2);
            ctx.restore();
        }
        
        
        img.onload = function() {
            var x = 0, y = 0;
            canvas.width = img.width;
            canvas.height = img.height;    
            
            ctx=canvas.getContext("2d");
            ctx.drawImage(img,canvas.width,canvas.height);
            drawRotated(deg)
            var tempCanvas = document.createElement("canvas");
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            var tCtx=tempCanvas.getContext("2d");
            tCtx.drawImage(canvas,x,y,tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);
            src.src = tempCanvas.toDataURL("image/png");
        }
        
        img.src = src.src;
    }
    
});

