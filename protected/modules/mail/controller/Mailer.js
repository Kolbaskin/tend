var fs = require('fs')

Ext.define('Gvsu.modules.mail.controller.Mailer',{
    extend: "Core.Controller"
    
    ,orgActivateRequest: function(org, cb) {
        var me = this;
        
        if(!cb) cb = function() {};
        
        [
            function(next) {
                me.src.db.collection('admin_users').find({act1:1}, {email: 1}).toArray(function(e,emails) {
                    if(emails && emails.length) next(emails)
                    else cb()
                })    
            }
            
            ,function(emails) {
                me.tplApply('.orgActivateRequest', org, function(html) {
                    var f = function(i) {
                        if(i>=emails.length) {
                            cb()
                            return;
                        }
                        me.src.mailTransport.sendMail({
                            from: me.config.messages.activateMailFrom,
                            to: emails[i].email,
                            subject: 'запрос на активацию компании ' + org.name,
                            html: html
                        }, function(e,d) {
                            f(i+1)    
                        })
                    }
                    f(0)
                })
            }
        ].runEach()
    }
    
    ,userActivateRequest: function(res, cb) {
        var me = this;
        res.values.host = me.request.headers.host;
        me.tplApply('.userActivation', res.values, function(html) {
            me.src.mailTransport.sendMail({
                from: me.config.messages.activateMailFrom,
                to: res.values.email,
                subject: me.config.messages.activateMailSubject,
                html: html
            }, function() {
                if(!!cb) cb()    
            })
        })
    }
    
    ,newTenderMessage: function(data, cb) {
        var me = this, file;
        
        [
            function(next) {
                if(data.tender.file) {
                    try {
                        data.tender.file = JSON.parse(data.tender.file)
                    } catch(e) {
                        data.tender.file = null
                    }
                }
                next()
            }
            ,function(next) {
                if(data.tender.file) {
                    fs.readFile(me.config.staticDir + me.config.userFilesDir + '/' + data.tender.file.file, function (err, d) {
                        if(d)
                            file = {filename: data.tender.file.name, contents: d}
                        next()
                    })
                } else next()
            }
            ,function(next) {
                me.tplApply('.newTender2User', data.tender, next);
            }
            ,function(html) {
                var f = function(i) {
                    if(i>=data.users.length) {
                        if(!!cb) cb()
                        return;    
                    }
                    console.log('Tender ', data.tender.name, ' sent to ',data.users[i])
      
                    
                    var mess = {
                        from: me.config.messages.activateMailFrom,
                        to: data.users[i],
                        subject: 'ГВСУ-Центр сообщает о новом тендере',
                        html: html
                    }
                    if(file) {
                        mess.attachments = [file]
                    }
                    me.src.mailTransport.sendMail(mess, function() {
                        f(i+1)    
                    })
                }
                f(0)
            }
        ].runEach()
    }
    
    ,winnerLetter: function(data, cb) {
        var me = this, email;

        [
            function(next) {
                me.src.db.collection('gvsu_tenderbid').findOne({_id: parseInt(data.bid)}, {orgid: 1}, function(e,d) {

                    if(d && d.orgid)
                        next(d.orgid)
                    else
                        cb()
                })          
            }
            
            ,function(oid, next) {
                me.src.db.collection('gvsu_orgs').findOne({_id: oid}, {email: 1}, function(e,d) {
                    if(d && d.email) {
                        email = d.email
                        next()
                    } else
                        cb()
                })          
            }
                
            ,function(next) {
                me.src.db.collection('gvsu_tender').findOne({_id: parseInt(data.tid)}, {}, function(e,d) {
                    if(d)
                        next(d)
                    else
                        cb()
                })          
            }
            
            ,function(tender, next) {
                me.tplApply('.winnerLetter', tender, next);
            }
            
            ,function(html) {
                var mess = {
                    from: me.config.messages.activateMailFrom,
                    to: email,
                    subject: 'ГВСУ-Центр сообщает о победе в тендере',
                    html: html
                }
                me.src.mailTransport.sendMail(mess, function() {
                    cb()    
                })
            }
        ].runEach()
    }
    ,orgStatusDay: function(data, cb) {
        var me = this;
        var f = function(i) {
            if(i>=data.orgs.length) {
                cb()
                return;
            }
            var o = data.orgs[i];
            o.warn = data.warn
            me.orgStatusDay1(o, function() {
                f(i+1)    
            })
        }
        f(0)
    }
    ,orgStatusDay1: function(data, cb) {
        var me = this;
        [
            function(next) {
                me.tplApply('.orgStatusDay', data, next);
            }
            ,function(html) {
                var mess = {
                    from: me.config.messages.activateMailFrom,
                    to: data.email,
                    subject: 'Вам необходимо обновить документы на сайте ГВСУ-Центра.',
                    html: html
                }
                me.src.mailTransport.sendMail(mess, function() {
                    cb()    
                })
            }
        ].runEach()
    }
    
});