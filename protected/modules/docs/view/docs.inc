<script src="/js/ko.js"></script>
<script src="/js/docs.js"></script>
<script>
    <tpl for="list">
    viewModel.docs.push({['{']} _id: '{_id}', name: '{name}' {['}']})
    </tpl>
viewModel.type('{type}');
</script>