

Ext.define('Gvsu.modules.tender.view.SubjectsList', {
    extend: 'Core.grid.GridWindow'
    
    ,filtrable: true
    ,sortManually: true
    
    ,requires: ['Core.grid.ComboColumn']
    
    ,buildColumns: function() {
        
        return [
            {
                text: D.t("Предмет тендера"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'name'
            },{
                text: D.t("Направление"),
                flex: 1,
                sortable: true,
                filter: false,
                xtype: 'combocolumn',
                model: 'Gvsu.modules.distinations.model.DistinationsComboModel',
                dataIndex: 'dist'
            },{
                text: D.t("Заказчик"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'customer'
            },{
                text: D.t("Объект"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'object'
            },{
                text: D.t("Стартовая цена"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'price'
            },{
                text: D.t("Дата начала работ"),
                xtype: 'datecolumn',
                width: 100,
                sortable: true,
                filter: true,
                dataIndex: 'date_start'
            },{
                text: D.t("Дата завершения"),
                xtype: 'datecolumn',
                width: 100,
                sortable: true,
                filter: true,
                dataIndex: 'date_fin'
            } 
        ]        
    }
})