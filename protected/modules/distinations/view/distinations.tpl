<h2>Категории и виды работ</h2>

<p>Внимание! При сохранении изменений настроек на этой странице, доступ к участию в торгах будет автоматически заблокирован до момента одобрения изменений администрацией торговой площадки.</p>

<form method="post">
<table class="tndr_table">
<tr>
	<th>Выбор</th>
	<th width="100%">Название категории / вида работ</th>
	<th>Статус</th>
	<th></th>
</tr>
<tpl for="items">
    <tr>
        <td><input type="checkbox" id="categ_group1"></td>
        <td class="tndr_table_subhead"><label for="categ_group1">{name}</label></td>
        <td></td>
        <td></td>
    </tr>
    <tpl for="works">
        <tr>
            <td><input type="checkbox" id="works{_id}" name="works" value="{_id}" <tpl if="checked">checked</tpl>></td>
            <td><label for="works{_id}">{name}</label></td>
            <td>
                <tpl if="status==1">не&nbsp;проверено</tpl>
                <tpl if="status==2">одобрено</tpl>
                <tpl if="status==3">ошибка</tpl>
            </td>
            <td>
                <tpl if="notes">{notes}</tpl>
            </td>
        </tr>
    </tpl>
</tpl>
<tr class="tndr_table_subhead">
	<td class="tndr_table_subhead" colspan="4"><button type="submit"><span class="tndr_btn">Cохранить</span></button></td>
</tr>
</table>
<input type="hidden" name="works" value='' />
</form>

