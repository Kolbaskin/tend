Ext.define("Gvsu.Core.ProjectServer",{
    extend: "Core.ProjectServer"
    
    ,dbConnect: function(callback) {
        this.sources.db = Ext.create("Database.drivers.Mysql.Database", this.config.mysql)
        callback()
    }
    
    
    
})