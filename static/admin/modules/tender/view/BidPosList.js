

Ext.define('Gvsu.modules.tender.view.BidPosList', {
    extend: 'Core.grid.GridWindow',
    
    //filterable: true,
    
    //filterbar: true,
    //sortManually: true,
    requires: ['Core.grid.ComboColumn'],
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Позиция"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'pid',
                    xtype: 'combocolumn',
                    model: 'Gvsu.modules.tender.model.PositionsModel'
                },{
                    text: D.t("Цена за единицу"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'price1'
                },{
                    text: D.t("Полная цена"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'price2'
                }
            ]        
    }
    
    ,buildTbar: function() {
        return [{
            text:D.t('Refresh'),
            tooltip:D.t('Refresh data'),
            iconCls:'refresh',
            action: 'refresh'
        }]
    }
    
    
})