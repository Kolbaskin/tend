

Ext.define('Gvsu.modules.tender.view.PositionsList', {
    extend: 'Core.grid.GridWindow'
    
    ,filtrable: true
    ,sortManually: true
    
    ,buildColumns: function() {
        
        return [
            {
                text: D.t("Наименование позиции"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'name'
            },{
                text: D.t("Комментарий"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'comments'
            },{
                text: D.t("Единица измерения"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'uname'
            },{
                text: D.t("Количество"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'counts'
            }
        ]        
    }
})