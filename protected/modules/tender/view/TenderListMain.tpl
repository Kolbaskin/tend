<tpl if="tenders.length">
    <h2>Открытые тендеры</h2>
    <table class="tndr_table">
    <tr>
        <th>№</th>
    	<th>Название</th>
    	<th>Категория</th>
    	<th>Вид работ</th>
    	<th>Дата&nbsp;окончания<br>приема заявок</th>
    	<th>Объект</th>
    </tr>
    
    <tpl for="tenders">
        <tr>
        	<td><a href="/tenders/{pid}.html">{pid}</a></td>
        	<td>{name}</td>
        	<td><a href="#">{cat_name}</a></td>
        	<td><a href="#">{work_name}</a></td>
        	<td>{date_doc}</td>
        	<td>{object}</td>
        </tr>
    </tpl>
    </table>
</tpl>

<tpl if="winners.length">
    <h2>Победители прошедших тендеров</h2>
    <table class="tndr_table">
    <tr>
    	<th>№</th>
    	<th>Название</th>
    	<th>Категория</th>
    	<th>Вид работ</th>
    	<th>Объект</th>
    	<th>Победитель</th>
    </tr>
    
    <tpl for="winners">
        <tr>
        	<td><a href="/tenders/{_id}.html">{_id}</a></td>
        	<td>{name}</td>
        	<td><a href="#">{cat_name}</a></td>
        	<td><a href="#">{work_name}</a></td>
        	<td>{object_name}</td>
        	<td>{winner}</td>
        </tr>
    </tpl>
    </table>
</tpl>