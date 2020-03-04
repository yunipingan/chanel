//获取参数
var param = location.search.slice(1)
//获取id
var id = param.split('=')[1]

//从缓存读取数据
var infolist = JSON.parse(localStorage.getItem('goodsinfo'))

//过滤出我们想要的数据
var info = infolist.filter(function(item,index){
    return item.productid === id
})
// console.log(info[0]);

var row = document.querySelector('.row')
row.innerHTML = `<div class="left">
<article>
    <a>
        <img src="${info[0].productimages[0][209]}" alt="">
    </a>
</article>
</div>
<div class="right">
<h1>${info[0].productname}<br>
    <span>${info[0].productdescription}</span>
</h1>
<em>${info[0].flag}</em>
<div class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        ${info[0].productimages[0].shadename}
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a>${info[0].productimages[0].shadename}</a></li>
    </ul>
</div>
<div class="price">
    <p>${info[0].productpricedisplay}</p>
</div>
<button id="add">加入购物袋</button>
</div>`

//登录按钮功能
$('.loginbtn').click(function(){
    if(this.innerText === '请登录'){
        window.location.href = './login.html?page=detail&id='+id
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

