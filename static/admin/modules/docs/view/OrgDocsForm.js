Ext.define('Gvsu.modules.docs.view.OrgDocsForm', {
    extend: 'Core.form.DetailForm'
    
    ,titleIndex: 'doc_name'
    
    ,layout: 'border'    
    ,defaults: {
        margin: '0'
    }
    ,width: 750
    ,height: 420
    
    ,buildItems: function() {
       var me = this;
        return [
            me.buildFormPanel(),
            me.buldPreviewPanel()
        ]
    }
    
    ,buildFormPanel: function() {
        
        return {
            xtype: 'panel',
            region: 'north',
            height: 155,
            layout: 'anchor',
            bodyStyle: 'padding: 10px;background: none;',
            border: false,
            bodyBorder: false,
            defaults: {
                xtype: 'textfield',
                labelWidth: 150
                ,anchor: '90%'    
            },
            items: this.buildFields()
        }
    }
    
    ,buildFields: function() {
        return [
        {
            name: 'doc_name',
            fieldLabel: D.t('Наименование файла')
        },{
            xtype: 'fieldcontainer', 
            hideLabel: true,
            columnWidth: 0.5,
            layout: 'hbox',
            defaults: {
                xtype: 'datefield',
                submitFormat: 'c',
                altFormats: 'c',
                format: D.t('d.m.Y'),
                labelWidth: 150
                    
            },
            items: [{
                name: 'date_add',
                fieldLabel: D.t('Дата добавления'),
                margins: '0 20 0 0'
            },{
                name: 'date_fin',
                fieldLabel: D.t('Дата завершения')
            }]
        },{
            
            name: 'status',
            xtype: 'combo',
            store: Ext.create('Ext.data.ArrayStore', {
                fields: ['id', 'name'],
                data: [[0, 'новый документы'], [1, 'на модерации'], [2, 'одобрен'], [3, 'отклонен']]
            }),
            valueField: 'id',
            displayField: 'name',
            fieldLabel: D.t('Статус')
        },{
            name: 'file_name',
            inputType: 'hidden'
        },{
            name: 'notes',
            fieldLabel: D.t('Примечание')
        }]
    }
    
    ,buldPreviewPanel: function() {
        
        var me = this
            ,newCurSize
            ,curSize = 50
            ,curW, curH;
        
        me.previewImage = Ext.create('Ext.Img', {
            width: curSize + '%',
            style: 'background: #ffffff;padding: 10px;'
        })
        
        me.previewStore = Ext.create('Ext.data.Store', {
            fields: ['img', 'id'],
            data: []
        })
        
        return {
            xtype: 'panel',
            region: 'center',
            layout: 'border',
            tbar: [{
                text: D.t('Печать'),
                ui: 'inverse',
                action: 'print'
            },'-',{
                text: D.t('Скачать оригинал'),
                ui: 'info',
                action: 'download'
            }       
            ],
            border: false,
            bodyBorder: false,
            items: [
            
                Ext.create('Ext.view.View', {
                    width: 170,
                    region: 'west',
                    store: me.previewStore,
                    id: 'images-view',
                    style: 'overflow-y: auto;',
                    tpl: [
                        '<tpl for=".">',
                            '<div class="thumb-wrap" id="{id}">',
                                '<div class="thumb"><img src="{img}" title="страница {id}"></div>',
                                '<span class="x-editable">страница {id}</span>',
                            '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                    ],
                    multiSelect: false,
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    itemSelector: 'div.thumb-wrap',
                    emptyText: 'No preview to display',            
                    listeners: {
                        selectionchange: function(dv, nodes ){
                            if(nodes && nodes[0]) {
                                var d = me.previewImage.getEl().dom;
                                me.previewImage.setSrc(nodes[0].data.img)//+'" style="width:100%;" />')
                                curW = d.width;
                                curH = d.height;
                                if(newCurSize) curSize = newCurSize;
                                me.previewImage.setHeight(curH)
                            }
                        }
                    }
                }), {
                    bbar: [{
                        fieldLabel: D.t('Масштаб'),
                        labelWidth: 70,
                        xtype: 'slider',
                        width: 170,
                        value: curSize,
                        action: 'sizeslider',
                        listeners: {
                            change: function(el, v) {
                                me.previewImage.setSize(v * curW/curSize,v * curH/curSize)
                                newCurSize = v;
                            }
                        }
                    },'-',{
                        text: 'Повернуть',
                        action: 'rotate'
                    }],
                    xtype: 'panel',
                    region: 'center',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    border: false,
                    bodyStyle: 'padding: 10px;background: #aaaaaa;',
                    autoScroll: true,
                    items: me.previewImage
                }
            ]
        }
    }
    
    /*,buldPreviewPanel: function() {
        return {
            xtype: 'panel',
            name: 'previewPanel',
            region: 'center',
            layout: 'fit',
            border: false,
            bodyStyle: 'overflow: auto;padding: 10px;',
            tbar: [{
                text: D.t('Печать'),
                ui: 'inverse',
                action: 'print'
            },'-',{
                text: D.t('Скачать оригинал'),
                ui: 'info',
                action: 'download'
            }       
            ],
            html: ''
        }    
    }*/
    
})
