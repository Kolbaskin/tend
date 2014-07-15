<form method="post" enctype='multipart/form-data'>

Выберите тип документа:<br>
<select name="type" data-bind="options: docs, optionsText: 'name', optionsValue: '_id', value: type"></select>
<br/>
<input placeholder="Название документа" name="name" data-bind="value: docName" />
<br/>
<input type="file" name="file" />
<br/>
<button type="submit">Отправить</button>
</form>

{{include 'docs.inc'}}
