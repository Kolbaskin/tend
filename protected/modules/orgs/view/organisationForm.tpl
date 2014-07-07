<script src="/js/ko.validate.js"></script>

<h2>Организация</h2>

<form method="post" data-bind="submit: submit">
<input placeholder="Логин" data-bind="value: v.login" /><br>
<input placeholder="E-mail"  data-bind="value: v.email" /><br>
<input type="password" placeholder="Пароль"  data-bind="value: v.password" /><br>
<input type="password" placeholder="Подтверждение пароля"  data-bind="value: password_confirm" /><br>
<input placeholder="Фамилия"  data-bind="value: v.fname" /><br>
<input placeholder="Имя"  data-bind="value: v.name" /><br>
<input placeholder="Отчество"  data-bind="value: v.sname" /><br>
<input placeholder="Телефон"  data-bind="value: v.phone" /><br>
<input placeholder="Мобильный телефон"  data-bind="value: v.mobile" /><br>
<input placeholder="Должность"  data-bind="value: v.position" /><br>
<input placeholder="Компания"  data-bind="value: v.company" /><br>
<button type="submit">Отправить</button>
</form>

<!-- Data Model -->
<script src="/js/registration.js"></script>