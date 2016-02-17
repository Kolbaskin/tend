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

$(document).ready(function() {
    
    var loadMask = $("#loader-mask")
    
    $("#docUploadForm").submit(function() {
        loadMask.css("top", document.body.scrollTop + 'px')
        loadMask.css("display", "block")
        var file = $("[name=file]")[0];
        if(file && file.files && file.files[0] && file.files[0].size >0 && file.files[0].size < __MaxFileSize__) {
            
        } else {
            alert('Выберите файл документа!');
            loadMask.css("display", "none")
            return false;
        }
    })
    
    $("[name=file]").change(function() {
        if(this.files && this.files[0] && this.files[0].size > __MaxFileSize__) {
            alert('Размер файла превышает максимально допустимый ('+Math.round(__MaxFileSize__ / 1024 / 1024)+'Мб)')
            this.value = '';
        }
    })    
})