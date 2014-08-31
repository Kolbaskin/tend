if (!window.opera) {
	try {
	  document.execCommand("BackgroundImageCache", false, true);
	} catch(err) {}
}

$(document).ready(
	function() {
		if (window.opera) {
			$('#main_news li').wrapInner('<div></div>');
			if (parseInt(opera.version().substr(0,2))>=10) {
				$('#menu li div').each(function(){
					$(this).css('border','none');
					$(this).find('a:last').css({'margin':'0 0 47px 0','border-bottom':'1px solid #bdcfe1'})
				});
			}
		}
		$('#search').find('input').focus(function(){
			if ($(this).val()=='поиск по сайту') $(this).val('');
		}).blur(function(){
			if (!/[\wа-яА-Я]/.test($(this).val())) $(this).val('поиск по сайту');
		});
		$('#print').children().click(function(){
			window.print();
			return false;
		});
		$("#menu").find('li').hover(function() {
			$(this).addClass('open');
		},function() {
			$(this).removeClass('open');
		});


		$('#tndr_left').find(('table.tndr_table')).each(function(){
			$(this).find('tr:odd').addClass('odd')
		}).end().find('div.tndr_hidden_topic').prev().on('click',function(){
			$(this).next().slideToggle(150);
			return false;
		}).end().end().find('span.tndr_btn').parent().hover(function(){
			$(this).children().toggleClass('act');
		}).end().end().find('input[type="file"]').on('change',function(){
			$(this).next().text($(this).val().split('\\').pop());
		});

		$('#logo_spark').flash({
			swf: '/flash/spark_logo.swf',
			width: '135',
			height: '148',
			params: {menu: 'false', wmode: 'transparent'}
		});
		$('#rhombus_spark').flash({
			swf: '/flash/spark_rhombus3.swf',
			width: '444',
			height: '274',
			params: {menu: 'false', wmode: 'transparent'}
		});
		$('.folder').children().on('click',function(){
			$(this).parent().toggleClass('act').next().slideToggle(300);
		})
	}
);