<div class="tndr_form">
<h2>Изменение персональных данных</h2>
<form method="post" data-bind="submit: submit">
	<ul class="inlined">
		<li class="form_text">Логин</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.login"></div></li><br>
		<li class="form_text">E-mail</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.email"></div></li><br>
		<li class="form_text">Фамилия</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.fname"></div></li><br>
		<li class="form_text">Имя</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.name"></div></li><br>
		<li class="form_text">Отчество</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.sname"></div></li><br>
		<li class="form_text">Рабочий телефон</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.phone"></div></li><br>
		<li class="form_text">Мобильный телефон</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.mobile"></div></li><br>
		<li class="form_text">Должность</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.position"></div></li><br>
		<li class="form_text">Название компании</li><li class="form270"><div class="input_wrap"><input type="text" data-bind="value: v.company"></div></li><br>
		<li class="form_text"></li><li><button type="submit"><span class="tndr_btn">изменить персональные данные</span></button></li>
	</ul>
</form>
<br>
<h2>Изменение пароля</h2>
<form method="post" data-bind="submit: submit_password">
	<ul class="inlined">
		<li class="form_text">Старый пароль</li><li class="form270"><div class="input_wrap"><input type="password" data-bind="value: p.old_password"></div></li><br>
		<li class="form_text">Новый пароль</li><li class="form270"><div class="input_wrap"><input type="password" data-bind="value: p.password"></div></li><br>
		<li class="form_text two_lines">Подтверждение пароля</li><li class="form270"><div class="input_wrap"><input type="password" data-bind="value: p.password_confirm"></div></li><br>
		<li class="form_text"></li><li><button type="submit"><span class="tndr_btn">изменить пароль</span></button></li>
	</ul>
</form>
</div>

<!-- Data Model -->
{{include "userdata.inc"}}


