Ext.define('Gvsu.modules.tender.view.SubjectsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    //requires: ['Desktop.core.widgets.TreeCombo'],
    
    width: 540,
    height: 440,
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
                me.subjectForm(),
                me.bldPositionsTab()
            ]
        }]
    }
        
    ,subjectForm: function() {
        return {
            xtype: 'panel',
            title: D.t('Основные настройки'),
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
                fieldLabel: D.t('Название предмета')
            },
            this.bldCustomerCombo(),
            this.bldObjectCombo(),
            this.bldDistCombo(),
            this.bldDatesBlock(),
            {
                name: 'price',
                fieldLabel: D.t('Стартовая цена')
            },
            {
                name: 'requires',
                xtype: 'textarea',
                height: 80,
                emptyText: D.t('Требования и гарантии'),
                hideLabel: true
            },{
                name: 'notes',
                xtype: 'textarea',
                height: 80,
                emptyText: D.t('Примечание'),
                hideLabel: true
            },{
                name: 'pid',
                inputType: 'hidden'
            }
            ]
        }
    }
    
    ,bldDistCombo: function() {
        return {
            name: 'dist',
            fieldLabel: D.t('Направление'),
            xtype: 'combo',
            tpl: '<tpl for="."><div class="x-boundlist-item <tpl if="_id==0">parent-item</tpl>" >{name}</div></tpl>',
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.distinations.model.DistinationsComboModel',
                fieldSet: '_id,name'
            }),            
            queryMode: 'local',
            displayField: 'name',
            valueField: '_id',
            listeners: {
                beforeselect: function(el, rec) {
                    if(rec.data._id == 0) return false;
                    return true;
                }
            }
        }    
        
    }
    
    ,bldCustomerCombo: function() {
        return {
            name: 'customer',
            fieldLabel: D.t('Организация-заказчик'),
            xtype: 'combo',
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.refs.model.CustomersModel',
                fieldSet: 'name'
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name',
        }    
    }
    
    ,bldObjectCombo: function() {
        return {
            name: 'object',
            fieldLabel: D.t('Объект'),
            xtype: 'combo',
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.refs.model.ObjectsModel',
                fieldSet: 'name'
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name',
        }    
    }
    
    ,bldCustomerCombo: function() {
        return {
            name: 'customer',
            fieldLabel: D.t('Организация-заказчик'),
            xtype: 'combo',
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.refs.model.CustomersModel',
                fieldSet: 'name'
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name',
        }    
    }
    
    
    ,bldDatesBlock: function() {
        return {
            xtype: 'fieldcontainer', 
            hideLabel: true,
            //columnWidth: 0.5,
            layout: 'hbox',
            defaults: {
                xtype: 'datefield',
                submitFormat: 'c',
                altFormats: 'c',
                format: D.t('d.m.Y'),
                labelWidth: 150,
                flex: 1                    
            },
            items: [{
                name: 'date_start',
                fieldLabel: D.t('Дата начала работ'),
                margins: '0 20 0 0'
            },{
                name: 'date_fin',
                fieldLabel: D.t('Дата завершения')
            }]
        }
    }
    
    
    ,bldPositionsTab: function() {
        return {
            xtype: 'panel',
            title: D.t('Перечень позиций'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.tender.controller.Positions',
                outKey: '_id',
                inKey: 'pid'
            }
        }
    }
})