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
                        }, function() {
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
                    //console.log('Tender ', data.name, ' sent to ',data.users[i].email)
                    var mess = {
                        from: me.config.messages.activateMailFrom,
                        to: data.users[i].email,
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
    
});