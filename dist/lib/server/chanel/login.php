<?php
    header("Access-Control-Allow-Origin:*"); // 允许哪些域名请求我
    header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS"); // 允许哪些请求方式
    header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid'); // 允许携带哪些请求头信息

    header('content-type:text/html;charset:utf-8;');

    $loname = $_POST['username'];
    $lopass = $_POST['password'];
    $arr = [];

    $link = mysqli_connect('localhost','root','root','chanel');

    $res = mysqli_query($link,"SELECT * FROM `user` WHERE `username`='$loname' AND `password`='$lopass'");
    
    $row = mysqli_fetch_all($res,MYSQLI_ASSOC);

    if($row){
        $arr = ["code"=>"1","message"=>"登录成功！"];
        print_r(json_encode($arr));
    }else{
        $arr = ["code"=>"0","message"=>"用户名或者密码错误！"];
        print_r(json_encode($arr));
    }

    mysqli_close($link);
?>