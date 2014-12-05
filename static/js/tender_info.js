$(document).ready(function() {
	var ct = $("#curTime");
	
	if(ct) {
		var t = parseInt(ct.attr('data'))
		var x = (new Date()).getTime()

		x = t-x;		
		
		setInterval(function() {
			var d = new Date((new Date()).getTime()+x)
			var h = d.getHours(),
			    m = d.getMinutes(),
			    s = d.getSeconds();
			if(h<10) h = '0' + h
			if(m<10) m = '0' + m
			if(s<10) s = '0' + s    
			ct.html('(текущее время: ' + h + ':' + m + ':' + s + ')')
		}, 1000)
	}
})