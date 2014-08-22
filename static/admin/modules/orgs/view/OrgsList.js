

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
                dataIndex: 'contact_person',
                flex: 1,
                sortable: true,
                filter: true,
                renderer: setStyle,
                text: D.t('Контактное лицо')
            },{
                dataIndex: 'phone',
                flex: 1,
                sortable: true,
                filter: true,
                renderer: setStyle,
                text: D.t('Телефон')
            },{
                dataIndex: 'email',
                flex: 1,
                sortable: true,
                filter: true,
                renderer: setStyle,
                text: D.t('E-mail')
            },{
                dataIndex: 'sro',
                flex: 1,
                sortable: true,
                filter: false,
                renderer: setStyle,
                text: D.t('СРО (в рублях)')
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