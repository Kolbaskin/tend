Ext.define('Gvsu.modules.comments.view.CommentsForm', {
    extend: 'Core.form.DetailForm',
    
    titleIndex: 'user',

    width: 400,
    //height: 420,
    
    buildItems: function() {
        var me = this;
        return [{
            xtype: 'textarea',
            labelWidth: 150,
            height: 150,
            name: 'mess',
            anchor: '90%'
        },{
            xtype: 'textfield',            
            name: 'pid',
            inputType: 'hidden'
        }]
    }
    
})