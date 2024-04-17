
<?php
  //資料庫設定
  //資料庫位置
  $db_server = "localhost";
  //資料庫名稱
  $db_name = "05170091";
  //資料庫管理者帳號
  $db_user = "05170091";
  //資料庫管理者密碼
  $db_passwd = "05170091";
  
  //對資料庫連線
  if(mysql_connect($db_server, $db_user, $db_passwd)) die("無法對資料庫連線");
  
  //資料庫連線採UTF8
  mysql_query("SET NAMES utf8");
  
  
  echo "???";
  
?> 