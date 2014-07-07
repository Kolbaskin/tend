Ext.define('Crossings.news.controller.News',{
    extend: "Core.Controller"
    
    ,$test: function() {        
        this.callModel('.NewsModel.getAllNews').toTemplate('.NewsList') // 1й вариант
    }
    
})