Ext.define('Gvsu.modules.docs.view.OrgDocsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'doc_name',
    
    layout: 'border',
    
    defaults: {
        margin: '0',
    },
    width: 450,
    height: 320,
    
    buildItems: function() {
        var me = this;
        return [{
            xtype: 'panel',
            region: 'center',
            layout: 'anchor',
            bodyStyle: 'overflow: auto;padding: 10px;',
            defaults: {
                xtype: 'textfield',
                labelWidth: 150
                ,anchor: '90%'    
            },
            items: me.buildFields()
        }]
    },
    
    buildFields: function() {
        return [
        {
            name: 'name',
            fieldLabel: D.t('Наименование файла')
        },{
            name: 'date_add',
            xtype: 'datefield',
            fieldLabel: D.t('Дата добавления')
        },{
            name: 'date_fin',
            xtype: 'datefield',
            fieldLabel: D.t('Дата завершения')
        },{
            name: 'status',
            xtype: 'numberfield',
            fieldLabel: D.t('Статус')
        }]
    }
    
})