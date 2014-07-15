

Ext.define('Gvsu.modules.docs.view.DocTypesList', {
    extend: 'Core.grid.GridWindow',
    
    filterable: true,
    sortManually: true,
    
    buildColumns: function() {
        return [
                {
                    text: D.t("Название типа"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'name'
                },{
                    text: D.t("Срок действия, дней"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'duration'
                },{
                    text: D.t("Обязательный для участия"),
                    flex: 1,
                    sortable: true,
                    dataIndex: 'required'
                }
            ]        
    }
    
})