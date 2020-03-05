//获取非内联样式
function getStyle(ele, attr) {
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele)[attr];
    }
    else {
        style = ele.currentStyle[attr];
    }
    return style;
}


class Enlarge {
    constructor(ele){
        this.ele = document.querySelector(ele);
        this.init();
    }
    init(){
        //获取需要操作的元素
        this.show = this.ele.querySelector('.show');
        this.mask = this.ele.querySelector('.mask');
        this.enlarge = this.ele.querySelector('.enlarge');

        //鼠标移入show盒子，显示mask和enlarge
        this.show.onmouseover = () =>{
            this.mask.style.display = this.enlarge.style.display = 'block';
            this.setStyle();
            this.move();
        }

        //鼠标移出show盒子，隐藏mask和enlarge
        this.show.onmouseout = () =>{
            this.mask.style.display = this.enlarge.style.display = 'none';
        }

        //获取小图的标签，并且绑定点击事件
        // this.p = this.ele.querySelector('.list').children;
        // let _this = this;
        // for(let i=0;i<this.p.length;i++){
        //     this.p[i].onclick = function(){
        //         _this.change(this);
        //     }
        // }
    }

    setStyle(){
        // 设置放大镜盒子的大小
        // 放大镜盒子的大小 = 遮罩层盒子的大小 * 放大镜盒子背景图的大小 / show盒子的大小

        //遮罩层盒子的大小
        this.maskWidth = this.mask.offsetWidth;
        this.maskHeight = this.mask.offsetHeight;

        //放大镜盒子背景图的大小
        this.bgx = parseInt(getStyle(this.enlarge,'background-size').split(' ')[0]);
        this.bgy = parseInt(getStyle(this.enlarge,'background-size').split(' ')[1]);

        //show盒子的大小
        this.showWidth = this.show.offsetWidth;
        this.showHeight = this.show.offsetHeight;

        //放大镜盒子的大小
        let enlargeX = this.maskWidth * this.bgx / this.showWidth;
        let enlargeY = this.maskHeight * this.bgy / this.showHeight;

        this.enlarge.style.width = enlargeX + 'px';
        this.enlarge.style.height = enlargeY + 'px';
    }

    //改变遮罩层的位置 和 放大镜背景图的位置
    move(){
        this.show.onmousemove = (e)=>{
            let left = e.clientX - this.ele.offsetLeft - this.maskWidth / 2;
            let top = e.clientY - this.ele.offsetTop - this.maskHeight / 2;

            //边界值的判断
            if(left <=0 ){
                left = 0;
            }
            if(left >= this.showWidth - this.maskWidth){
                left = this.showWidth - this.maskWidth;
            }
            if(top <= 0){
                top = 0;
            }
            if(top >= this.showHeight -this.maskHeight){
                top =this.showHeight -this.maskHeight;
            }

            //移动遮罩层
            this.mask.style.left = left + 'px';
            this.mask.style.top = top + 'px';

            // 移动背景图
            //  背景图移动的距离 = 背景图 * mask移动距离 / show盒子的大小
            let bgPX = this.bgx * left / this.showWidth;
            let bgPY = this.bgy * top / this.showHeight;
            this.enlarge.style.backgroundPosition = `-${bgPX}px -${bgPY}px`;
        }
    }
    // change(ele){
    //     //排他思想，清除缩略图样式
    //     for(let j= 0;j<this.p.length;j++){
    //         this.p[j].classList.remove('active');
    //     }
    //     ele.classList.add('active');
    //     let img = ele.getAttribute('img');//show盒子显示的图片
    //     let bigImg = ele.getAttribute('bigImg');//放大镜的背景图

    //     //获取show盒子下面的img图片
    //     this.img = this.show.querySelector('img');

    //     // 给show盒子下面的img图片设置src属性的属性值
    //     this.img.setAttribute('src',img);
    //     this.enlarge.style.backgroundImage = `url(${bigImg})`;
    // }
}