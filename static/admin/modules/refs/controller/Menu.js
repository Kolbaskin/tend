/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.refs.controller.Menu', {
    extend: 'Core.controller.MenuController',
    
    launcher: {
        text: D.t('Справочники'),
        iconCls:'refs',
        menu: {
            items: [                    
            {
                text: D.t('Контрагенты'),
                iconCls:'refs',
                controller: 'Gvsu.modules.refs.controller.Customers'
            },{
                text: D.t('Объекты'),
                iconCls:'refs',
                controller: 'Gvsu.modules.refs.controller.Objects'
            },{
                text: D.t('Виды работ'),
                iconCls:'distinations',
                controller: 'Gvsu.modules.distinations.controller.Distinations'
            },{
                text: D.t('Типы документов'),
                iconCls:'docstypes',
                controller: 'Gvsu.modules.docs.controller.DocTypes'
            }]
        }
    }
    


});

