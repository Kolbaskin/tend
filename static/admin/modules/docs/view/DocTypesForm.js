Ext.define('Gvsu.modules.docs.view.DocTypesForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
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
            fieldLabel: D.t('Наименование типа')
        },{
            name: 'duration',
            xtype: 'numberfield',
            fieldLabel: D.t('Срок действия дней (0 - бессрочный)')
        },{
            name: 'descript',
            xtype: 'textarea',
            height: 150,
            fieldLabel: D.t('Описание типа')
        },{
            name: 'required',
            xtype: 'checkbox',
            fieldLabel: D.t('Обязательный для участия')
        }]
    }
    
})