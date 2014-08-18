<!DOCTYPE HTML>
<html>
<head>
	<title>ОАО ХК ГВСУ «Центр» - Тендеры - {[values.metatitle? values.metatitle:values.name]}</title>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta http-equiv="imagetoolbar" content="no">
	<script src="http://code.jquery.com/jquery-1.8.3.min.js" type="text/javascript"></script>
	<script src="/js/jquery.cookie.js"></script>
    <script src="/js/ko.js"></script>
	<script src="/js/code.js" type="text/javascript"></script>
	<script src="/js/swfobject.js" type="text/javascript"></script>
	<link rel="stylesheet" href="/style/inner.css" type="text/css" media="screen">
	<link rel="stylesheet" href="/style/print.css" type="text/css" media="print">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
	<!--[if lte IE 7]>
	<link rel="stylesheet" type="text/css" media="all" href="/style/ie_old.css">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/chrome-frame/1/CFInstall.min.js"></script>
	<script>
	window.attachEvent('onload', function() {
		$('body').prepend('<div id="ie_alert">Для просмотра сайта вам необходимо установить модуль Google Chrome Frame</div>');
		CFInstall.check({
            mode: 'inline',
            node: 'prompt'
        });
	});
	</script>
	<![endif]-->
</head>

<body>
<div id="page_wrapper" class="inn3">
<div id="page_container">
<img src="/images/inn_top_line3.jpg" width="1277" height="108" id="head_line">
<img src="/images/inn_rhombus3.png" id="rhombus">
<img src="/images/logo.png" width="138" height="151" id="logo" class="png">
<div id="logo_spark"></div>
<div id="rhombus_spark"></div>
<img src="/images/company_inn.png" width="260" height="39" id="company" class="png">
<img src="/images/icons.gif" width="146" height="15" id="icons" usemap="#icons">
<a href="http://top10.gvsu.ru"><img src="/images/10objects.png" width="256" height="111" id="ten_objects"></a>
<map name="icons">
<area href="/" title="заглавная" coords="0,0,12,15">
<area href="#" title="написать письмо" coords="44,0,64,15">
<area href="#" title="карта сайта" coords="96,0,115,15">
</map>

<div id="menu">
<ul class="inlined">
	<li>
		<a href="/"><span>Главная</span></a>
	</li>
	<li>
		<a href="/tenders/"><span>Мои тендеры</span></a>
	</li>
	<li>
		<a href="/cabinet/"><span>Личный кабинет</span></a>
		<div>
			<a href="/cabinet/user/">Персональные данные</a>
            <a href="/cabinet/company/">Информация об организации</a>
            <a href="/cabinet/documents/">Документы</a>
            <a href="/cabinet/workscat/">Категории и виды работы</a>
		</div>
	</li>
	<li class="special"><a href="http://www.gvsu.ru"><span>ХК ГВСУ «Центр»</span></a></li>
</ul>
</div>

<div id="submenu">
<div id="submenu_in">
<a href="/">Главная</a>
<tpl for="crumbs">
    / <a href="{dir}">{name}</a>
</tpl>
<tpl if="name != 'Home'"> / {name}</tpl>
</div>
<span></span>
</div>

<div id="shame"><!-- i --></div>


<div id="left_col">
<div id="left_col_in">

<div id="print"><a href="#">версия для печати</a></div>
<h1 class="page_header">Система электронных тендеров</h1>
<h2 class="page_header">{name}</h2>

<div id="tndr_left">
<div id="tndr_left_in">

<tpl if="blocks[1]">
    <tpl for="blocks[1]">
        <div>{.}</div>
    </tpl>
</tpl>

</div>
</div><!--/tndr_left-->

<tpl if="user.login">
    <div id="tndr_right">
    <div id="tndr_right_in">
    
        <p id="tndr_user"><b>Пользователь:</b> {user.fname} {user.name} <a href="/login/?exit=1">Выход</a></p>
        
        <div id="tndr_menu">
        <a href="/cabinet/user/#" class="tndr_btn">Персональные данные</a>
        <a href="/cabinet/company/" class="tndr_btn">Информация об организации</a>
        <a href="/cabinet/documents/" class="tndr_btn">Документы</a>
        <a href="/cabinet/workscat/" class="tndr_btn">Категории и виды работы</a>
        <a href="/help/" class="tndr_btn">Помощь</a>
        </div>
    
    
    </div>
    </div><!--/tndr_right-->
</tpl>

<div class="clear"></div>

</div>
</div><!--/left_col -->

<div id="clear"></div>
</div><!--/page_container -->

<div id="footer">
<div id="shame_line"></div>
<div id="footer_in">
	<div id="btm_info"><span>Контактная информация:</span> Россия, 109147, г. Москва, ул. Воронцовская, д. 21А, стр. 1<br>Тел: +7 (495) 912-31-00</div>
	<div id="copyright">&copy; 1998—2010<br>ОАО Холдинговая компания «ГВСУ «Центр»<br><a href="http://www.statpro.ru" target="_blank">Разработка сайта</a>: <img src="/images/statpro.gif" width="11" height="8" alt=""> Статпро</div>
	<div id="counter"></div>
</div>
</div><!--/footer -->

</div><!--/page_wrapper -->
</body>
</html>

