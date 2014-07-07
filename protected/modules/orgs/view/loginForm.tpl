<!-- Login form block -->
<script type="text/javascript" src="/js/login_publ.js"></script>

<tpl if="success==true">
    <p>Ваш аккаунт активирован, можете авторизоваться на сайте:</p>
</tpl>
 
<form onsubmit="return false;">
    <table id="step1">
    
    <tr><td>Login</td><td class="input"><input id="login" value="" /></td></tr>
    <tr><td>Password</td><td class="input"><input type="password" id="pass" value="" /></td></tr>
    <tr><td></td><td><button id="submit">Enter</button>&nbsp;&nbsp;<!--<button onclick="location='registration.htm'">Registration</button>--></td></tr>
    
    <tr><td></td><td id="error" style="display:none">Error in login or password</td></tr>
    </table>
    
    <table id="step2" style="display:none">

    <tr><td>Session Password</td><td class="input"><input type="password" id="sesspass" /></td></tr>
    <tr><td></td><td><button id="submit2">Enter</button>&nbsp;&nbsp;</td></tr>
    
    <tr><td></td><td id="error" style="display:none">Error in session password</td></tr>
    </table>
</form>
<!-- / Login form block -->
<hr/>

<!-- Registration text block -->
<h2>Регистрация</h2>
<p>Текст про регистрацию</p>

<ul>
    <li><a href="/help/conditions/">Условия участия</a></li>
    <li><a href="/help/info/">Справочная информация</a></li>
</ul>
<a href="/registration/">Регистрация</a>
<!-- / Registration text block -->
