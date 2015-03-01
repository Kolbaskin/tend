Ext.define('Gvsu.modules.distinations.view.SelWorksForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: '_id',
    
    width: 550,
    height: 200,
    region: 'center',
    layout: 'anchor',
    defaults: {
        margin: '5',
        anchor: '100%',
        xtype: 'combo',
        valueField: '_id',
        displayField: 'name',
        queryMode: 'local'
    }
    
    ,buildItems: function() {

        return [
            this.comboOrg(),
            this.comboWorks(),
            this.comboStatus(),
            this.notes()
        ]
    }
    
    ,comboOrg: function() {
        return {
            
            name: 'pid',
            fieldLabel: D.t('Организация'),
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.orgs.model.OrgsModel',
                fieldSet: '_id,name'
            })
        }    
    }
    
    ,comboWorks: function() {
        return {
            name: 'workid',
            fieldLabel: D.t('Вид работ'),
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.distinations.model.WorksModel',
                fieldSet: '_id,name'
            })
        }    
    }
    
    ,comboStatus: function() {
        return {
            name: 'status',
            fieldLabel: D.t('Статус'),
            store: Ext.create('Ext.data.ArrayStore',{
                data: [[1, 'проверка'], [2, 'одобрено'], [3, 'ошибка']],
                fields: ['_id', 'name']
            })
        }
    }
    
    ,notes: function() {
        return {
            name: 'notes',
            xtype: 'textfield',
            fieldLabel: D.t('Комментарий')
        }
    }
    
})