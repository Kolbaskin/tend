<!-- Login form block -->


<!--<tpl if="success==true">
    <p>Ваш аккаунт активирован, можете авторизоваться на сайте:</p>
</tpl>
 
<form onsubmit="return false;">
    <table id="step1">
    
    <tr><td>Login</td><td class="input"><input id="login" value="tester" /></td></tr>
    <tr><td>Password</td><td class="input"><input type="password" id="pass" value="Aa222222" /></td></tr>
    <tr><td></td><td><button id="submit">Enter</button>&nbsp;&nbsp;&lt;!&ndash;<button onclick="location='registration.htm'">Registration</button>&ndash;&gt;</td></tr>
    
    <tr><td></td><td id="error" style="display:none">Error in login or password</td></tr>
    </table>
    
    <table id="step2" style="display:none">

    <tr><td>Session Password</td><td class="input"><input type="password" id="sesspass" /></td></tr>
    <tr><td></td><td><button id="submit2">Enter</button>&nbsp;&nbsp;</td></tr>
    
    <tr><td></td><td id="error" style="display:none">Error in session password</td></tr>
    </table>
</form>-->
<!-- / Login form block -->

<!-- Registration text block -->
<!--<h2>Регистрация</h2>
<p>Текст про регистрацию</p>

<ul>
    <li><a href="/help/conditions/">Условия участия</a></li>
    <li><a href="/help/info/">Справочная информация</a></li>
</ul>
<a href="/registration/">Регистрация</a>-->
<!-- / Registration text block -->


    
    <tpl if="success">
        <div class="tndr_alert">
            <p><b>Ваша учетная запись успешно активирована.</b></p>
        	<p>Для продолжения работы зайдите в личный кабинет и введите данные об организации.</p>
        </div>
    </tpl>
    
    <script type="text/javascript" src="/js/login_publ.js"></script>
    
    <div class="tndr_form login_form">
    <h2>Вход в личный кабинет</h2>
    <form onsubmit="return false;">
    	<ul class="inlined">
    		<li class="form_text">Логин</li><li class="form180"><div class="input_wrap"><input id="login" type="text" value="tester" /></div></li><br>
    		<li class="form_text">Пароль</li><li class="form180"><div class="input_wrap"><input type="password" id="pass" value="Aa222222" /></div></li><li><a href="#">Забыли пароль?</a></li><br>
    		<li class="form_text"></li><li><label><input type="checkbox">Запомнить меня</label></li><br>
    		<li class="form_text"></li><li class="form120"><button type="submit" id="submit"><span class="tndr_btn">Войти</span></button></li>
    	</ul>
    </form>
    </div>
    
    <div class="reg_form">
    <h2>Регистрация</h2>
    <p>Для участия в тендерах ОАО ХК ГВСУ «Центр» необходимо зарегистрироваться.</p>
    <p><a href="/help/conditions/">Условия участия в тендерах</a><br><a href="/help/info/">Термины и определения</a></p>
    <a href="/registration/" class="tndr_btn">Регистрация</a>
    </div>
    
    <div class="clear"></div>
