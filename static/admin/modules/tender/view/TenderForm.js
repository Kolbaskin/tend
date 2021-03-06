Ext.define('Gvsu.modules.tender.view.TenderForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    requires: [
        'Ext.ux.form.ItemSelector',
        'Desktop.core.widgets.UploadField',
        'Ext.ux.form.MultiSelect',
        'Desktop.core.widgets.DateTime'
    ],
    
    width: 750,
    height: 500,
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
                me.tenderForm(),
                me.bldSubjectsTab(),
                me.bldInvitesTab(),
                me.bldBidTab()
            ]
        }]
    }
        
    ,tenderForm: function() {
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
                name: 'publ',
                xtype: 'checkbox',
                uncheckedValue: 0,
                fieldLabel: D.t('Публиковать')
            },{
                name: 'sent',
                xtype: 'checkbox',
                uncheckedValue: 0,
                fieldLabel: D.t('Рассылка уведомлений производилась')
            },{
                name: 'name',
                fieldLabel: D.t('Название')
            },
            this.bldFormatCombo(),
            this.bldDatesBlock(),
            this.bldWorkDatesBlock(),
            {
                name: 'avance_comp',
                fieldLabel: D.t('Условия авансирования (%)'),
                xtype: 'textfield',
                labelWidth: 250,
                width: 350
            },{
                name: 'date_doc',
                fieldLabel: D.t('Дата окончания подачи документов'),
                xtype: 'xdatetime',
                submitFormat: 'c',
                altFormats: 'c',
                dateFormat: D.t('d.m.Y'),
                labelWidth: 250,
                width: 350
            },{
                name: 'min_sro',
                fieldLabel: D.t('Минимальный размер СРО'),
                xtype: 'numberfield',
                labelWidth: 250
            },{
                xtype: 'fieldcontainer', 
                hideLabel: true,
                layout: 'hbox',
                defaults: {
                    xtype: 'numberfield',
                },
                items: [{
                    name: 'start_price',
                    fieldLabel: D.t('Начальная цена'),
                    margins: '0 20 0 0',
                    labelWidth: 250
                },{
                    name: 'step_price',
                    fieldLabel: D.t('Шаг торга (% от нач. цены)'),
                    labelWidth: 200
                }]
            },{
                name: 'prolong',
                fieldLabel: D.t('Время пролонгации (мин.)'),
                xtype: 'numberfield',
                labelWidth: 250
            },{
                name: 'file',
                fieldLabel: D.t('Тендерная документация'),
                xtype: 'uploadfield',
                labelWidth: 250,
                width: 300,
                buttonText: D.t('Выберите документ...')
            },{
                name: 'filelink',
                labelWidth: 250,
                width: 300,
                fieldLabel: D.t('Ссылка на файл'),
                emptyText: 'http://www.gvsu.ru/myfile.zip'
            },{
                name: 'descript',
                xtype: 'textarea',
                height: 35,
                emptyText: D.t('Описание'),
                hideLabel: true
            }
            ]
        }
    }
    
    ,bldFormatCombo: function() {
        return {
            name: 'form',
            fieldLabel: D.t('Формат'),
            xtype: 'combo',
            store: Ext.create('Ext.data.ArrayStore',{
                data: [
                    [1, 'открытый тендер'],
                    [2, 'закрытый тендер'],
                    [3, 'закрытый аукцион'],
                    [4, 'открытый аукцион']
                ],
                fields: ['id', 'name']
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
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
                fieldLabel: D.t('Дата начала тендера'),
                margins: '0 20 0 0'
            },{
                name: 'date_fin',
                fieldLabel: D.t('Дата завершения')
            }]
        }
    }
    
    ,bldWorkDatesBlock: function() {
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
                name: 'date_workstart',
                fieldLabel: D.t('Дата начала работ'),
                margins: '0 20 0 0'
            },{
                name: 'date_workfin',
                fieldLabel: D.t('Дата завершения работ')
            }]
        }
    }
    
    
    ,bldSubjectsTab: function() {
        return {
            xtype: 'panel',
            title: D.t('Предмет тендера'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.tender.controller.Subjects',
                outKey: '_id',
                inKey: 'pid'
            }
        }
    }
    
    ,bldBidTab: function() {
        return {
            xtype: 'panel',
            title: D.t('Заявки участников'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.tender.controller.Bid',
                outKey: '_id',
                inKey: 'pid'
            }
        }
    }
    
    ,bldInvitesTab: function() {
        return {
            xtype: 'panel',
            title: D.t('Участники'),
            layout: 'anchor',
            bodyStyle: 'padding: 5px;',
            defaults: {
                anchor: '100%',
                labelWidth: 250
            },
            items: [{
                name: 'inv_date',
                fieldLabel: D.t('Дата рассылки приглашений'),
                xtype: 'datefield',
                submitFormat: 'c',
                altFormats: 'c',
                format: D.t('d.m.Y'),
                value: new Date()
            },{
                xtype: 'label',
                text: D.t('Пригласить для участия в тендере следующие организации:')
            },{
                xtype: 'checkbox',
                name: 'inv_sro',
                uncheckedValue: 0,
                fieldLabel: D.t('Всех с подходящим СРО')
            },{
                xtype: 'checkbox',
                name: 'inv_dir',
                uncheckedValue: 0,
                fieldLabel: D.t('Всех по направлениям')
            },{
                xtype: 'label',
                text: D.t('Выберите вручную:')
            },
            this.bldSelectOrgs()
            ]
        }
    }
    
    ,bldSelectOrgs: function() {
        var ds = Ext.create('Core.data.ComboStore',{
            dataModel: 'Gvsu.modules.orgs.model.OrgsModel',
            fieldSet: '_id,name'
        })
        
        return {
            xtype: 'itemselector',
            height: 170,
            name: 'inv_orgs',
            hideLabel: true,
            imagePath: '/ext/examples/ux/css/images/',
            buttons: ['add', 'remove'],
            buttonsText: {add: D.t("Добавить"), remove: D.t("Убрать")},
            store: ds,
            displayField: 'name',
            valueField: '_id',
            msgTarget: 'side',
            fromTitle: D.t('Доступные'),
            toTitle: D.t('Выбранные'),
            listeners: {
                render: function(el) {
                    el.bindStore(ds)
                }
            }
        }     
    }
    
    
})