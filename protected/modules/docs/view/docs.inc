<script src="/js/ko.js"></script>
<script src="/js/docs.js"></script>
<script>
    __MaxFileSize__ = {[values.maxSize? values.maxSize : 26214400]};
    <tpl for="list">
    viewModel.docs.push({['{']} _id: '{_id}', name: '{name}' {['}']})
    </tpl>
viewModel.type('{type}');
</script>