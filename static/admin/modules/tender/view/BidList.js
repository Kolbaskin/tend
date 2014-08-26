

Ext.define('Gvsu.modules.tender.view.BidList', {
    extend: 'Core.grid.GridWindow',
    
    //filterable: true,
    
    filterbar: true,
    //sortManually: true,
    
    buildColumns: function() {
        var me = this;
        
        var setStyle = function(v,m,r) {
            m.tdCls = (r.data.status? '':'graycell')
            return v;
        }
        
        var setDateStyle = function(v,m,r) {
            m.tdCls = (r.data.status? '':'graycell')
            return Ext.Date.format(new Date(v), D.t('d.m.Y'));
        }
        
        return [
                {
                    text: D.t("Организация"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'orgname',
                    filter: true,
                    renderer: setStyle
                },{
                    text: D.t("Дата начала"),
                    xtype: 'datecolumn',
                    width: 130,
                    sortable: true,
                    dataIndex: 'date_start',
                    filter: me.dateFilter(),
                    renderer: setDateStyle
                },{
                    text: D.t("Дата завершения работ"),
                    xtype: 'datecolumn',
                    width: 130,
                    sortable: true,
                    dataIndex: 'date_fin',
                    filter: me.dateFilter(),
                    renderer: setDateStyle
                },{
                    text: D.t("Цена за ед."),
                    width: 80,
                    sortable: true,
                    dataIndex: 'price_pos',
                    filter: true,
                    renderer: setStyle
                },{
                    text: D.t("Цена полн."),
                    width: 80,
                    sortable: true,
                    dataIndex: 'price_full',
                    filter: true,
                    renderer: setStyle
                },{
                    text: D.t("Макс. стоим. контр."),
                    width: 100,
                    sortable: true,
                    dataIndex: 'max_contract_val',
                    filter: true,
                    renderer: setStyle
                },{
                    text: D.t("Победитель"),
                    width: 70,
                    sortable: true,
                    dataIndex: 'winner',
                    filter: true,
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
    
    ,dateFilter: function() {
        return {
            type: 'date',
            submitFormat: 'Y-m-d',
            //altFormats: 'c',
            format: D.t('d.m.Y')    
        }
    }
    
    ,buildTbar: function() {
        return [{
            text: D.t('Add'),
            tooltip: D.t('Add a new row'),
            iconCls:'add',
            action: 'add'
        }, '-', {
            text:D.t('Refresh'),
            tooltip:D.t('Refresh data'),
            iconCls:'refresh',
            action: 'refresh'
        },'-',{
            text: D.t('Экспорт в Excel'),
            tooltip:D.t('Экспорт текущей выборки в Excel'),
            action: 'xls'
        },'->',{
            text:D.t('Remove'),
            tooltip:D.t('Remove the selected item'),
            iconCls:'remove',
            action: 'remove'
        }]
    }
    
})