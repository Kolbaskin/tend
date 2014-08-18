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
                submitFormat: 'c',
                altFormats: 'c',
                format: D.t('d.m.Y'),
                labelWidth: 150
                    
            },
            items: [{
                name: 'date_add',
                fieldLabel: D.t('Дата добавления'),
                margins: '0 20 0 0'
            },{
                name: 'date_fin',
                fieldLabel: D.t('Дата завершения')
            }]
        },{
            
            name: 'status',
            xtype: 'combo',
            store: Ext.create('Ext.data.ArrayStore', {
                fields: ['id', 'name'],
                data: [[0, 'новый документы'], [1, 'на модерации'], [2, 'одобрен'], [3, 'отклонен']]
            }),
            valueField: 'id',
            displayField: 'name',
            fieldLabel: D.t('Статус')
        },{
            name: 'file_name',
            inputType: 'hidden'
        }]
    }
    
    ,buldPreviewPanel: function() {
        return {
            xtype: 'panel',
            name: 'previewPanel',
            region: 'center',
            layout: 'fit',
            bodyStyle: 'overflow: auto;padding: 10px;',
            tbar: [{
                text: D.t('Печать'),
                action: 'print'
            },'-',{
                text: D.t('Скачать оригинал'),
                action: 'download'
            }       
            ],
            html: ''
        }    
    }
    
})