Ext.define('Gvsu.modules.docs.view.OrgDocsForm', {
    extend: 'Core.form.DetailForm'
    
    ,titleIndex: 'doc_name'
    
    ,layout: 'border'    
    ,defaults: {
        margin: '0'
    }
    ,width: 750
    ,height: 420
    
    ,newCurSize: 0
    ,curSize: 50
    ,curW: 0
    ,curH: 0
    
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
        
        var me = this;           
        
        me.previewImage = Ext.create('Ext.Img', {
            width: me.curSize + '%',
            style: 'background: #ffffff;padding: 10px;'
        })
        
        me.previewStore = Ext.create('Ext.data.Store', {
            fields: ['img', 'id'],
            data: [],
            listeners: {
                load: function(el) {
                    setTimeout(function() {
                        if(el.data && el.data.length) 
                            me.changePageImg(el.data.items[0].data)    
                    }, 1000)
                }
            }
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
                                me.changePageImg(nodes[0].data)                               
                                
                            }
                        }
                    }
                }), {
                    bbar: [{
                        fieldLabel: D.t('Масштаб'),
                        labelWidth: 70,
                        xtype: 'slider',
                        width: 170,
                        value: me.curSize,
                        action: 'sizeslider',
                        listeners: {
                            change: function(el, v) {
                                me.previewImage.setSize(v * me.curW/me.curSize,v * me.curH/me.curSize)
                                me.newCurSize = v;
                            }
                        }
                    },'-',{
                        text: 'Повернуть',
                        action: 'rotate'
                    },'->',{
                        xtype: 'label',
                        width: 100,
                        action: 'curpage'
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
    
    ,changePageImg: function(data) {
        var me = this
            ,h,w,k
            ,d = this.previewImage.getEl().dom
            ,img = document.createElement("img")
        
        img.onload = function() {                        
            me.previewImage.setSrc(data.img)
            k = d.width / img.width
            if(k) me.curH = img.height * k;
            else me.curH = d.height
            me.curW = d.width;
            if(me.newCurSize) me.curSize = me.newCurSize;
            me.previewImage.setHeight(me.curH)
        }
        
        img.src = data.img
    
        this.down('[action=curpage]').setText('Страница: ' + data.id)
    }

    
})