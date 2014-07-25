

Ext.define('Gvsu.modules.distinations.view.WorksList', {
    extend: 'Core.grid.GridWindow',
    
    //filterable: true,
    sortManually: true,
    
    buildColumns: function() {

        return [
                {
                    text: D.t("Виды работ"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name'
                }
            ]        
    }
    
})