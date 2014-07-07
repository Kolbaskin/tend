$(document).ready(function() {
    
    var l = localStorage.getItem('locale');
    if(l) {
        l = $('[value=' + l + ']')
        if(l) l.attr('selected', true)
    }

    var success = function(data) {
        if(data.status == 'blocked') {
            alert('Аккаунт не активирован! Для активации аккаунта перейдите по ссылке в письме.')
        } else {
            $.cookie('uid', data.id, {path: '/'});
            $.cookie('token', data.token, {path: '/'});
            location = "/cabinet/"
        }
    }

    var step2 = function(data) {
         
         var p = $("#sesspass").val();
         
         if(p!=null && p!='') {
            $.post("/Admin.User.loginStepTwo/", {
                token: data.token,
                id: data.id,
                pass: p
            }, function(r) {
                if(r && r.response) {
                    success(r.response);    
                } else {
                    alert('Session password error!');    
                }
            }, 'JSON');
        }  
    }

    $("#submit").click(function() {
        var l = $("#login").val(),
            p = $("#pass").val();
            
        if(l!='' && p!='') {    
            $.post("/Gvsu.modules.orgs.controller.Orgs.login/", {
                login: l,
                pass: p
            }, function(r) {
                if(r && r.response) {
                    if(r.response && r.response.dblauth) {
                        $("#step1").css("display","none")
                        $("#step2").css("display","block")
                        $("#submit2").click(function() {
                            step2(r.response);    
                        });                         
                    } else {
                        success(r.response);
                    }
                } else {
                    $("#login").val('');
                    $("#pass").val('');
                    $("#error").css('display', '');
                }
            }, 'json'); 
        }
        return false;
    });
    
});