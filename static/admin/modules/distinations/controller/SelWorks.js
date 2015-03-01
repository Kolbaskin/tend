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
/*
    ,beforeModify: function(form, data) {
console.log('data pid:', data)        
        if(data.pid) data.pid = data.pid._id
        return true;
    }
*/    
    ,beforeSave: function(form, data, cb) {
        if(data.status == 3 && !data.notes) {
            alert('Укажите причину отказа');
            form.down('[action=formsave]').setDisabled(false)
            form.down('[action=formapply]').setDisabled(false)
            form.down('[name=notes]').focus()
            return false;
        } else {
            cb(data)
            return true;
        }
    }
    
});

