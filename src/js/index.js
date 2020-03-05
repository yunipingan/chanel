//由于官网的请求是一次一次请求的，所以我把id存放在数组里面，一起请求回来
var idlist = ['0107180', '0107920', '0107680', '0107110', '0107360', '0107960', '0107300', '0107450', '0107060', '0107930', '0107308']
// 根据商品id发送请求获取数据，并且渲染到页面中
var goodsdata = []
var str = ''
idlist.forEach(function (item, index) {
    $.ajax({
        url: 'https://www.chanel.cn/fnbv3/pdp',
        type: 'get',
        dataType: 'json',
        data: {
            sku: `${item}`,
            locale: 'zh_CN',
            skuinfo: 'true'
        },
        success(res) {
            goodsdata.push(res)
            str += `
            <li idx="${res.productid}">
                <img src="${res.productimages[0][209]}" alt="">
                <div class="textbox">
                    <a>${res.productname}</a>
                    <span>${res.productdescription}</span>
                    <em class="discontent">${res.flag}</em>
                    <p>${res.productpricedisplay}</p>
                    <button>立即购买</button>
                </div>
            </li>`
            $('.goodslist > ol').html(str)
            localStorage.setItem('goodsinfo', JSON.stringify(goodsdata))
        }
    })
})

// console.log(goodsdata);
var parfum = []
var notparfum = []
var str0 = ''
var str1 = ''
var str2 = ''
//切换选项卡渲染页面
$('.nav-tabs > li').click(function () {
    $('.goodslist > ol').html('')
    $(this).addClass('active')
        .siblings()
        .removeClass('active')
    if (this.children[0].text === '所有商品') {
        $('.button > button').css("display", "block")
        if (this.className === 'active') {
            goodsdata.forEach(item => {
                str0 += `<li idx="${item.productid}">
                <img src="${item.productimages[0][209]}" alt="">
                <div class="textbox">
                    <a>${item.productname}</a>
                    <span>${item.productdescription}</span>
                    <em class="discontent">${item.flag}</em>
                    <p>${item.productpricedisplay}</p>
                    <button>立即购买</button>
                </div>
            </li>`
            })
            $('.goodslist > ol').html(str0)
            str0 = ''
        }
    }
    else if (this.children[0].text === '香水') {
        $('.button > button').css("display", "none")
        if (this.className === 'active') {
            goodsdata.forEach(item => {
                if (item.productid === '0107360' || item.productid === '0107180' || item.productid === '0107300' || item.productid === '0107450' || item.productid === '0107308') {
                    parfum.push(item)
                }
            })
            parfum.forEach(item => {
                str1 += `<li idx="${item.productid}">
                <img src="${item.productimages[0][209]}" alt="">
                <div class="textbox">
                    <a>${item.productname}</a>
                    <span>${item.productdescription}</span>
                    <em class="discontent">${item.flag}</em>
                    <p>${item.productpricedisplay}</p>
                    <button>立即购买</button>
                </div>
            </li>`
            })
            $('.goodslist > ol').html(str1)
            str1 = ''
            parfum = []
        }
    }
    else if (this.children[0].text === '护理品') {
        $('.button > button').css("display", "none")
        if (this.className === 'active') {
            goodsdata.forEach(item => {
                if (item.productid === '0107920' || item.productid === '0107110' || item.productid === '0107680' || item.productid === '0107960' || item.productid === '0107930' || item.productid === '0107060') {
                    notparfum.push(item)
                }
            })
            notparfum.forEach(item => {
                str2 += `
                <li idx="${item.productid}">
                    <img src="${item.productimages[0][209]}" alt="">
                    <div class="textbox">
                        <a>${item.productname}</a>
                        <span>${item.productdescription}</span>
                        <em class="discontent">${item.flag}</em>
                        <p>${item.productpricedisplay}</p>
                        <button>立即购买</button>
                    </div>
                    </li>`
            })
            $('.goodslist > ol').html(str2)
            str2 = ''
            notparfum = []
        }
    }
})

//排序
var ol = document.querySelector('ol')
$('.button > button').click(function () {
    $('.goodslist > ol').html('')
    goodsdata.sort(function (a, b) {
        return b.productprice - a.productprice
    })
    for (var i = 0; i < goodsdata.length; i++) {
        var str3 = `<li idx="${goodsdata[i].productid}">
        <img src="${goodsdata[i].productimages[0][209]}" alt="">
        <div class="textbox">
            <a>${goodsdata[i].productname}</a>
            <span>${goodsdata[i].productdescription}</span>
            <em class="discontent">${goodsdata[i].flag}</em>
            <p>${goodsdata[i].productpricedisplay}</p>
            <button>立即购买</button>
        </div>
        </li>`
        ol.innerHTML += str3
    }
})

//点击跳转详情页
$('.goodslist > ol').on('click', 'li', function () {

    var id = this.getAttribute('idx')
    console.log(id);
    window.location.href = './detail.html?id='+id
})

//登录按钮功能
$('.loginbtn').click(function(){
    if(this.innerText === '请登录'){
        window.location.href = './login.html?page=index&id=0'
    }
    
})

//获取cookie
var uname = getCookie('uname')
var upsd = getCookie('upsd')

function setName (){
    if(uname && upsd){
        $('.loginbtn').html('欢迎您，'+uname+'！')
    }
}
setName()

//点击购物袋按钮跳转购物袋页面
$('.iconfont').click(function(){
    window.location.href = './cart.html'
})

//设置右上角购物袋的商品个数
var newnum = JSON.parse(localStorage.getItem('num'))
$('.login > div > em').html(newnum)