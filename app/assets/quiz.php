<?php

$conn = @mysql_connect("localhost","quiz","quiz");
if (!$conn){
    die("连接数据库失败：" . mysql_error());
}

//CREATE TABLE svc_quiz (
//id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
//testitle VARCHAR(200) NOT NULL,
//name VARCHAR(100) NOT NULL,
//result TEXT NOT NULL,
//create_at TIMESTAMP (14),
//PRIMARY KEY (id)
//)

mysql_select_db("services", $conn);
mysql_query("set names 'utf8'");

$testitle = mysql_real_escape_string($_POST['testitle']) . ' 2016-03-15';
$username = mysql_real_escape_string($_POST['username']);
$result = mysql_real_escape_string($_POST['result']);

//$today = date("Ymd-H:m:s");

$sql = "INSERT INTO svc_quiz(testitle, name, result, create_at) VALUES ( '$testitle' , '$username', '$result', NOW())";

if(!mysql_query($sql,$conn)){
    die("错误: " . mysql_error());
//    header( 'Location: erro.html' ) ;
} else {
//    echo '$sql';
}
mysql_close();
