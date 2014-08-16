<table class="tndr_table">
<tr>
    <th>№</th>
    <th>Название документа</th>
    <th>Дата загрузки</th>
    <th>Дата завершения действия</th>
    <th>Дней до обновления</th>
    <th>Требуется для&nbsp;участия в&nbsp;торгах</th>
    <th>Статус</th>
    <th>Действия</th>
</tr>    

<tpl for="list">
    <tr>
        <td>{#}</td>
        <td>{doc_name}</td>
        <td>{date_add}</td>
        <td>
            <tpl if="date_fin">{date_fin}</tpl>
            <tpl if="!date_fin && date_add">бессрочный</tpl>
        </td>
        <td>{days}</td>
        <td><tpl if="required">требуется</tpl></td>
        <td>
            <tpl if="status==0">ожидает<br>модерацию</tpl>
            <tpl if="status==1">на&nbsp;модерации</tpl>
            <tpl if="status==2">одобрен</tpl>
            <tpl if="status==3">отклонен</tpl>
            <tpl if="status==-1">не&nbsp;загружен</tpl>
        </td>
        <td><a href="./{doc_type}" class="tndr_btn">Загрузить</a></td>
    </tr>
</tpl>
</table>