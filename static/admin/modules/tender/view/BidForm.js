'use strict';

Ext.define('Gvsu.modules.tender.view.BidForm', {
    extend: 'Core.form.DetailForm'
    
    ,titleIndex: 'orgname'
    
    ,filterbar: true
    
    ,layout: 'border'    
    ,defaults: {
        margin: '0'
    }
    ,width: 950
    ,height: 520
    
    
    
    ,buildItems: function() {
        var me = this;
        
        return [{
            xtype: 'tabpanel',
            region: 'center',
            items: [
                me.buildFormPanel(),
                me.buildFile(),
                me.buildFile1(),
                me.buildOrgPanel()
            ]
        }]
    }
    /*
    ,buildBidForm: function() {
        var me = this;
        return {
            xtype: 'panel',
            title: D.t('Заявка'),
            layout: 'border',
            items: [
                me.buildFormPanel()
                //me.buildPreviewPanel()
            ]
        }
    }
    */
    ,buildFormPanel: function() {
        
        return {
            title: D.t('Заявка'),
            xtype: 'panel',
            region: 'center',
            width: 350,
            layout: 'anchor',
            bodyStyle: 'padding: 10px;',
            defaults: {
                xtype: 'textfield',
                labelWidth: 150
                ,anchor: '100%'    
            },
            items: this.buildFields()
        }
    }
    
    ,buildFields: function() {
        return [
        {
            xtype: 'checkbox',
            name: 'winner',
            fieldLabel: D.t('Победитель')
        },{
            name: 'orgname',
            fieldLabel: D.t('Организация')
        },{
            name: 'date_start',
            fieldLabel: D.t('Дата начала'),
            xtype: 'datefield',
            submitFormat: 'c',
            altFormats: 'c',
            format: D.t('d.m.Y')
        },{
            name: 'date_fin',
            fieldLabel: D.t('Дата завершения'),
            xtype: 'datefield',
            submitFormat: 'c',
            altFormats: 'c',
            format: D.t('d.m.Y')
        },{
            name: 'price_pos',
            xtype: 'numberfield',
            fieldLabel: D.t('Цена за ед.')
        },{
            name: 'price_full',
            xtype: 'numberfield',
            fieldLabel: D.t('Полная цена')
        },{
            name: 'conditions_advance',
            fieldLabel: D.t('Условия аванса')
        },{
            name: 'max_contract_val',
            fieldLabel: D.t('Макс. цена контракта')
        },{
            name: 'notes',
            xtype: 'textarea',
            height: 70,
            fieldLabel: D.t('Примечание')
        },{
            name: 'file_descript',
            xtype: 'textarea',
            height: 70,
            fieldLabel: D.t('Описание файла')
        }, 
        {
            name: 'pid',
            inputType: 'hidden'
        },{
            name: 'file_name',
            inputType: 'hidden'
        },{
            name: 'file1_name',
            inputType: 'hidden'
        }]
    }
    /*
    ,buildPreviewPanel: function() {
        return {
            xtype: 'tab',
            region: 'center',
            items: [
                this.buildFile(),
                this.buildFile1()
            ]
        }
    }
    */
    ,buildFile: function() {
        return {
            title: D.t('Скан заявки'),
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
    
    ,buildFile1: function() {
        return {
            title: D.t('Предложение'),
            xtype: 'panel',
            name: 'previewPanel1',
            region: 'center',
            layout: 'fit',
            bodyStyle: 'overflow: auto;padding: 10px;',
            tbar: [{
                text: D.t('Печать'),
                action: 'print1'
            },'-',{
                text: D.t('Скачать оригинал'),
                action: 'download1'
            }       
            ],
            html: ''
        }    
    }
    
    ,buildOrgPanel: function() {
        return {
            xtype: 'panel',
            title: D.t('Информация о компании'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.orgs.controller.OrgsView',
                outKey: 'orgid',
                inKey: '_id'
            }
        }
    }
    
    
    
})