

Ext.define('Gvsu.modules.users.view.PublUsersList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    
    buildColumns: function() {
        
        var setStyle = function(v,m,r) {
            m.tdCls = (r.data.activated? '':'graycell')
            return v;
        }
        
        return [
                {
                    text: D.t("Логин"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'login',
                    renderer: setStyle
                },{
                    text: D.t("Контактное лицо"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'fname',
                    renderer: function(v, m, r) {
                        m.tdCls = (r.data.activated? '':'graycell')
                        return r.data.fname + ' ' + r.data.name + ' ' +  r.data.sname;    
                    }
                },{
                    text: D.t("Организация"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'company',
                    renderer: setStyle
                },{
                    text: D.t("E-mail"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'email',
                    renderer: setStyle
                },{
                    text: D.t("Phone"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'phone',
                    renderer: setStyle
                },{
                    text: D.t("Status"),
                    width: 60,
                    sortable: true,
                    dataIndex: 'activated',
                    renderer: setStyle
                }
            ]        
    }
    
})