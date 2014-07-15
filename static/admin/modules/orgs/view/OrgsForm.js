Ext.define('Gvsu.modules.orgs.view.OrgsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    width: 550,
    height: 400,
    region: 'center',
    layout: 'border',
    defaults: {
        margin: '0',
    }
    
    ,buildItems: function() {
        var me = this;
        
        return [{
            xtype: 'tabpanel',
            region: 'center',
            items: [
                me.orgForm(),
                me.userForm(),
                me.docsForm()
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
                fieldLabel: D.t('Активирован')
            },{
                name: 'name',
                fieldLabel: D.t('Название')
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
            }]
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
    
})