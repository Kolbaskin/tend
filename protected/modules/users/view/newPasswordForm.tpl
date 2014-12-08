<div class="tndr_form login_form">
<h2>Восстановление пароля</h2>

<tpl if="!success">
    <form method="post">
        <ul class="inlined">
        	<li class="form_text">Новый пароль</li><li class="form180"><div class="input_wrap"><input name="pass" type="password" value="" /></div></li><br>
    		<li class="form_text">Повторить</li><li class="form180"><div class="input_wrap"><input type="password" name="pass1" value="" /></div></li><br>
            
            <input name="code" type="hidden" value="{code}">
            <input name="_id" type="hidden" value="{_id}">        
            
    		<li class="form_text"></li><li class="form120"><button type="submit" id="submit"><span class="tndr_btn">Сохранить</span></button></li>
    	</ul>
    </form>
</tpl>

<tpl if="success">
    <p>Новый пароль сохранен!</p>
    <p><a href="/">Перейти на форму авторизации</a></p>
</tpl>
    
</div>