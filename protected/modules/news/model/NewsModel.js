Ext.define('Crossings.news.model.NewsModel',{

    getAllNews: function(params, callback) {
        setTimeout(function() {
            callback({test: 'all news', name: '<b>Tester</b>', age: true, time: new Date()})
        }, 1)
    }
    
})