//设置cookie
function setCookie(key, value, expires) {
    // 接受三个参数
    //   key 就是你要设置的 cookie 属性名
    //   value 就是你要设置的 cookie 属性值
    //   expires 就是你要设置的 cookie 的过期时间, 单位用 秒
    //     => expires 可以不传递, 不传递的时候默认使用 session

    // 1. 判断你有没有传递 expires
    //    如果传递了就是一个数字, 没有传递就是 undefined
    if (expires) {
        var time = new Date()
        time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
        document.cookie = key + '=' + value + ';expires=' + time
    } else {
        document.cookie = key + '=' + value
    }
}
//获取cookie
function getCookie(key) {
    // 1. 准备一个 str
    str = ''
    var tmp = document.cookie.split('; ')
    for (var i = 0; i < tmp.length; i++) {
        var t = tmp[i].split('=')
        if (t[0] === key) {
            str = t[1]
        }
    }
    return str
}
