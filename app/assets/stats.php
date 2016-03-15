<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2015/10/14
 * Time: 15:40
 */
header("Content-type: text/html; charset=utf-8");

$conn = @mysql_connect("localhost", "quiz", "quiz");
if (!$conn) {
    die("连接数据库失败：" . mysql_error());
}

mysql_select_db("services", $conn);
mysql_query("set names 'utf8'");


$result = mysql_query("SELECT  testitle, name, result, create_at FROM svc_quiz order by id desc");

while ($e = mysql_fetch_object($result)) $output[] = $e;
print(json_encode($output));

mysql_free_result($result);

mysql_close();
