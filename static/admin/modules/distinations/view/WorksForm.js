Ext.define('Gvsu.modules.distinations.view.WorksForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    width: 550,
    height: 70,
    region: 'center',
    layout: 'vbox',
    defaults: {
        margin: '5'
    }
    
    ,buildItems: function() {

        return [{
                name: 'name',
                xtype: 'textfield',
                width: 500,
                labelWidth: 150,
                fieldLabel: D.t('Название вида работ')
            },{
                name: 'pid',
                xtype: 'textfield',
                inputType: 'hidden'
            }]
    }
    
})