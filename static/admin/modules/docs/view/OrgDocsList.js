

Ext.define('Gvsu.modules.docs.view.OrgDocsList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    sortManually: true,
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Файл"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'doc_name'
                },{
                    text: D.t("Дата загрузки"),
                    xtype: 'datecolumn',
                    width: 100,
                    sortable: true,
                    dataIndex: 'date_add'
                },{
                    text: D.t("Дата завершения"),
                    xtype: 'datecolumn',
                    width: 100,
                    sortable: true,
                    dataIndex: 'date_fin'
                },{
                    text: D.t("Статус"),
                    width: 100,
                    sortable: true,
                    dataIndex: 'status',
                    renderer: function(v) {
                        switch(v) {
                            case 0: return 'новый';
                            case 1: return 'на модерации';
                            case 2: return 'одобрен';
                            case 3: return 'отклонен';
                        }
                        return ''
                    }
                }
            ]        
    }
    
})