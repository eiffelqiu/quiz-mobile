<?php

$conn = @mysql_connect("localhost", "quiz", "quiz");
if (!$conn){
    die("�������ݿ�ʧ�ܣ�" . mysql_error());
}

//CREATE TABLE quiz (
//id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
//testitle VARCHAR(100) NOT NULL,
//name VARCHAR(50) NOT NULL,
//result TEXT NOT NULL,
//PRIMARY KEY (id)
//)

mysql_select_db("services", $conn);
mysql_query("set names 'utf8'");

$testitle = mysql_real_escape_string($_POST['testitle']);
$username = mysql_real_escape_string($_POST['username']);
$result = mysql_real_escape_string($_POST['result']);

$sql = "INSERT INTO quiz(testitle, name, result) VALUES ( '$testitle' , '$username', '$result')";

if(!mysql_query($sql,$conn)){
    die("����: " . mysql_error());
}

mysql_close();