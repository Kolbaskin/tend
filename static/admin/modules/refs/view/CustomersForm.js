Ext.define('Gvsu.modules.refs.view.CustomersForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    layout: 'border',
    
    defaults: {
        margin: '0',
    },
    width: 450,
    height: 100,
    
    buildItems: function() {
        var me = this;
        return [{
            xtype: 'panel',
            region: 'center',
            layout: 'anchor',
            bodyStyle: 'overflow: auto;padding: 10px;',
            defaults: {
                xtype: 'textfield',
                labelWidth: 200
                ,anchor: '90%'    
            },
            items: me.buildFields()
        }]
    },
    
    buildFields: function() {
        return [
        {
            name: 'name',
            fieldLabel: D.t('Наименование организации')
        }]
    }
    
})