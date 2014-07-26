/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.orgs.controller.Main', {
    extend: 'Core.controller.MenuController',
    
    launcher: {
        text: D.t('Организации'),
        iconCls:'orgs',
        menu: {
            items: [                    
            {
                text: D.t('Список организаций'),
                iconCls:'orgs',
                controller: 'Gvsu.modules.orgs.controller.Orgs'
            },{
                text: D.t('Пользователи'),
                iconCls:'user-publ',
                controller: 'Gvsu.modules.users.controller.PublUsers'
            },{
                text: D.t('Привязка к видам работ'),
                iconCls:'orgs',
                controller: 'Gvsu.modules.distinations.controller.SelWorks'
            }]
        }
    }
    


});

