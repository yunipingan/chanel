function nav() {
    //渲染导航栏
    var res, str4 = ''
    var xhr = new XMLHttpRequest()

    xhr.open('GET', '../lib/nav.json')

    xhr.send()

    xhr.onload = function () {
        res = JSON.parse(xhr.responseText)
        res.forEach(item => {
            str4 += `<li>
        <span>${item.team}</span>
        <div class="ol">
        `
            item.info.forEach(item2 => {
                str4 += `<div>
            <em>${item2.title}</em>
            <ul>`
                item2.detail.forEach(item3 => {
                    str4 += `<li>${item3}</li>`
                })
                str4 += `</ul>`
                str4 += `</div>`
            })
            str4 += `</div>
    </li>`
        })
        var str5 = `<li>
    <span>特别推荐</span>
</li>`
        str4 += str5
        $('.nav > ul').html(str4)
    }

}