

Ext.define('Gvsu.modules.tender.view.BidList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    //sortManually: true,
    
    buildColumns: function() {
        var setStyle = function(v,m,r) {
            m.tdCls = (r.data.status? '':'graycell')
            return v;
        }
        return [
                {
                    text: D.t("Организация"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'orgname',
                    renderer: setStyle
                },{
                    text: D.t("Дата начала работ"),
                    xtype: 'datecolumn',
                    width: 100,
                    sortable: true,
                    dataIndex: 'date_start',
                    format: 'd.m.Y',
                    renderer: setStyle
                },{
                    text: D.t("Дата завершения работ"),
                    xtype: 'datecolumn',
                    width: 100,
                    sortable: true,
                    dataIndex: 'date_fin',
                    format: 'd.m.Y',
                    renderer: setStyle
                },{
                    text: D.t("Цена за ед."),
                    width: 80,
                    sortable: true,
                    dataIndex: 'price_pos',
                    renderer: setStyle
                },{
                    text: D.t("Цена полн."),
                    width: 80,
                    sortable: true,
                    dataIndex: 'price_full',
                    renderer: setStyle
                },{
                    text: D.t("Макс. стоим. контр."),
                    width: 100,
                    sortable: true,
                    dataIndex: 'max_contract_val',
                    renderer: setStyle
                },{
                    text: D.t("Победитель"),
                    width: 70,
                    sortable: true,
                    dataIndex: 'winner',
                    renderer: function(v,m,r) {
                        setStyle(v,m,r)
                        if(v) return D.t('Да')
                        else return ''
                    }
                },{
                    text: D.t("Стат."),
                    width: 30,
                    sortable: true,
                    dataIndex: 'status',
                    renderer: setStyle
                }
            ]        
    }
    
})