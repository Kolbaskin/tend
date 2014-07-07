var ws = new WebSocket("ws://localhost:8000/?token=1234567&id=111", 'yode-protocol');
ws.onclose = function() {
    alert('close')
};
ws.onmessage = function(evt) { 
    alert(evt.data); 
};