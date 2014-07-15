Ext.define('Gvsu.modules.users.view.PublUsersForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'name',
    
    layout: 'border',
    
    defaults: {
        margin: '0',
    },
    width: 400,
    height: 420,
    
    buildItems: function() {
        var me = this;
        return [{
            xtype: 'panel',
            region: 'center',
            layout: 'anchor',
            bodyStyle: 'overflow: auto;padding: 10px;',
            defaults: {
                xtype: 'textfield',
                labelWidth: 150
                ,anchor: '90%'    
            },
            items: me.buildFields()
        }]
    },
    
    buildFields: function() {
        return [
        {
            name: 'activated',
            xtype: 'checkbox',
            fieldLabel: D.t('Активирован')
        },{
            name: 'status',
            xtype: 'checkbox',
            fieldLabel: D.t('Участник торгов')
        },{
            name: 'login',
            fieldLabel: D.t('Логин')
        },{
            inputType: 'password',
            name: 'password',
            fieldLabel: D.t('Пароль')
        },{
            xtype: 'combo',
            name: 'org',
            fieldLabel: D.t('Организация'),
            valueField: '_id',
            displayField: 'name',
            queryMode: 'local',
            store: Ext.create('Core.data.ComboStore',{
                dataModel: 'Gvsu.modules.orgs.model.OrgsModel',
                fieldSet: '_id,name'
            })
        },{
            name: 'company',
            fieldLabel: D.t('Компания')
        },{
            name: 'email',
            fieldLabel: D.t('Email')
        },{
            name: 'fname',
            fieldLabel: D.t('Фамилия')
        },{
            name: 'name',
            fieldLabel: D.t('Имя')
        },{
            name: 'sname',
            fieldLabel: D.t('Отчество')
        },{
            name: 'phone',
            fieldLabel: D.t('Телефон контактный')
        },{
            name: 'mobile',
            fieldLabel: D.t('Телефон мобильный')
        },{
            name: 'position',
            fieldLabel: D.t('Должность')
        }]
    }
    
})