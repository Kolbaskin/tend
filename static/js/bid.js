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
        date_start: ko.observable('').extend({ required: {message: mess.req}})
        ,date_fin: ko.observable('').extend({ required: {message: mess.req}})
        ,price_pos: ko.observable('')
        ,price_full: ko.observable('')
        ,conditions_advance: ko.observable('')
        ,max_contract_val: ko.observable('').extend({ required: {message: mess.req}})
        ,notes: ko.observable('').extend({ required: {message: mess.req}})
        ,file_descript: ko.observable('').extend({ required: {message: mess.req}})
    }
};

viewModel.tenderIsActive = ko.observable(true)
viewModel.finTimePhrase = ko.observable()
viewModel.finTime = ko.observable()

viewModel.errors = ko.validation.group(viewModel.v);


viewModel.submit = function (form) {

    if (viewModel.errors().length == 0) {
        form.submit()
    } else {
        alert('Проверьте правильность веденных данных.');
        viewModel.errors.showAllMessages();
    }
}

addEventListener('load', function () {
    $( "[name=date_start]" ).datepicker({ dateFormat: "yy-mm-dd"});
    $( "[name=date_fin]" ).datepicker({ dateFormat: "yy-mm-dd"});
    ko.applyBindings(viewModel);
});

finalCountDown = function() {
    setTimeout(function() {
        viewModel.tenderLeftTime--;
        if(viewModel.tenderLeftTime>0) {
            var h = parseInt(viewModel.tenderLeftTime / 3600)
                ,m = parseInt((viewModel.tenderLeftTime - h*3600)/60)
                ,s = viewModel.tenderLeftTime - h*3600 - m*60;
            if(h<10) h = '0' + h
            if(m<10) m = '0' + m
            if(s<10) s = '0' + s
            viewModel.finTimePhrase('До завершения торга осталось:')
            viewModel.finTime(h + ':' + m + ':' + s)
            viewModel.tenderIsActive(true)
            viewModel.finish = false
        } else {
            viewModel.finTimePhrase('Торг завершен.')
            viewModel.finTime('')
            viewModel.tenderIsActive(false)
            viewModel.finish = true
        }
        if(!!window.recalcSumm) window.recalcSumm(false)
        finalCountDown()
    }, 1000)
}

finalCountDown()
