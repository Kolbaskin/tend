Ext.define('Crossings.Test',{
    extend: "Core.Controller"
    
    ,navigate: function(params, callback) {        
        params.menu = [{title: 'title 1'}, {title: 'title 2'}]
        callback(params)        
    }
    
    ,testblock: function(params, callback) {
        callback('TEST BLOCK')    
    }
    
})