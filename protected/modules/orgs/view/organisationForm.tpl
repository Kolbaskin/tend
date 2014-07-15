<script src="/js/ko.validate.js"></script>

<h2>Организация</h2>

<p style="color: red">Внимание! При изменении атрибутов компании происходит автоматическая блокировка доступа к торгам. Доступ будет возобновлен после одобрения Службы безопасности.</p>

<form method="post" data-bind="submit: submit">

<input placeholder="Краткое название" data-bind="value: v.name" /><br>
<input placeholder="Полное название"  data-bind="value: v.fullname" /><br>

<textarea placeholder="Руководители, ФИО"  data-bind="value: v.headers" /></textarea><br>
<textarea placeholder="Учредители, ФИО"  data-bind="value: v.founders" /></textarea><br>

<input placeholder="ИНН"  data-bind="value: v.inn" /><br>
<input placeholder="КПП"  data-bind="value: v.kpp" /><br>
<input placeholder="ОГРН"  data-bind="value: v.ogrn" /><br>
<input placeholder="Юридический адрес"  data-bind="value: v.legal_address" /><br>
<input placeholder="Фактический адрес"  data-bind="value: v.fact_address" /><br>
<input placeholder="Адрес сайта"  data-bind="value: v.www" /><br>
<input placeholder="Телефоны руководителей"  data-bind="value: v.headers_phones" /><br>

<input placeholder="Контактное лицо"  data-bind="value: v.contact_person" /><br>
<input placeholder="Контактный телефон"  data-bind="value: v.phone" /><br>
<input placeholder="Электронная почта"  data-bind="value: v.email" /><br>
<input placeholder="Предельная стоимость договора СРО (в рублях)"  data-bind="value: v.sro" /><br>
<textarea placeholder="Как узнали о торговой площадке?"  data-bind="value: v.info" ></textarea><br>

<button type="submit">Отправить</button>
</form>

<!-- Data Model -->
{{include "orgdata.inc"}}