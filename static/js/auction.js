viewModel.priceChanged1 = function(item) {
    item.price2(item.price1()*item.counts)
}
viewModel.priceChanged2 = function(item) {
    item.price1(Math.round(item.price2()/item.counts))
}

viewModel.positions = ko.observableArray()

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
                iname1: 'price1[' + data.response.data[i]._id + ']',
                iname2: 'price2[' + data.response.data[i]._id + ']',
                otherprices: ko.observableArray()
            }
            if(data.response.data[i].otherprices) {
                for(var j=0;j<data.response.data[i].otherprices.length;j++) {
                    o.otherprices.push({
                        name: 'Организация ' + (j+1),
                        price1: ko.observable(data.response.data[i].otherprices[j].price1),
                        price2: ko.observable(data.response.data[i].otherprices[j].price2)
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
                                        name: 'Организация ' + (j+1),
                                        price1: ko.observable(data.response.data[i].otherprices[j].price1),
                                        price2: ko.observable(data.response.data[i].otherprices[j].price2)
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