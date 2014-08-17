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

//var mustEqual = function (val, other) {
//    return val == other;
//};


//ko.validation.registerExtenders();

var viewModel = {
    v:{
        date_start: ko.observable('').extend({ required: {message: mess.req+'1'}})
        ,date_fin: ko.observable('').extend({ required: {message: mess.req+'2'}})
        ,price_pos: ko.observable('').extend({ required: {message: mess.req+'3'}})
        ,price_full: ko.observable('').extend({ required: {message: mess.req+'4'}})
        ,conditions_advance: ko.observable('').extend({ required: {message: mess.req+'5'}})
        ,max_contract_val: ko.observable('').extend({ required: {message: mess.req+'6'}})
        ,notes: ko.observable('').extend({ required: {message: mess.req+'7'}})
        ,file_descript: ko.observable('').extend({ required: {message: mess.req+'8'}})
    }
};


viewModel.errors = ko.validation.group(viewModel.v);


viewModel.submit = function () {

console.log('viewModel.errors():', viewModel.errors())

    if (viewModel.errors().length == 0) {
        var out = {}
        for(var i in viewModel.v) {
            out[i] = viewModel.v[i]()    
        }
        
        alert('Send')
        
        /*
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
        */
    } else {
        alert('Проверьте правильность веденных данных.');
        viewModel.errors.showAllMessages();
    }
}


addEventListener('load', function () {
    ko.applyBindings(viewModel);
});
