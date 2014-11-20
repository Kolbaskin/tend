

Ext.define('Gvsu.modules.tender.view.TenderList', {
    extend: 'Core.grid.GridWindow'
    
    ,filtrable: true
    //,sortManually: true
    
    ,buildColumns: function() {
        
        return [
            {
                text: D.t("ID"),
                width: 50,
                sortable: true,
                filter: true,
                dataIndex: '_id'
            },{
                text: D.t("Формат"),
                width: 150,
                sortable: true,
                filter: true,
                dataIndex: 'form',
                renderer: function(v) {
                    switch(v) {
                        case 1: return 'открытый тендер';
                        case 2: return 'закрытый тендер';
                        case 3: return 'закрытый аукцион';
                        case 4: return 'открытый аукцион';
                    }
                }
            },{
                text: D.t("Название"),
                flex: 1,
                sortable: true,
                filter: true,
                dataIndex: 'name'
            },{
                text: D.t("Дата начала"),
                xtype: 'datecolumn',
                width: 60,
                sortable: true,
                filter: true,
                format: D.t('d.m.Y'),
                dataIndex: 'date_start'
            },{
                text: D.t("Дата завершения"),
                xtype: 'datecolumn',
                width: 100,
                sortable: true,
                filter: true,
                format: D.t('d.m.Y'),
                dataIndex: 'date_fin'
            },{
                text: D.t("Публикация"),
                width: 100,
                sortable: true,
                filter: true,
                dataIndex: 'publ',
                renderer: function(v) {
                    return v? 'опубликован':''    
                }
            },{
                text: D.t("Рассылка"),
                width: 100,
                sortable: true,
                filter: true,
                dataIndex: 'sent',
                renderer: function(v) {
                    return v? 'была':''    
                }
            }  
        ]        
    }
})