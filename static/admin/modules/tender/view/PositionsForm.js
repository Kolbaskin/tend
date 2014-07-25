Ext.define('Gvsu.modules.tender.view.PositionsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    width: 340,
    height: 210,
    region: 'center',
    layout: 'border',
    defaults: {
        margin: '0'
    }
    
    ,buildItems: function() {
        return [{
            xtype: 'panel',
            region: 'center',
            defaults: {
                xtype: 'textfield',
                margin: '5',
                anchor: '100%',
                labelWidth: 150
            },
            bodyStyle: 'overflow: auto;',
            layout: 'anchor',
            items: [{
                name: 'name',
                fieldLabel: D.t('Наименование позиции')
            },{
                name: 'comments',
                fieldLabel: D.t('Комментарии')
            },{
                name: 'uname',
                fieldLabel: D.t('Единица измерения')
            },{
                name: 'counts',
                fieldLabel: D.t('Количество')
            },{
                name: 'pid',
                inputType: 'hidden'
            }
            ]
        }]
    }
    
    
})