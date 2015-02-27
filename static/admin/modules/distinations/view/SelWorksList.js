

Ext.define('Gvsu.modules.distinations.view.SelWorksList', {
    extend: 'Core.grid.GridWindow',
    
    //filterable: true,
    filterbar: true,
    //sortManually: true,
    
    requires: ['Core.grid.ComboColumn'],
    
    buildColumns: function() {
        return [{
            dataIndex: 'pid',
            flex: 1,
            text: D.t("Организация"),
            renderer: function(v) {return (v? v.name:'')},
            filter: {
                   xtype: 'combo',
                   valueField: '_id',
                   displayField: 'name',
                   queryMode: 'local',
                   store: Ext.create('Core.data.ComboStore',{
                       dataModel: 'Gvsu.modules.orgs.model.OrgsModel',
                       fieldSet: '_id,name'
                   })
            }

        },{
            xtype: 'combocolumn',
            dataIndex: 'workid',
            sortable: true,    
            flex: 1,
            text: D.t("Вид работ"),
            model: 'Gvsu.modules.distinations.model.WorksModel',
            guideKeyField: '_id',
            guideValueField: 'name',
            filter: {
           		xtype: 'combo',
           		valueField: '_id',
        			displayField: 'name',
        			queryMode: 'local',
           		store: Ext.create('Core.data.ComboStore',{
                   dataModel: 'Gvsu.modules.distinations.model.WorksModel',
                   fieldSet: '_id,name'
               })
            }
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
    
    ,buildTbar: function() {
        return [{
            text: D.t('Add'),
            tooltip: D.t('Add a new row'),
            scale: 'medium',
            ui: 'success',
            action: 'add'
        }, '-', {
            //text:D.t('Reload'),
            tooltip:D.t('Reload data'),
            ui: 'reload',
            //scale: 'medium',
            //iconCls:'refresh',
            action: 'refresh'
        }, '-', {
            text:D.t('Одобрить все'),
            //tooltip:D.t('Reload data'),
            //ui: 'reload',
            //scale: 'medium',
            //iconCls:'refresh',
            action: 'acceptall'
        },'->',{
            //text:D.t('Remove'),
            tooltip:D.t('Remove selected items'),
            ui:'remove',
            action: 'remove'
        }]
    }
    
})
