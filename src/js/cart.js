//获取cookie
var uname = getCookie('uname')
var upsd = getCookie('upsd')

function setName() {
    if (uname && upsd) {
        $('.loginbtn').html('欢迎您，' + uname + '！')
    }
}
setName()

//设置右上角购物袋的商品个数
var newnum = JSON.parse(localStorage.getItem('num'))

$('.login > div > em').html(newnum)
$('main > p >a').html(newnum)

//渲染购物袋页面
var goodsinfo = JSON.parse(localStorage.getItem('goodsinfo'))
var str, num = 0
var addlist = JSON.parse(localStorage.getItem('addlist'))
//将数组里面的id统计各个id的个数，即商品的个数
var newaddlist = addlist.reduce(function (allNames, name) {
    if (name in allNames) {
        allNames[name]++;
    }
    else {
        allNames[name] = 1;
    }
    return allNames;
}, {});
// console.log(newaddlist);
for (key in newaddlist) {
    var shopLists = goodsinfo.filter(function (item, index) {
        return item.productid === key
    })
    if (shopLists.length !== 0) {
        // console.log(shopLists);
        shopLists.forEach(item => {
            str += `
            <li data-id="${item.productid}">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            <div class="image">
                <img src="${item.productimages[0][209]}" alt="">
            </div>
            <div class="info">
                <p>${item.productname}</p>
                <p>${item.productdescription}</p>
                <p>
                    <em>${item.productimages[0].shadename}&nbsp;</em>-<em>&nbsp;¥<i>${item.productprice.toFixed(2)}</i></em>
                </p>
            </div>
            <div class="num">
                <span class="reduce">-</span>
                <input class="count" type="text" value="${newaddlist[key]}">
                <span class="add">+</span>
            </div>
            <div class="sum">
                ¥ <span>${(item.productprice.toFixed(2) * 1) * (newaddlist[key] * 1)}</span>
            </div>
        </li>`
        })

    }
}

$('.goodsinfo').html(str)

//初始化购物袋的各个商品总价和所有商品总价
var allSum = 0
$('.goodsinfo > li').each(function (index, item) {
    //获取各个商品总价
    allSum += $(this).children().eq(4).children().html() * 1
})
$('#allnum').html(allSum)

//点击减按钮，相关变化
$('ul').on('click', '.reduce', function () {
    //获取input值
    var oldCount = $(this).next().val() * 1
    //获取单价
    var single = $(this).parent().prev().children().last().children().last().children().last().html() * 1
    //获取单品总价
    var singleAll = $(this).parent().next().children().last().html() * 1
    //获取购物袋所有商品总价
    var allgoods = $(this).parent().parent().parent().next().children().eq(2).children().last().children().last().html() * 1
    var id = $(this).parent().parent().data('id')
    

    if (oldCount > 0) {
        //该商品的数量变化
        var newCount = oldCount - 1
        $(this).next().val(newCount);
        //单品总价变化
        var newSingleAll = (newCount * single).toFixed(2)
        $(this).parent().next().children().last().html(newSingleAll)
        //所有商品总数变化
        var newAllGoods = (allgoods - single).toFixed(2)
        $('#allnum').html(newAllGoods)
        //购物袋总件数变化
        newnum -= 1
        $('.login > div > em').html(newnum)
        $('main > p >a').html(newnum)
        localStorage.setItem('num', JSON.stringify(newnum))
        //添加商品id到localstorage，记录总数
        addlist.splice($.inArray(id,addlist),1)
        localStorage.setItem('addlist',JSON.stringify(addlist))
    }

})

//点击加按钮，相关变化
$('ul').on('click', '.add', function () {
    //获取input值
    var oldCount = $(this).prev().val() * 1
    //获取单价
    var single = $(this).parent().prev().children().last().children().last().children().last().html() * 1
    //获取单品总价
    var singleAll = $(this).parent().next().children().last().html() * 1
    //获取购物袋所有商品总价
    var allgoods = $(this).parent().parent().parent().next().children().eq(2).children().last().children().last().html() * 1
    var id = $(this).parent().parent().data('id')

    //该商品的数量变化
    var newCount = oldCount + 1
    $(this).prev().val(newCount);
    //单品总价变化
    var newSingleAll = (newCount * single).toFixed(2)
    $(this).parent().next().children().last().html(newSingleAll)
    //所有商品总数变化
    var newAllGoods = (allgoods + single).toFixed(2)
    $('#allnum').html(newAllGoods)
    //购物袋总件数变化
    newnum += 1
    $('.login > div > em').html(newnum)
    $('main > p >a').html(newnum)
    localStorage.setItem('num', JSON.stringify(newnum))
    //添加商品id到localstorage，记录总数
    addlist.push(id)
    localStorage.setItem('addlist',JSON.stringify(addlist))
})

//点击删除的变化
$('ul').on('click', '.glyphicon', function () {
    var id = $(this).parent().data('id')
    //总价格变化
    $('#allnum').html($('#allnum').html() * 1 - $(this).next().next().next().next().children().html() * 1)
    //购物袋总件数变化
    var renum = JSON.parse(localStorage.getItem('num'))*1
    var newrenum = renum - $(this).next().next().next().children().eq(1).val()
    localStorage.setItem('num',JSON.stringify(newrenum))
    $('.login > div > em').html(newrenum)
    $('main > p >a').html(newrenum)
    //添加商品id到localstorage，记录总数
    var remnum = $(this).next().next().next().children().eq(1).val()
    addlist.splice($.inArray(id,addlist),remnum)
    localStorage.setItem('addlist',JSON.stringify(addlist))
    $(this).parent().remove()
})