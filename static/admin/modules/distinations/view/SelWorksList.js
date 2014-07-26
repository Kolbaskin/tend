

Ext.define('Gvsu.modules.distinations.view.SelWorksList', {
    extend: 'Core.grid.GridWindow',
    
    //filterable: true,
    sortManually: true,
    
    requires: ['Core.grid.ComboColumn'],
    
    buildColumns: function() {
        return [{
            xtype: 'combocolumn',
            dataIndex: 'pid',
            sortable: true,    
            flex: 1,
            text: D.t("Организация"),
            model: 'Gvsu.modules.orgs.model.OrgsModel',
            guideKeyField: '_id',
            guideValueField: 'name'
        },{
            xtype: 'combocolumn',
            dataIndex: 'workid',
            sortable: true,    
            flex: 1,
            text: D.t("Вид работ"),
            model: 'Gvsu.modules.distinations.model.WorksModel',
            guideKeyField: '_id',
            guideValueField: 'name'
        },{
            text: D.t("Статус"),
            width: 100,
            sortable: true,
            dataIndex: 'status',
            renderer: function(v) {
                return ['', 'проверка', 'одобрено', 'ошибка'][v]    
            }
        }]        
    }
    
})