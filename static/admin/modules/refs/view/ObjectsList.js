

Ext.define('Gvsu.modules.refs.view.ObjectsList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    sortManually: true,
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Объект"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name'
                }
            ]        
    }
    
})