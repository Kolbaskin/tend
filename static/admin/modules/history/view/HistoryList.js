

Ext.define('Gvsu.modules.history.view.HistoryList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Пользователь"),
                    width: 150,
                    sortable: false,
                    dataIndex: 'maker',
                    renderer: function(v) {                        
                        return v.name || v.login;
                    }
                },{
                    text: D.t("Дата"),
                    width: 150,
                    xtype: 'datecolumn',
                    sortable: true,
                    format: 'd.m.Y H:i',
                    dataIndex: 'ctime'
                    
                },{
                    text: D.t("Объект"),
                    flex: 1,
                    dataIndex: 'obj'
                },{
                    text: D.t("Комментарий"),
                    flex: 1,
                    dataIndex: 'mess'
                }
            ]        
    }
    
})