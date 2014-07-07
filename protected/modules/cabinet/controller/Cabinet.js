Ext.define('Gvsu.modules.cabinet.controller.Cabinet',{
    extend: "Core.Controller"
    
    ,dashboard: function(params, cb) {
        var me = this;
        [
            function() {
console.log('param:', params)                
                me.tplApply('.cabinet', {status: false, user: {}}, cb)        
            }
        ].runEach()
        
    }
    
    
})