API_URL = '/Gvsu.modules.users.controller.User.registration/'

var mess = {
    req: 'Обязательное поле'    
}


ko.validation.rules.pattern.message = 'Invalid.';
ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
});

var mustEqual = function (val, other) {
    return val == other;
};

var viewModel = {
    v:{
        login: ko.observable('').extend({ required: {message: mess.req}})
        ,email: ko.observable('').extend({ required: {message: mess.req}})
        ,password: ko.observable('').extend({ required: {message: mess.req}})
        ,fname: ko.observable('').extend({ required: {message: mess.req}})
        ,name: ko.observable('').extend({ required: {message: mess.req}})
        ,sname: ko.observable('').extend({ required: {message: mess.req}})
        ,phone: ko.observable('').extend({ required: {message: mess.req}})
        ,mobile: ko.observable('').extend({ required: {message: mess.req}})
        ,position: ko.observable('').extend({ required: {message: mess.req}})
        ,company: ko.observable('').extend({ required: {message: mess.req}})
    }
    ,submit: function () {
        if (viewModel.errors().length == 0) {
            var out = {}
            for(var i in viewModel.v) {
                out[i] = viewModel.v[i]()    
            }
            
            $.post(API_URL, out, function(data) {
                if(data && data.response) {
                    for(var i in data.response) {
                        if(!!viewModel.v[i]) {
                            viewModel.v[i]('')    
                        }
                    }
                    if(data.response.login == 'dbl') {
                        alert('Пользователь с таким логином уже зарегистрирован. Выберите другой.')    
                    }
                    viewModel.errors.showAllMessages();
                } else {
                    alert('Регистрация завершена успешно!')    
                }
            }, 'JSON')
        } else {
            alert('Проверьте правильность веденных данных.');
            viewModel.errors.showAllMessages();
        }
    }
};


viewModel.password_confirm = ko.observable().extend({
    validation: { validator: mustEqual, message: 'Пароли не совпадают.', params: viewModel.v.password }
})
viewModel.errors = ko.validation.group(viewModel.v);

addEventListener('load', function () {
    ko.applyBindings(viewModel);
});
