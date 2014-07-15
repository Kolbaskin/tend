<h2>Список документов</h2>

<table border="1">
<tr>
    <th>Документ</th>
    <th>Дата загрузки</th>
    <th>Дата завершения</th>
    <th>Осталось дней</th>
    <th>Статус</th>
    <th>Загрузить</th>
</tr>    

<tpl for="list">
    <tr>
        <td>{name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><a href="./{_id}">Загрузить</a></td>
    </tr>
</tpl>

</table>
