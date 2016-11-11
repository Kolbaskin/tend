viewModel.priceChanged1 = function(item, x, y) {
    item.price2(item.price1()*item.counts)
    recalcSumm(true)
}
viewModel.priceChanged2 = function(item) {
    item.price1(Math.round((item.price_new() || item.price2())/item.counts))
    recalcSumm(true)
}

viewModel.positions = ko.observableArray()

var calcDeltaPrice = function(bestPrice, startPrice) {
    if(bestPrice && bestPrice.price) {
        return Math.round((100 - (100 / parseFloat(startPrice)) * parseFloat(bestPrice.price))*100)/ 100
    }
    return 0;
}

var formatDate = function(dateIn) {
    var date = new Date(dateIn)
    if(date) {
        var y = date.getFullYear()
            ,m = date.getMonth()
            ,d = date.getDate()
            ,h = date.getHours()
            ,mi = date.getMinutes()
            ,s = date.getSeconds()
        if(m<10) m = '0'+m
        if(d<10) d = '0'+d
        if(h<10) h = '0'+h
        if(mi<10) mi = '0'+mi
        if(s<10) s = '0'+s
        
        return d+'.'+m+' '+h+':'+mi+':'+s;
    }
    return '';
}

$.post('/Gvsu.modules.tender.controller.Tender.getPositions/', {tender: viewModel.tenderId}, function(data) {
    if(data && data.response && data.response.data) {
        viewModel.tenderLeftTime = data.response.leftTime;
        for(var i=0;i<data.response.data.length;i++) {
            var o = {
                id: data.response.data[i]._id,
                name: data.response.data[i].name,
                uname: data.response.data[i].uname,
                counts: data.response.data[i].counts,
                price1: ko.observable(data.response.data[i].price1 || ''),
                price2: ko.observable(data.response.data[i].price2 || ''),
                price_new: ko.observable(),
                iname1: 'price1[' + data.response.data[i]._id + ']',
                iname2: 'price2[' + data.response.data[i]._id + ']',
                bestPrice: data.response.bestPrice? data.response.bestPrice.price:0,
                bestPriceDate: formatDate(data.response.bestPrice? data.response.bestPrice.dt:''),
                start_price: data.start_price,
                deltaPrice: calcDeltaPrice(data.response.bestPrice, data.response.start_price),
                otherprices: ko.observableArray()
            }
            if(data.response.data[i].otherprices) {
                for(var j=0;j<data.response.data[i].otherprices.length;j++) {
                    o.otherprices.push({
                        name: 'Организация ' + data.response.data[i].otherprices[j].org,
                        price1: ko.observable(data.response.data[i].otherprices[j].price1),
                        price2: ko.observable(data.response.data[i].otherprices[j].price2),
                        dt: formatDate(data.response.data[i].otherprices[j].dt)
                    })
                }
            }
            viewModel.positions.push(o)
        }
    }
}, 'JSON')

checkChanges = function() {
    setTimeout(function() {
        $.post('/Gvsu.modules.tender.controller.Tender.getPositions/', {tender: viewModel.tenderId}, function(data) {
            if(data && data.response && data.response.data) {
                viewModel.tenderLeftTime = data.response.leftTime;
                for(var i=0;i<data.response.data.length;i++) {
                    for(var k=0;k<viewModel.positions().length;k++) {
                        if(viewModel.positions()[k].id == data.response.data[i]._id) {
                            viewModel.positions()[k].otherprices([])    
                                    
                            if(data.response.data[i].otherprices) {
                                for(var j=0;j<data.response.data[i].otherprices.length;j++) {
                                    viewModel.positions()[k].otherprices.push({
                                        name: 'Организация ' + data.response.data[i].otherprices[j].org,
                                        price1: ko.observable(data.response.data[i].otherprices[j].price1),
                                        price2: ko.observable(data.response.data[i].otherprices[j].price2),
                                        dt: formatDate(data.response.data[i].otherprices[j].dt)
                                    })
                                }
                            }
                            
                            break;
                        }
                    }
                }
            }
            checkChanges()
        }, 'JSON')
    }, 5000)
}
checkChanges()

viewModel.finish = false;

if(isNaN(viewModel.start_price)) viewModel.start_price = 0
if(isNaN(viewModel.step_price)) viewModel.step_price = 0
else if(viewModel.step_price) {
    if(viewModel.step_price<1) {
        viewModel.step_price *= viewModel.start_price
    }    
    //viewModel.step_price *= Math.round(viewModel.start_price/100)
}

recalcSumm = function(alrt) {
    var pos = viewModel.positions()
        ,bestPrice = viewModel.start_price
        ,x
        ,summ = 0;
    for(var i=0;i<pos.length;i++) {
        x = parseFloat(pos[i].price_new() || pos[i].price2())
        if(!isNaN(x)) summ += x;
        if(pos[i].bestPrice) bestPrice = pos[i].bestPrice
    }
/*    
    if(viewModel.start_price && summ>viewModel.start_price) {
        if(alrt) 
            alert('Указанная Вами цена превышает стартовую цену лота!\nИзмениете цену.')
        viewModel.tenderIsActive(false)
        return false;
    }
*/

    var fprc = viewModel.v.price_full()

    if(fprc && summ>fprc) {
        if(alrt) alert('Указанная Вами цена превышает предыдущую вашу цену этого лота!\nИзмениете цену.')
        viewModel.tenderIsActive(false)
        return false;
    }
    
    if(viewModel.step_price && viewModel.step_price>(bestPrice - summ)) {
    
        if(alrt) {

            alert('Шаг изменения цены: ' + viewModel.step_price + '. Цена может изменяться не менее чем на эту величину\nМаксимально возможная цена на текущий момент: ' + (bestPrice - viewModel.step_price) )
        }
        viewModel.tenderIsActive(false)
        return false;
    }
    
    for(var i=0;i<pos.length;i++) {
        if(!!pos[i].price_new && pos[i].price_new()) pos[i].price2(pos[i].price_new())
    }
    
    if(!viewModel.finish) viewModel.tenderIsActive(true)
    return true;
}




/*
setTimeout(function() {
    //viewModel.positions()[0].otherprices()[1].price1(111)
    //viewModel.positions()[0].otherprices.push({name: 'Орг3', price1: ko.observable(55), price2: ko.observable(555)})
    
    viewModel.positions.push(
    {
        name: 'Позиция раз',
        uname: 'Шт.',
        counts: 100,
        price1: ko.observable(20),
        price2: ko.observable(200),
        iname1: 'price1[1]',
        iname2: 'price2[1]',
        otherprices: ko.observableArray([
            {name: 'Орг1', price1: ko.observable(10), price2: ko.observable(100)},
            {name: 'Орг2', price1: ko.observable(9), price2: ko.observable(90)}
        ])
    },{
        name: 'Позиция двас',
        uname: 'Шт.',
        counts: 100,
        price1: 30,
        price2: 300,
        iname1: 'price1[2]',
        iname2: 'price2[2]',
        otherprices: ko.observableArray([
            {name: 'Орг1', price1: ko.observable(10), price2: ko.observable(100)},
            {name: 'Орг2', price1: ko.observable(9), price2: ko.observable(90)}
        ])
    })   
    
}, 3000)

*/
