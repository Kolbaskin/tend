

Ext.define('Gvsu.modules.distinations.view.DistinationsList', {
    extend: 'Core.grid.GridWindow',
    
    //filterable: true,
    sortManually: true,
    
    buildColumns: function() {

        return [
                {
                    text: D.t("Название категории"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name'
                }
            ]        
    }
    
})