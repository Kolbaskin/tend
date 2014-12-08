$(document).ready(function() {
    $("#submit").click(function() {
        var eml = $("#remail").val()
        $.post("/Gvsu.modules.users.controller.User.remind/", {remind: eml}, function(res) {
            if(res.response && res.response.success) {
                alert('На указанный e-mail отправлено письмо со ссылкой для востановления доступа.');    
            } else {
                alert('По указанному e-mail не найдено учетной записи. Зарегистрируйтесь.');
            }
        }, 'JSON')
        return false;
    })
})