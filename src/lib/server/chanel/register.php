<?php
    header("Access-Control-Allow-Origin:*"); // 允许哪些域名请求我
    header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS"); // 允许哪些请求方式
    header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid'); // 允许携带哪些请求头信息

    header('content-type:text/html;charset:utf-8;');

    $uname = $_POST['username'];
    $upsd = $_POST['password'];

    $arr = [];

    $link = mysqli_connect('localhost','root','root','chanel');

    $res1 = mysqli_query($link,"SELECT `username` FROM `user` WHERE `username`='$uname'");
    // $res1 = mysqli_query($link,'SELECT * FROM `user`');

    $row1 = mysqli_fetch_all($res1,MYSQLI_ASSOC);

    // print_r(json_encode($row1));

    if($row1){
        $arr =["code"=>"0","message"=>"你已经注册了，请登录！"];
        print_r(json_encode($arr));
    }else{
        $res2 = mysqli_query($link,"INSERT INTO `user` (`username`,`password`) VALUES ('$uname','$upsd')");
        if($res2){
            $arr = ["code"=>"1","message"=>"注册成功！"];
            print_r(json_encode($arr));
        }
    }

    mysqli_close($link);
?>