Ext.define('Gvsu.modules.orgs.view.OrgsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    requires: [
        'Ext.ux.form.ItemSelector',
         'Ext.ux.form.MultiSelect'
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
                me.orgForm(),
                me.userForm(),
                me.docsForm(),
                me.worksForm(),
                me.bidList(),
                me.historyForm()
            ]
        }]
    }
        
    ,orgForm: function() {

        return {
            xtype: 'panel',
            title: D.t('Организация'),
            defaults: {
                xtype: 'textfield',
                margin: '5',
                width: 500,
                labelWidth: 200
            },
            bodyStyle: 'overflow: auto;',
            items: [{
                name: 'active',
                xtype: 'checkbox',
                uncheckedValue: 0,
                fieldLabel: D.t('Активирован')
            },{
                name: 'name',
                fieldLabel: D.t('Название')
            },{
                name: 'date_reg',
                xtype: 'datefield',
                readOnly: true,
                fieldLabel: D.t('Дата запроса активации')
            },{
                name: 'date_act',
                xtype: 'datefield',
                readOnly: true,
                fieldLabel: D.t('Дата Активации')
            },{
                name: 'fullname',
                fieldLabel: D.t('Полное название')
            },{
                name: 'headers',
                xtype: 'textarea',
                fieldLabel: D.t('Руководители')
            },{
                name: 'founders',
                xtype: 'textarea',
                fieldLabel: D.t('Учредители')
            },{
                name: 'inn',
                fieldLabel: D.t('ИНН')
            },{
                name: 'kpp',
                fieldLabel: D.t('КПП')
            },{
                name: 'ogrn',
                fieldLabel: D.t('ОГРН')
            },{
                name: 'legal_address',
                fieldLabel: D.t('Юридический адрес')
            },{
                name: 'fact_address',
                fieldLabel: D.t('Фактический адрес')
            },{
                name: 'www',
                fieldLabel: D.t('Адрес сайта')
            },{
                name: 'headers_phones',
                fieldLabel: D.t('Телефоны руководителей')
            },{
                name: 'contact_person',
                fieldLabel: D.t('Контактное лицо')
            },{
                name: 'phone',
                fieldLabel: D.t('Контактный телефон')
            },{
                name: 'email',
                fieldLabel: D.t('Электронная почта')
            },{
                name: 'sro',
                fieldLabel: D.t('Предельная стоимость договора СРО (в рублях)')
            },{
                name: 'info',
                xtype: 'textarea',
                fieldLabel: D.t('Как узнали о торговой площадке')
            },{
                name: 'notes',
                xtype: 'textarea',
                readOnly: true,
                fieldLabel: D.t('Примечание')
            }
            //,
            ]
        }
    }
    
    ,userForm: function() {
        return {
            xtype: 'panel',
            title: D.t('Пользователи'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.users.controller.PublUsers',
                outKey: '_id',
                inKey: 'org'
            }
        }
    }
    ,historyForm: function() {
        return {
            xtype: 'panel',
            title: D.t('Отказы'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.history.controller.History',
                outKey: '_id',
                inKey: 'pid'
            }
        }
    }
    
    ,docsForm: function() {
        return {
            xtype: 'panel',
            title: D.t('Документы'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.docs.controller.OrgDocs',
                outKey: '_id',
                inKey: 'org'
            }
        }
    }
    
    ,worksForm: function() {
        return {
            xtype: 'panel',
            title: D.t('Виды работ'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.distinations.controller.SelWorks',
                outKey: '_id',
                inKey: 'pid'
            }            
        }
    }
    
    ,bidList: function() {
        return {
            xtype: 'panel',
            title: D.t('Тендерные заявки'),
            layout: 'border',
            childModule: {
                controller: 'Gvsu.modules.tender.controller.Bid',
                outKey: '_id',
                inKey: 'orgid'
            }            
        }
    }
    
    /*
    ,worksSelector: function() {
        
        var ds = Ext.create('Core.data.ComboStore',{
            dataModel: 'Gvsu.modules.distinations.model.WorksModel',
            fieldSet: '_id,name'
        })
        
        return {
                    xtype: 'itemselector',
                    region: 'center',
                    name: 'distinations',
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
    */
})