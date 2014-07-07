<h2>Личный кабинет</h2>

<div>
    
    <tpl if="status==false">
        <p>Статус: не активен</p>
        <p>Для участия в тендере необходимо заполнить следующую информацию:</p>
        <ul>
            <li><a href="./company/">Информацию об организации</a></li>
            <li><a href="./documents/">Документы</a></li>
            <li><a href="./workscat/">Категории и виды работ</a></li>
        </ul>
    </tpl>
    <tpl if="status==true">
        <p>Статус: активен</p>
    </tpl>    
</div>

<h3>Персональные данные</h3>

<table>
    <tr><td>Логин</td><td>{user.login}</td></tr>
    <tr><td>Рабочий телефон</td><td>{user.phone}</td></tr>
    <tr><td>E-mail</td><td>{user.email}</td></tr>
    <tr><td>ФИО</td><td>{user.fname} {user.name} {user.sname}</td></tr>
    <tr><td>Должность</td><td>{user.position}</td></tr>
</table>

<a href="./user/">Изменить личные данные</a>

<h3>Данные об организации</h3>

<p>Данные об организации заполнены не полностью. <a href="./company/">Заполнить?</a></p>

<a href="./company/">Изменить информацию об организации</a>

<h3>Документы</h3>

<p>Загружены не все документы. <a href="./documents/">Загрузить?</a></p>

<a href="./documents/">Прислать документы</a>

<h3>Категории и виды работ</h3>

<p>Категории не выбраны. <a href="./documents/">Выбрать?</a></p>

<a href="./workscat/">Выбор категорий и видов работ</a>