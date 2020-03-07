var click1 = document.querySelector('.text1')
var form1 = document.querySelector('#loginform')
var click2 = document.querySelector('.text2')
var form2 = document.querySelector('#registerform')
var loginform = document.querySelector('#loginform')
var registerform = document.querySelector('#registerform')
var inpusr = document.querySelector('.inpusr')
var inppsd = document.querySelector('.inppsd')
var regusr = document.querySelector('.regusr')
var regpsd = document.querySelector('.regpsd')
var comregpsd = document.querySelector('.comregpsd')
var jt1 = document.querySelector('#jiantou1')
var jt2 = document.querySelector('#jiantou2')

click1.onclick = function () {
    if (form1.getAttribute('class') === null) {
        form1.setAttribute('class', 'active')
        form2.removeAttribute('class', 'active')
        jt1.setAttribute('class', 'glyphicon glyphicon-menu-up')
        jt2.setAttribute('class', 'glyphicon glyphicon-menu-down')
    } else {
        form1.removeAttribute('class', 'active')
        jt1.setAttribute('class', 'glyphicon glyphicon-menu-down')
    }
}
click2.onclick = function () {
    if (form2.getAttribute('class', 'active') === null) {
        form2.setAttribute('class', 'active')
        form1.removeAttribute('class', 'active')
        jt2.setAttribute('class', 'glyphicon glyphicon-menu-up')
        jt1.setAttribute('class', 'glyphicon glyphicon-menu-down')
    } else {
        form2.removeAttribute('class', 'active')
        jt2.setAttribute('class', 'glyphicon glyphicon-menu-down')
    }
}

//获取参数，判断是哪个页面跳转过来的，登录成功后跳回那个页面
var param = location.search.slice(1)
// console.log(param);

//获取page
var secpage = param.split('&')[0]
var secid = param.split('&')[1]

var page = secpage.split('=')[1]
var id = secid.split('=')[1]

//点击登录按钮
loginform.onsubmit = function (e) {
    e = e || window.event
    e.preventDefault()

    var inpusername = inpusr.value
    var inppassword = inppsd.value

    if (inpusername && inppassword) {
        var xhr = new XMLHttpRequest()

        xhr.open('POST', 'http://localhost/server/chanel/login.php')

        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText)
            if (res.code === '0') {
                alert(res.message)
            } else if (res.code === '1') {
                setCookie('uname',inpusername,'3000')
                setCookie('upsd',inppassword,'3000')
                if(page === 'index'){
                    window.location.href = './index.html'
                }else if(page === 'detail'){
                    window.location.href = './detail.html?id='+id
                }
            }
        }

        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

        xhr.send(`username=${inpusername}&password=${inppassword}`)
    }
    else {
        alert('请输入用户名和密码！')
    }
}

//提交注册信息
registerform.onsubmit = function (e) {
    //阻止表单的默认提交行为
    e = e || window.event
    e.preventDefault()
    var rgusername = regusr.value
    var rgpassword = regpsd.value
    var compassword = comregpsd.value

    if (rgusername && rgpassword && compassword) {
        if (rgpassword >= 6 && rgpassword === compassword) {
            var xhr = new XMLHttpRequest()

            xhr.open('POST', 'http://localhost/server/chanel/register.php')

            xhr.onload = function () {
                var res = JSON.parse(xhr.responseText)
                if (res.code === '0') {
                    alert(res.message)
                    regusr.value = ''
                    regpsd.value = ''
                    comregpsd.value = ''
                } else if (res.code === '1') {
                    alert(res.message)
                    regusr.value = ''
                    regpsd.value = ''
                    comregpsd.value = ''
                }
            }

            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

            xhr.send(`username=${rgusername}&password=${rgpassword}`)
        }
        else if (rgpassword.length < 6) {
            alert('密码不能少于6位！')
        }
    } else if (!rgusername || !rgpassword) {
        alert('请完整填写信息！')
    }
}

//设置右上角购物袋的商品个数
var newnum = JSON.parse(localStorage.getItem('num'))
$('.login > div > em').html(newnum)

localStorage.setItem('addlist',JSON.stringify([]))
localStorage.setItem('num',JSON.stringify(0))
