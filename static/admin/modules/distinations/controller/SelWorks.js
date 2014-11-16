/*!
 * Wpier
 * Copyright(c) 2014 Max Tushev
 * 
 * 
 */

Ext.define('Gvsu.modules.distinations.controller.SelWorks', {
    extend: 'Core.controller.Controller',

    launcher: {
        text: D.t('Выбранные направления'),
        iconCls:'distinations'        
    }
    
    ,addControls: function(win) {
        var me = this

        me.control(win,{
            "[action=acceptall]": {click: function() {me.acceptAll(win)}}
        })
        me.callParent(arguments)
    }
    
    ,acceptAll: function() {
        
        if(this.parentParams) {
            this.model.acceptAll(this.parentParams)    
        }
    }
    
});

