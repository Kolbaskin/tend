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

ko.validation.rules['isValidPassword'] = {
    validator: function (val, len) {
        return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(val) && val.length>=len)
    },
    message: 'Пароль должен содержать буквы в верхнем и нижнем регистре и цифры. Длина пароля не менее {0} символов.'
};
ko.validation.registerExtenders();

var viewModel = {
    v:{
        login: ko.observable('').extend({ required: {message: mess.req}})
        ,email: ko.observable('').extend({ required: {message: mess.req}})
        ,password: ko.observable('').extend({ required: {message: mess.req}}).extend({isValidPassword: 6})
        ,fname: ko.observable('').extend({ required: {message: mess.req}})
        ,name: ko.observable('').extend({ required: {message: mess.req}})
        ,sname: ko.observable('').extend({ required: {message: mess.req}})
        ,phone: ko.observable('').extend({ required: {message: mess.req}})
        ,mobile: ko.observable('').extend({ required: {message: mess.req}})
        ,position: ko.observable('').extend({ required: {message: mess.req}})
        ,company: ko.observable('').extend({ required: {message: mess.req}})
    }
};

viewModel.p = {
    password: ko.observable('').extend({ required: {message: mess.req}}).extend({isValidPassword: 6}),  
    old_password: ko.observable('').extend({ required: {message: mess.req}})
}

viewModel.p.password_confirm = ko.observable().extend({
    validation: { validator: mustEqual, message: 'Пароли не совпадают.', params: viewModel.p.password }
})

viewModel.password_confirm = ko.observable().extend({
    validation: { validator: mustEqual, message: 'Пароли не совпадают.', params: viewModel.v.password }
})

viewModel.errors = ko.validation.group(viewModel.v);
viewModel.errors_pass = ko.validation.group(viewModel.p);

viewModel.submit = function () {
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
                var mess = []
                if(data.response.login == 'dbl') {
                    mess.push('Пользователь с таким логином уже зарегистрирован.')    
                } 
                if(data.response.email == 'dbl') {
                    mess.push('Пользователь с таким e-mail уже зарегистрирован.')    
                }
                if(data.response.company == 'dbl') {
                    mess.push('Компания с таким названием уже зарегистрирована в системе.')    
                }
                alert(mess.join('\n'))
                viewModel.errors.showAllMessages();
            } else {
                alert('Регистрация завершена успешно!\nДля входя в личный кабинет, введите логин и пароль.') 
                location = '/login/'
                
            }
        }, 'JSON')
    } else {
        alert('Проверьте правильность веденных данных.');
        viewModel.errors.showAllMessages();
    }
}
    
viewModel.submit_password = function () {
    if (viewModel.errors_pass().length == 0) {
        
        $.post('/Gvsu.modules.users.controller.User.changePassword/', {
            oldPassword: viewModel.p.old_password(),
            newPassword: viewModel.p.password()
        }, function(data) {
            if(data && data.response) {
                alert('Старый пароль введен не правильно!')    
            } else {
                alert('Пароль изменен!')    
            }
        }, 'JSON')
    } else {
        alert('Проверьте правильность веденных данных.');
        viewModel.errors.showAllMessages();
    }
}

addEventListener('load', function () {
    ko.applyBindings(viewModel);
});
