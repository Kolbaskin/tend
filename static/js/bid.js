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
        ,price_pos: ko.observable('').extend({ required: {message: mess.req}})
        ,price_full: ko.observable('').extend({ required: {message: mess.req}})
        //,conditions_advance: ko.observable('').extend({ required: {message: mess.req}})
        ,max_contract_val: ko.observable('').extend({ required: {message: mess.req}})
        ,notes: ko.observable('').extend({ required: {message: mess.req}})
        ,file_descript: ko.observable('').extend({ required: {message: mess.req}})
    }
};


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
