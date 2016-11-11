{{include 'TenderInfo.tpl'}}

<tpl if="allowed">
    <form method="post">
    <ul class="inlined simple_form">
    	<li><label><input type="checkbox" name="accept"> с <a href="/help/conditions/">правилами проведения тендера и порядком участия в тендере</a> согласен</label></li>
    	<li><button type="submit"><span class="tndr_btn">создать заявку на тендер</span></button></li>
    </ul>
    </form>
</tpl>
