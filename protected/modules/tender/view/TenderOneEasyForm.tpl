{{include 'TenderInfo.tpl'}}

<div class="tndr_form bid_form">
<form method="post"  method="post" data-bind="submit: submit" enctype='multipart/form-data'>
    <ul class="inlined">
		<li class="form_text">Дата начала работ</li><li class="form240"><div class="input_wrap"><input type="text" name="date_start" data-bind="value: v.date_start"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Дата окончания работ</li><li class="form240"><div class="input_wrap"><input type="text" name="date_fin" data-bind="value: v.date_fin"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Предлагаемая цена <br>за единицу</li><li class="form240"><div class="input_wrap"><input type="text" name="price_pos" data-bind="value: v.price_pos"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Предлагаемая <br>полная цена</li><li class="form240"><div class="input_wrap"><input type="text" name="price_full" data-bind="value: v.price_full"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>
        
        <tpl if="avance_comp">
    		<li class="form_text">Условие аванса</li><li class="form240"><div class="input_wrap"><input type="text" name="conditions_advance" data-bind="value: v.conditions_advance"></div></li>
    		<li class="form_alert" style="display: none;">Обязательное поле</li><br>
        </tpl>

		<li class="form_text two_lines">Максимальная стоимость договора, указанная в СРО</li><li class="form240"><div class="input_wrap"><input type="text" name="max_contract_val" data-bind="value: v.max_contract_val"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Примечание</li><li class="form240"><div class="input_wrap"><textarea name="notes" data-bind="value: v.notes"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Скан заявки на тендер <br>по типовой форме</li><li class="form240"><div class="input_wrap file_wrap"><input type="file" name="file"><div class="file_dummy">Выберите файл...</div></div></li><br>
        
        <li class="form_text two_lines">Предложение </li><li class="form240"><div class="input_wrap file_wrap"><input type="file" name="file1"><div class="file_dummy">Выберите файл...</div></div></li><br>
        
		<li class="form_text">Описание файла</li><li class="form240"><div class="input_wrap"><textarea name="file_descript" data-bind="value: v.file_descript"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>
    
    </ul>
    <h2>Предлагаемые цены по позициям тендера</h2>
    <ul class="inlined bid_price">
		<li class="form18">1.</li>
		<li class="form136">Длинное название позиции этого тендера,<br>ед. изм., количество</li>
		<li class="form108"><span>за единицу</span><div class="input_wrap"><input type="text"></div></li>
		<li class="form108"><span>полная цена</span><div class="input_wrap"><input type="text"></div></li>

		<br>
		<li class="form18"></li>
		<li class="form136 gray_text">Организация 1</li>
		<li class="form108 gray_text">12343.00</li>
		<li class="form108 gray_text">12343.00</li>

		<br>
		<li class="form18"></li>
		<li class="form136 gray_text">Организация 2</li>
		<li class="form108 gray_text">12343.00</li>
		<li class="form108 gray_text">12343.00</li>

		<br>
		<li class="form18"></li>
		<li class="form136 gray_text">Организация 3</li>
		<li class="form108 gray_text">12343.00</li>
		<li class="form108 gray_text">12343.00</li>

		<br>
		<li class="form18"></li>
		<li class="form136 gray_text">Организация 4</li>
		<li class="form108 gray_text">12343.00</li>
		<li class="form108 gray_text">12343.00</li>

	</ul>
    <ul class="inlined"><li class="form_text">&nbsp;</li><br>
    
    
		<li class="form_text"></li><li class="form120"><button type="submit"><span class="tndr_btn">подать заявку</span></button></li>
	</ul>
</form>
</div>




<!-- Data Model -->
<script src="/js/ko.validate.js"></script>
<script src="/js/bid.js"></script>
<script>
viewModel.v.date_start(decodeURIComponent('{bid.date_start}'))
viewModel.v.date_fin(decodeURIComponent('{bid.date_fin}'))
viewModel.v.price_pos(decodeURIComponent('{bid.price_pos}'))
viewModel.v.price_full(decodeURIComponent('{bid.price_full}'))
viewModel.v.conditions_advance(decodeURIComponent('{bid.conditions_advance}'))
viewModel.v.max_contract_val(decodeURIComponent('{bid.max_contract_val}'))
viewModel.v.notes(decodeURIComponent('{bid.notes}'))
viewModel.v.file_descript(decodeURIComponent('{bid.file_descript}'))
</script>