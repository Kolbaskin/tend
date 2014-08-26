/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.tender.controller.Main', {
    extend: 'Core.controller.MenuController',
    
    launcher: {
        text: D.t('Тендеры'),
        iconCls:'tender',
        menu: {
            items: [                    
            {
                text: D.t('Тендеры'),
                iconCls:'tender',
                controller: 'Gvsu.modules.tender.controller.Tender'
            },{
                text: D.t('Заявки'),
                iconCls:'tender',
                controller: 'Gvsu.modules.tender.controller.Bid'
            },{
                text: D.t('Позиции'),
                iconCls:'tender',
                controller: 'Gvsu.modules.tender.controller.BidPos'
            }]
        }
    }
    


});

