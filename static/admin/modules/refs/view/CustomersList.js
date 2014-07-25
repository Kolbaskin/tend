

Ext.define('Gvsu.modules.refs.view.CustomersList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    sortManually: true,
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Организация"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name'
                }
            ]        
    }
    
})