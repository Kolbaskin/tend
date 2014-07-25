<h2>Список документов</h2>

<table border="1">
<tr>
    <th>Документ</th>
    <th>Дата загрузки</th>
    <th>Дата завершения</th>
    <th>Осталось дней</th>
    <th>Требуется для участия в торгах</th>
    <th>Статус</th>
    <th>Загрузить</th>
</tr>    

<tpl for="list">
    <tr>
        <td>{doc_name}</td>
        <td>{date_add}</td>
        <td>
            <tpl if="date_fin">{date_fin}</tpl>
            <tpl if="!date_fin && date_add">бессрочный</tpl>
        </td>
        <td>{days}</td>
        <td><tpl if="required">Требуется</tpl></td>
        <td>
            <tpl if="status==0">ожидает модерацию</tpl>
            <tpl if="status==1">на модерации</tpl>
            <tpl if="status==2">одобрен</tpl>
            <tpl if="status==3">отклонен</tpl>
            <tpl if="status==-1">не загружен</tpl>
        </td>
        <td><a href="./{doc_type}">Загрузить</a></td>
    </tr>
</tpl>

</table>
