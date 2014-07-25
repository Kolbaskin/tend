

Ext.define('Gvsu.modules.orgs.view.OrgsList', {
    extend: 'Core.grid.GridWindow'
    
    ,filtrable: true
    //,sortManually: true
    
    ,buildColumns: function() {
        
        var setStyle = function(v,m,r) {
            m.tdCls = (r.data.active? '':'graycell')
            return v;
        }
        
        return [
            {
                text: D.t("Название"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'name',
                renderer: setStyle
            },{
                text: D.t("Полное название"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'fullname',
                renderer: setStyle
            },{
                text: D.t("Активир."),
                width: 60,
                sortable: true,
                filter: true,
                dataIndex: 'active',
                renderer: setStyle
            } 
        ]        
    }
})