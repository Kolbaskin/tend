<script src="/js/ko.validate.js"></script>

<p>Внимание! При изменении атрибутов компании происходит автоматическая блокировка доступа к торгам. Доступ будет возобновлен после одобрения Службы безопасности.</p>

<div class="tndr_form org_form">
<h2>Изменение информации об организации</h2>
<form method="post" data-bind="submit: submit">
	<ul class="inlined">
		<li class="form_text">Краткое название</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.name"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Полное название</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.fullname"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Руководители</li><li class="form270"><div class="input_wrap"><textarea data-bind="value: v.headers"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Учредители</li><li class="form270"><div class="input_wrap"><textarea data-bind="value: v.founders"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">ИНН</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.inn"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">КПП</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.kpp"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">ОГРН</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.ogrn"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Юридический адрес</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.legal_address"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Фактический адрес</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.fact_address"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Адрес сайта</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.www"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Контактные телефоны руководителей</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.headers_phones"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Контактное лицо</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.contact_person"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Телефон для связи</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.phone"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Адрес <br>электронной почты</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.email"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text two_lines">Предельная стоимость договора СРО</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.sro"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Как узнали об электронной площадке</li><li class="form270"><div class="input_wrap"><textarea data-bind="value: v.info"></textarea></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text"></li><li><button type="submit"><span class="tndr_btn">изменить информацию об организации</span></button></li>
	</ul>
</form>
</div>

<!-- Data Model -->
{{include "orgdata.inc"}}