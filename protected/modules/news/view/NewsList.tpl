<html><body>
<script SRC="/js/ws.js"></script>
<h2>{test} </h2><p>Date time: {time}</p><tpl if="this.isBaby(age)"><p>{name:htmlEncode} is a baby!</p></tpl>
</body></html>

>>>CODE>>>
{
  isBaby: function(x) {
    return x? 'да':'не'      
  }
}
<<<CODE<<<