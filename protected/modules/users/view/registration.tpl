<h2>Регистрация</h2>

<div class="tndr_form">
<form method="post" data-bind="submit: submit">
	<ul class="inlined">
		<li class="form_text">Логин</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.login" /></div></li>
		<li class="form_alert" style="display: none;">Такой логин уже занят</li><br>

		<li class="form_text">E-mail</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.email" /></div></li>
		<li class="form_alert" style="display: none;">Неправильный почтовый адрес</li><br>

		<li class="form_text">Пароль</li><li class="form270"><div class="input_wrap"><input type="password" data-bind="value: v.password" /></div></li>
		<li class="form_alert" style="display: none;">Пароль должен содержать не менее 6 символов</li><br>

		<li class="form_text two_lines">Подтверждение пароля</li><li class="form270"><div class="input_wrap"><input type="password" data-bind="value: password_confirm" /></div></li>
		<li class="form_alert" style="display: none;">Пароли не совпадают</li><br>

		<li class="form_text">Фамилия</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.fname" /></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Имя</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.name" /></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Отчество</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.sname" /></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Рабочий телефон</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.phone" /></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Мобильный телефон</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.mobile" /></div></li>
		<li class="form_alert"></li><br>

		<li class="form_text">Должность</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.position" /></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Название компании</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.company" /></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>

		<li class="form_text">Введите символы с картинки</li><li class="form120"><img src="http://lorempixel.com/120/60/abstract"></li><li class="form132"><div class="input_wrap"><input type="text"></div></li>
		<li class="form_alert" style="display: none;">Обязательное поле</li><br>
		<li class="form_text"></li><li class="form120"><button type="submit"><span class="tndr_btn">регистрация</span></button></li>
	</ul>
</form>
</div>

<!-- Data Model -->
<script src="/js/ko.validate.js"></script>
<script src="/js/registration.js"></script>
