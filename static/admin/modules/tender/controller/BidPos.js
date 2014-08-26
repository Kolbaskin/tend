/*!
 * Wpier
 * Copyright(c) 2006-2011 Sencha Inc.
 * 
 * 
 */

Ext.define('Gvsu.modules.tender.controller.BidPos', {
    extend: 'Core.controller.Controller'
    ,id:'tender-bidpos-win'
    
    ,launcher: {
        text: D.t('Заявки участников'),
        iconCls:'tender'
    }
    
    ,getPermissions: function() {        
        this.Permissions = {
            read: true,
            add: false,
            modify: false,
            del: false
        }
    }
    
});

