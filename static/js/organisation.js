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

var patterns = {
    str: {pattern: /^[a-zа-яА-ЯёЁ0-9\s\'\"\.\,\-\+\(\)]{0,}$/i},
    num: {pattern: /^[0-9]{0,}$/i},
    email: {pattern: /@/},
    www: {pattern: /\./},
    phone: {pattern: /^[\+0-9]{10,}$/}
}

var viewModel = {
    v:{
        name: ko.observable('').extend(patterns.str)
        ,fullname: ko.observable('').extend(patterns.str)
        ,headers: ko.observable('').extend(patterns.str)
        ,founders: ko.observable('').extend(patterns.str)
        ,inn: ko.observable('').extend(patterns.num)
        ,kpp: ko.observable('').extend(patterns.num)
        ,ogrn: ko.observable('').extend(patterns.num)
        ,legal_address: ko.observable('').extend(patterns.str)
        ,fact_address: ko.observable('') //.extend(patterns.str)
        ,www: ko.observable('') //.extend(patterns.www)
        
        ,contact_person: ko.observable('').extend(patterns.str)
        ,headers_phones: ko.observable('').extend(patterns.str)//phone)
        ,phone: ko.observable('').extend(patterns.str)//phone)
        ,email: ko.observable('').extend(patterns.email)
        ,sro: ko.observable('')//.extend(patterns.num)
        ,info: ko.observable('')//.extend(patterns.str)
    }
};

viewModel.errors = ko.validation.group(viewModel.v);

viewModel.nextmark = function() {
    viewModel.submit(true)
}

viewModel.submit = function (goNext) {
    
    if(!confirm('Внимание!\n\nПри любых изменениях данных доступ к торгам автоматически блокируется!\nДоступ востанавливается после одобрения службы безопасности.\n\nПродолжить?')) return false;
    
    if (viewModel.errors().length == 0) {
        var out = {}
        for(var i in viewModel.v) {
            out[i] = viewModel.v[i]()    
        }
        
        $.post('/Gvsu.modules.orgs.controller.Orgs.saveInfo/', out, function(data) {
            if(data && data.response) {
                for(var i in data.response) {
                    if(!!viewModel.v[i]) {
                        viewModel.v[i]('')    
                    }
                }
                if(data.response.name == 'dbl') {
                    alert('Организация с такими данными уже зарегистрирована в системе. Обратитесь к администрации.')    
                }
                viewModel.errors.showAllMessages();
            } else {                 
                if(goNext) {
                    location = '/cabinet/documents/'    
                } else
                    alert('Информация сохранена!')
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
