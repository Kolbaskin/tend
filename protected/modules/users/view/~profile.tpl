<h2>Изменение личных данных</h2>

<form method="post" data-bind="submit: submit">
<input placeholder="Логин" data-bind="value: v.login" /><br>
<input placeholder="E-mail"  data-bind="value: v.email" /><br>
<input placeholder="Фамилия"  data-bind="value: v.fname" /><br>
<input placeholder="Имя"  data-bind="value: v.name" /><br>
<input placeholder="Отчество"  data-bind="value: v.sname" /><br>
<input placeholder="Телефон"  data-bind="value: v.phone" /><br>
<input placeholder="Мобильный телефон"  data-bind="value: v.mobile" /><br>
<input placeholder="Должность"  data-bind="value: v.position" /><br>
<input placeholder="Компания"  data-bind="value: v.company" /><br>
<button type="submit">Сохранить</button>
</form>

<h2>Изменение пароля</h2>

<form method="post" data-bind="submit: submit_password">
<input type="password" placeholder="Старый пароль"  data-bind="value: p.old_password" /><br>
<input type="password" placeholder="Новый пароль"  data-bind="value: p.password" /><br>
<input type="password" placeholder="Подтверждение пароля"  data-bind="value: p.password_confirm" /><br>
<button type="submit">Сохранить</button>
</form>

<!-- Data Model -->
{{include "userdata.inc"}}


