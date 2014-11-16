<h2>{name}</h2>

<tpl if="saved">
    <p class="green">Заявка отправлена!</p>
</tpl>

<table class="tndr_table">
<tr>
    <td width="114">Номер тендера</td>
    <td>{_id}</td>
</tr>
<tr>
	<td width="114">Название тендера</td>
	<td>{name}</td>
</tr>
<tr>
	<td width="114">Категория тендера</td>
	<td><tpl for="dists">{.}<br></tpl></td>
</tr>
<tr>
	<td width="114">Вид работ по тендеру</td>
	<td><tpl for="works">{.}<br></tpl></td>
</tr>
<tr>
	<td width="114">Статус тендера</td>
	<td>
        <tpl if="status==1">открытый</tpl>
        <tpl if="status==2">закрытый</tpl>
    </td>
</tr>
<tr>
	<td width="114">Объект</td>
	<td>{objects}</td>
</tr>
<tr>
	<td width="114">Дата окончания приема заявок</td>
	<td>{date_doc}</td>
</tr>
<tpl if="start_price">
    <tr>
        <td width="114">Стартовая цена</td>
    	<td>{start_price}</td>
    </tr>
</tpl>  

<tpl if="descript">
    <tr>
        <td width="114">Описание</td>
        <td>{descript}</td>
    </tr>
</tpl>  

<tpl if="file">
    <tr>
        <td width="114">Тендерная документация</td>
        <td><a href="/Admin.Data.getFile/?name={file.name}&file={file.file}">{file.name}</a></td>
    </tr>
</tpl> 

<tpl if="filelink">
    <tr>
        <td width="114">Тендерная документация</td>
        <td><a href="{filelink}">скачать</a></td>
    </tr>
</tpl>  
</table>
