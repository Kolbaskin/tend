<h2>Личный кабинет</h2>

<div>
    
    <tpl if="user.status==false">
        <p>Статус: не активен</p>
        <p>Для участия в тендере необходимо заполнить следующую информацию:</p>
        <ul>
            <li><a href="./company/">Информацию об организации</a></li>
            <li><a href="./documents/">Документы</a></li>
            <li><a href="./workscat/">Категории и виды работ</a></li>
        </ul>
    </tpl>
    <tpl if="user.status==true">
        <p>Статус: активен</p>
    </tpl>    
</div>

<div class="tndr_cabinet_detail">
<h2>Персональные данные</h2>
<table class="tndr_table">
<tr>
    <td width="114">Логин</td>
    <td>{user.login}</td>
</tr>
<tr>
    <td width="114">Рабочий телефон</td>
    <td>{user.phone}</td>
</tr>
<tr>
    <td width="114">E-mail</td>
    <td>{user.email}</td>
</tr>
<tr>
    <td width="114">ФИО</td>
    <td>{user.fname} {user.name} {user.sname}</td>
</tr>
<tr>
    <td width="114">Должность</td>
    <td>{user.position}</td>
</tr>
</table>
<a href="./user/" class="tndr_btn">изменить персональные данные</a>
</div>

<div class="tndr_cabinet_detail">
<h2>Информация об организации</h2>
<p>Данные об организации заполнены не полностью. <a href="./company/">Заполнить?</a></p>
<a href="./company/" class="tndr_btn">изменить информацию об организации</a>
</div>

<div class="tndr_cabinet_detail">
<h2>Документы</h2>
<p>Загружены не все документы. <a href="./documents/">Загрузить?</a></p>
<a href="./documents/" class="tndr_btn">загрузить новые документы</a>
</div>

<div class="tndr_cabinet_detail">
<h2>Категории и виды работ</h2>
<p>Категории не выбраны. <a href="./documents/">Выбрать?</a></p>
<a href="./workscat/" class="tndr_btn">выбрать категории и виды работ</a>
</div>