Ext.define('Gvsu.modules.docs.view.OrgDocsForm', {
    extend: 'Core.form.DetailForm'
    
    ,titleIndex: 'doc_name'
    
    ,layout: 'border'    
    ,defaults: {
        margin: '0'
    }
    ,width: 750
    ,height: 420
    
    ,buildItems: function() {
        var me = this;
        return [
            me.buildFormPanel(),
            me.buldPreviewPanel()
        ]
    }
    
    ,buildFormPanel: function() {
        
        return {
            xtype: 'panel',
            region: 'north',
            height: 100,
            layout: 'anchor',
            bodyStyle: 'padding: 10px;background: none;',
            defaults: {
                xtype: 'textfield',
                labelWidth: 150
                ,anchor: '90%'    
            },
            items: this.buildFields()
        }
    }
    
    ,buildFields: function() {
        return [
        {
            name: 'doc_name',
            fieldLabel: D.t('Наименование файла')
        },{
            xtype: 'fieldcontainer', 
            hideLabel: true,
            columnWidth: 0.5,
            layout: 'hbox',
            defaults: {
                xtype: 'datefield',
                labelWidth: 150
                    
            },
            items: [{
                name: 'doc_add',
                fieldLabel: D.t('Дата добавления'),
                margins: '0 20 0 0'
            },{
                name: 'doc_fin',
                fieldLabel: D.t('Дата завершения')
            }]
        },{
            name: 'status',
            xtype: 'numberfield',
            fieldLabel: D.t('Статус')
        }]
    }
    
    ,buldPreviewPanel: function() {
        return {
            xtype: 'panel',
            name: 'previewPanel',
            region: 'center',
            layout: 'fit',
            bodyStyle: 'overflow: auto;padding: 10px;',
            html: ''
        }    
    }
    
})