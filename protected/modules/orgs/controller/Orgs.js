Ext.log = function(mess) {
    console.log(mess)
}
Ext.define('Gvsu.modules.orgs.controller.Orgs',{
    extend: "Core.Controller"
    
    ,info: function(params, cb) {
        var me = this;
        params.cookies.auth = '?'
        me.callModel('.OrgsPubl.getInfo', params.cookies, function(data) {
            if(!data) data = {}
            else {
                for(var i in data) 
                    if(Ext.isString(data[i]))
                        data[i] = data[i].replace(/\n/g, '\\n')    
            }
            me.tplApply('.organisationForm', data, function(html) {
                cb(html)    
            })
        })
    }
    
    ,$saveInfo: function() {
        var me = this;
        me.params.gpc.auth = '?'
        me.callModel('.OrgsPubl.saveInfo', me.params.gpc, function(res) {
            me.sendJSON(res.errors)
        })
    }
})