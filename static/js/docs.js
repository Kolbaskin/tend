var viewModel = {
    docs: ko.observableArray(),
    type: ko.observable()
}

viewModel.docName = ko.computed(function() {
    var t = viewModel.type(),
        arr = viewModel.docs()
    for(var i = 0;i<arr.length;i++) {
        if(t == arr[i]._id) return arr[i].name  
    }
    return '';
}, viewModel)

addEventListener('load', function () {
    ko.applyBindings(viewModel);
});