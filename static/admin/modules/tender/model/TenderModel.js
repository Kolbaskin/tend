Ext.define('Gvsu.modules.tender.model.TenderModel', {    
     extend: "Core.data.DataModel"
    
    ,collection: 'gvsu_tender'
    
    ,fields: [{
        name: '_id',
        type: 'ObjectID',
        visable: true
    },{
        name: 'publ',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'name',
        type: 'string',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'form',
        type: 'int',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'date_start',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'date_fin',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'date_workstart',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'date_workfin',
        type: 'date',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'avance_comp',
        type: 'string',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'date_doc',
        type: 'date',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'min_sro',
        type: 'int',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'prolong',
        type: 'int',
        editable: true,
        visable: true
    },{
        name: 'descript',
        type: 'text',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'inv_sro',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'inv_date',
        type: 'date',
        editable: true,
        filterable: true,
        visable: true
    },{
        name: 'inv_dir',
        type: 'boolean',
        filterable: true,
        editable: true,
        visable: true
    },{
        name: 'inv_orgs',
        type: 'arraystring',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'file',
        type: 'file',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'filelink',
        type: 'string',
        filterable: false,
        editable: true,
        visable: true
    },{
        name: 'start_price',
        type: 'float',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'step_price',
        type: 'float',
        editable: true,
        filterable: false,
        visable: true
    },{
        name: 'sent',
        type: 'boolean',
        editable: true,
        filterable: false,
        visable: true
    }
    ]
    
    ,sendMessages: function() {
        var me = this;
			console.log('Start sending:');        
        [
            function(next) {
                me.src.db.collection(me.collection).find({
                    publ: 1, 
                    inv_date:{$lte:Ext.Date.format(new Date(),'c')} 
                    ,sent: {$is: null}
                }, {})
                .toArray(function(e, tenders) {
                    if(tenders && tenders.length) {
                        me.sendMess2Users(tenders, function() {
                            next(tenders)    
                        })    
                    }                
                }) 
            }
            ,function(tenders) {
                var ids = []
                tenders.each(function(t) {ids.push(t._id)})
                me.src.db.collection(me.collection).update({
                    _id: {$in: ids}
                },{ 
                    sent: 1
                }, function() {
                    
                    })
            }
        ].runEach()
    }
    
    ,sendMess2Users: function(tenders, cb) {
        var me = this;

        var insEmail = function(emails, r) {
        	if(r.email) {
        		var x = r.email.replace(/;/g,',').split(',')
        		x.forEach(function(e) {
        			if(emails.indexOf(e.email) == -1) emails.push(e)
        		})
        	}
        }        
        
        var func = function(i) {
            if(i>=tenders.length) {
                cb()
                return;
            }
            var orgs, find = {};
            
            [
                function(next) {
                    if(tenders[i].inv_sro) {
                        find.sro = {$gte: tenders[i].inv_sro}    
                    }
                    next()
                }
                ,function(next) {
                    if(tenders[i].inv_dir) {
                        me.getOrgsByDir(tenders[i], function(items) {
                            if(items) find._id = {$in: items}
                            next()
                        })   
                    } else next()
                }
                ,function(next) {
                    if(tenders[i].inv_orgs) {
                        orgs = tenders[i].inv_orgs.split(',')  
                    }
                    next()    
                }
                ,function(next) {
                    if(orgs) {
                        if(Object.keys(find).length)
                            find = {$or: [find, {_id:{$in: orgs}}]}
                        else
                            find = {_id:{$in: orgs}}
                    }
                    
                      
                    me.src.db.collection('gvsu_orgs').find(find, {email: 1}).toArray(function(e, orgs) {
                        if(orgs && orgs.length) {

									var emails = []
									orgs.forEach(function(o) {
										insEmail(emails, o)
								   })
									                        	
                        	             	
                        	me.src.db.collection('gvsu_users').find({org: {$in: orgs}}, {email: 1}).toArray(function(e, users) {
                        		if(users) {
	                        		users.forEach(function(o) {
												insEmail(emails, o)
										   })
										}
                        		
                        	
                        
	                            me.callModel('Gvsu.modules.mail.controller.Mailer.newTenderMessage', {
	                                tender: tenders[i],
	                                users: emails
	                            }, function() {
	                                func(i+1)    
	                            })
	                            
	                            
	                        })
                        } else func(i+1)
                    })
                }
            ].runEach()
        }
        func(0)
    }
    
    ,getOrgsByDir: function(tender, cb) {
        var me = this;
         
        [
            function(next) {
                me.src.db.collection('gvsu_tendersubj').find({pid: tender._id}, {dist: 1}).toArray(function(e,d) {
                    if(d && d.length) next(d)
                    else cb()
                })    
            }
            ,function(subj, next) {
                var ids = []
                subj.each(function(s) {if(s.dist) ids.push(s.dist)})
                me.src.db.collection('gvsu_worksorg').find({workid: ids, status: 2}, {pid: 1, workid: 1}).toArray(function(e,d) {
                    if(d && d.length) next(d, ids)
                    else cb()
                })    
            }
            ,function(orgs, works) {
                var vals = {}, out = [];
                orgs.each(function(o) {
                    if(!vals[o.pid]) vals[o.pid] = []
                    vals[o.pid].push(o.workid)
                })
                for(var i in vals) {
                    log = true;
                    for(var j=0;j<works.length;j++) {
                        if(vals[i].indexOf(works[j]) == -1) {
                            log = false;
                            break;
                        }
                    }
                    if(log) out.push(parseInt(i))
                }
                cb(out)
            }
        ].runEach()
    }
    
    /*
    ,beforeSave: function(data, cb) {
        var me = this;
        
        [
            function(next) {
                if(!data.publ) 
                    cb(data)
                else
                if(data._id) 
                    me.src.db.collection(me.collection).findOne({_id: data._id}, {publ: 1}, function(e,d) {
                        if(d && !d.publ) 
                            next()
                        else
                            cb(data)
                    })  
                else
                    next()
            }
            
            ,function() {
                me.sendMess = true;
                //me.callModel('Gvsu.modules.mail.controller.Mailer.newTenderMessage', data, function() {
                cb(data)
                //})    
            }
        ].runEach()
    }
    
    ,afteSave: function(data, cb) {
        var me = this;
        if(me.sendMess) {
            me.callModel('Gvsu.modules.mail.controller.Mailer.newTenderMessage', data, function() {
                cb(data)
            }) 
        }

    }
    */
    
})