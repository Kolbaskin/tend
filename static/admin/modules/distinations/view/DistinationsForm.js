Ext.define('Gvsu.modules.distinations.view.DistinationsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    width: 550,
    height: 400,
    region: 'center',
    layout: 'border',
    defaults: {
        margin: '0'
    }
    
    ,buildItems: function() {
        var me = this;
        
        return [{
            xtype: 'tabpanel',
            region: 'center',
            items: [
                me.catForm(),
                me.subCatForm()
            ]
        }]
    }
   
    ,catForm: function() {

        return {
            xtype: 'panel',
            title: D.t('Категория'),
            defaults: {
                xtype: 'textfield',
                margin: '5',
                width: 500,
                labelWidth: 200
            },
            bodyStyle: 'overflow: auto;',
            items: [{
                name: 'name',
                fieldLabel: D.t('Название категории')
            }]
        }
    }
    
    ,subCatForm: function() {
        return {
            xtype: 'panel',
            title: D.t('Виды работ'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.distinations.controller.Works',
                outKey: '_id',
                inKey: 'pid'
            }
        }
    }
   
})