

Ext.define('Gvsu.modules.tender.view.BidList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    //sortManually: true,
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Организация"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'orgname'
                },{
                    text: D.t("Дата начала работ"),
                    xtype: 'datecolumn',
                    width: 100,
                    sortable: true,
                    dataIndex: 'date_start'
                },{
                    text: D.t("Дата завершения работ"),
                    xtype: 'datecolumn',
                    width: 100,
                    sortable: true,
                    dataIndex: 'date_fin'
                },{
                    text: D.t("Цена за ед."),
                    width: 80,
                    sortable: true,
                    dataIndex: 'price_pos'
                },{
                    text: D.t("Цена полн."),
                    width: 80,
                    sortable: true,
                    dataIndex: 'price_full'
                },{
                    text: D.t("Макс. стоим. контр."),
                    width: 100,
                    sortable: true,
                    dataIndex: 'max_contract_val'
                },{
                    text: D.t("Победитель"),
                    width: 70,
                    sortable: true,
                    dataIndex: 'winner',
                    renderer: function(v) {
                        if(v) return D.t('Да')
                        else return ''
                    }
                }
            ]        
    }
    
})