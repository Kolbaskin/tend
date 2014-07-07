<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
    <title>{[values.metatitle? values.metatitle:values.name]}</title>
    <script src="/js/jquery.js"></script>
    <script src="/js/jquery.cookie.js"></script>
    <script src="/js/ko.js"></script>
    </head>

<body>

<h2>Вложенная страница</h2>

<ul>
    <tpl for="menu">
        <li>{title}</li>
    </tpl>
</ul>

<tpl if="blocks[1]">
    <tpl for="blocks[1]">
        <div>{.}</div>
    </tpl>
</tpl>


</body>
</html>
