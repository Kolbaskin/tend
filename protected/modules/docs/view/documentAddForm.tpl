<div class="tndr_form org_form">
<h2>Загрузка документа</h2>
<form action="./" method="post" enctype='multipart/form-data'>
<ul class="inlined">
    <li class="form_text">Тип документа</li><li class="form270"><div class="input_wrap"><select name="type" data-bind="options: docs, optionsText: 'name', optionsValue: '_id', value: type"></select></div></li><br>
    <li class="form_text">Название документа</li><li class="form270"><div class="input_wrap"><input type="text" name="name" data-bind="value: docName" /></div></li><br>
    <li class="form_text"></li><li class="form270"><div class="input_wrap file_wrap"><input type="file" name="file" /><div class="file_dummy">Выберите файл...</div></li><br>
    <li class="form_text"></li><li><button type="submit"><span class="tndr_btn">загрузить документ</span></button></li>
</ul>
<p>
<b>Важно:</b> документ следует загружать одним файлом. Если документ состоит из нескольких отсканированных изображений, упакуйте их в один архивный файл (rar, zip, 7z) или вставьте в один файл doc или pdf. Один документ – не более 25Мб.
</p>
</form>
</div>
{{include 'docs.inc'}}
