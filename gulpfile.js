// 1.导入gulp模块
const gulp = require('gulp')
// 2，导入gulp-cssmin模块
const cssmin = require('gulp-cssmin')
// 3.导入gulp-autoprefixer模块，自动给css文件添加前缀
const autoprefixer = require('gulp-autoprefixer')
// 4.导入gulp-uglify模块
const uglify = require('gulp-uglify')
// 5.导入babel模块，将es6转换为es5(npm i -D gulp-babel)**需要下载gulp-babel,@babel/core和@babel/preset-env这三个模块**
const babel = require('gulp-babel')
// 6.导入gulp-htmlmin模块
const htmlmin = require('gulp-htmlmin')
// 7.导入del模块，删除内容
const del = require('del')
// 8.导入gulp-webserver模块
const webserver = require('gulp-webserver')

// 1.写一个打包css的函数
const cssHandler = () => {
    return gulp.src('./src/css/*.css')//找到文件
        .pipe(autoprefixer())//自动添加前缀
        .pipe(cssmin())//压缩css代码
        .pipe(gulp.dest('./dist/css'))//输出压缩后的css到指定的目录
}
// 2.写一个打包js的函数
const jsHandler = () => {
    return gulp.src('./src/js/*.js')//找到文件
        .pipe(babel({
            presets: ['@babel/env']
        }))//将es6转换为es5
        .pipe(uglify())//压缩js代码
        .pipe(gulp.dest('./dist/js'))//输出压缩后的js到指定的目录
}
// 3.写一个打包html的函数
const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')//找到文件
        .pipe(htmlmin({
            emoveAttributeQuotes: true, // 移出属性上的双引号
            removeComments: true, // 移除注释
            collapseBooleanAttributes: true, // 把值为布尔值的属性简写
            collapseWhitespace: true, // 移除所有空格, 变成一行代码
            minifyCSS: true, // 把页面里面的 style 标签里面的 css 样式也去空格
            minifyJS: true, // 把页面里面的 script 标签里面的 js 代码给去空格
        }))
        .pipe(gulp.dest('./dist/pages'))//输出压缩后的html到指定的目录
}
// 4.写一个打包img的函数
const imgHandler = () => {
    return gulp.src('./src/img/**')//找到文件
        .pipe(gulp.dest('./dist/img'))//输出到指定的目录
}
// 5.写一个打包lib的函数
const libHandler = () => {
    return gulp.src('./src/lib/**')//找到文件
        .pipe(gulp.dest('./dist/lib'))//输出到指定的目录
}
// 6.书写一个任务，自动删除dist目录
const delHandler = () => {
    return del(['./dist'])//每次压缩的时候先删除旧的dist文件夹，保证打包的内容和src的内容一样
}
// 7.书写一个配置服务器的任务
const serverHandler = () => {
    return gulp.src('./dist')//找到网站的根目录
        .pipe(webserver({
            host: 'www.milktea.com',//域名
            port: 8080,//监听的端口号
            open: './pages/index.html',//默认打开的网页
            livereload: true,//自动刷新浏览器 -> 热重启
            proxies: [
                //代理配置
                {
                    source: '/yo',//源，代理标识符
                    target: 'http://127.0.0.1/test.php'//目标，代理的地址
                },
                {
                    source: 'yo2',
                    target: 'http://127.0.0.1/xxx.php'
                }
            ]
        }))//开启服务器
}
// 8.书写一个自动监控文件的方法，文件只要有改动就会检测到
const watchHandler = () => {
    //监控下面的文件的改动，改动后要执行的任务
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/img/**', imgHandler)
    gulp.watch('./src/lib/**', libHandler)
}


module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, libHandler),
    serverHandler,
    watchHandler
)
