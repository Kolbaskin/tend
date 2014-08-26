'use strict';

Ext.define('Gvsu.modules.tender.view.BidPosForm', {
    extend: 'Core.form.DetailForm'
    
    ,titleIndex: 'pid'
    
    ,filterbar: true
    
    ,layout: 'border'    
    ,defaults: {
        margin: '0'
    }
    ,width: 950
    ,height: 520
    
    
    
    ,buildItems: function() {
        var me = this;
        
        return [{
            name: 'pid'
        }]
    }

    
})