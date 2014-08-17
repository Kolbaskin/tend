{{include 'TenderInfo.tpl'}}

<div class="tndr_form bid_form">
<form method="post"  method="post" enctype='multipart/form-data'>
    <ul class="inlined">
		<li class="form_text">Дата начала работ</li><li class="form240"><div class="input_wrap"><input type="text" name="date_start" data-bind="value: v.date_start"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Дата окончания работ</li><li class="form240"><div class="input_wrap"><input type="text" name="date_fin" data-bind="value: v.date_fin"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Предлагаемая цена <br>за единицу</li><li class="form240"><div class="input_wrap"><input type="text" name="price_pos" data-bind="value: v.price_pos"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Предлагаемая <br>полная цена</li><li class="form240"><div class="input_wrap"><input type="text" name="price_full" data-bind="value: v.price_full"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Условие аванса</li><li class="form240"><div class="input_wrap"><input type="text" name="conditions_advance" data-bind="value: v.conditions_advance"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Максимальная стоимость договора, указанная в СРО</li><li class="form240"><div class="input_wrap"><input type="text" name="max_contract_val" data-bind="value: v.max_contract_val"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Примечание</li><li class="form240"><div class="input_wrap"><textarea name="notes" data-bind="value: v.notes"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Скан заявки на тендер <br>по типовой форме</li><li class="form240"><div class="input_wrap file_wrap"><input type="file" name="file"><div class="file_dummy">Выберите файл...</div></div></li><br>
        
		<li class="form_text">Описание файла</li><li class="form240"><div class="input_wrap"><textarea name="file_descript" data-bind="value: v.file_descript"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text"></li><li class="form120"><button type="submit"><span class="tndr_btn">подать заявку</span></button></li>
	</ul>
</form>
</div>

<!-- Data Model -->
<script src="/js/ko.validate.js"></script>
<script src="/js/bid.js"></script>