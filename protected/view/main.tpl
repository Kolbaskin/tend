<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
    <title>{[values.metatitle? values.metatitle:values.name]}</title>
    <script src="/js/ko.js"></script>
    </head>

<body>

<h2>Главная страница</h2>

<ul>
    <tpl for="menu">
        <li>{title}</li>
    </tpl>
</ul>

<tpl if="blocks[1]">
    <h1>Block 1</h1>
    
    <tpl for="blocks[1]">
        <div>{.}</div>
    </tpl>
</tpl>


<tpl if="blocks[2]">
    <h1>Block 2</h1>
    
    <tpl for="blocks[2]">
        <div>{.}</div>
    </tpl>
</tpl>

</body>
</html>
