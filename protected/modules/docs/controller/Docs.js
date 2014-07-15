Ext.define('Gvsu.modules.docs.controller.Docs',{
    extend: "Core.Controller"
    
    ,docs: function(params, cb) {
        
        if(params.pageData.page)
            this.addDoc(params, cb)
        else 
            this.docsList(params, cb)
    }
    
    ,docsList: function(params, cb) {
        var me = this;



        [
            function(next) {
                params.cookies.auth = '?'
                me.callModel('Gvsu.modules.docs.model.Docs.list', params.cookies, function(data) {
                    me.tplApply('.documents', {list: data}, cb)
                })
            }
            
            
        ].runEach();
    }
    
    ,addDoc: function(params, cb) {
        var me = this   
            ,type = parseInt(params.pageData.page);
        
        [
            function(next) {
                if(params.gpc.type) {
                    me.callModel('Gvsu.modules.docs.model.Docs.add', {
                        uid: params.cookies.uid,
                        token: params.cookies.token,
                        auth: '?',
                        gpc: params.gpc,
                        files: params.files
                    }, function(data) {
                        next(true)
                    })
                } else {
                    next(false)
                }
            } 
            ,function(add, next) {
                me.callModel('Gvsu.modules.docs.model.Docs.getTypes', {}, function(data) {
                    me.tplApply('.documentAddForm', {list:data, type: type, addStatus: add}, cb)
                })
            }
        ].runEach()
    }
    
})