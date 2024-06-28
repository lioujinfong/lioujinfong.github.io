<?php

header('Content-Type: application/json');

$userEmail = $_POST['userEmail'];
$ranks = $_POST['ranks'];
$plan_id = $_POST['plan_id'];

$phoneNumber = $_POST['phoneNumber'];
$phoneNumber = ltrim($phoneNumber, '0');

include("connect_Database.php");

//$phoneNumber = "926354120";
//$ranks = 1;
//$plan_id = 2;

if(strlen($phoneNumber) > 0 ){

  // 先塞入record資料表
  $stmt = $con->prepare("INSERT INTO userRecord (cellphone, rank, plan_id) VALUES (?, ?, ?)");
  $stmt->bind_param("sis", $phoneNumber, $ranks, $plan_id);   
  $stmt->execute();
  
  
  // 再更新總資料表
  $stmt = $con->prepare("SELECT * FROM users WHERE cellphone = ?");
  $stmt->bind_param("s", $phoneNumber);
  $stmt->execute();
  $result = $stmt->get_result();
  
  $response = [];
  
  // 檢查查詢結果
  if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $TotalRanks = $row['ranks'];
  }
  
  
  
  $ranks_new = $TotalRanks + $ranks;
  //echo $ranks_new;
  
  $stmt = $con->prepare("UPDATE users SET ranks = ?  WHERE cellphone = ?");
  $stmt->bind_param("is", $ranks_new, $phoneNumber);  // 's' 对应字符串，'i' 对应整数，'s' 对应字符串
  $stmt->execute();
  
  
  $stmt = $con->prepare("
    SELECT users.*, userRecord.plan_id
    FROM users 
    LEFT JOIN userRecord ON users.cellphone = userRecord.cellphone
    WHERE users.cellphone = ?
  ");

  $stmt->bind_param("s", $phoneNumber);
  $stmt->execute();
  $result = $stmt->get_result();
  
  $response = [];
  
  // 检查查询结果
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $cellphone = $row['cellphone'];
      if (!array_key_exists($cellphone, $usersData)) {
          $row['plan_ids'] = [];  // 初始化空的 plan_ids 数组
          $usersData[$cellphone] = $row; // 将用户信息存入数组
      }
      if ($row['plan_id'] !== null) {
          $usersData[$cellphone]['plan_ids'][] = $row['plan_id'];
      }
      unset($usersData[$cellphone]['plan_id']); // 移除单独的 plan_id 字段
    }
    // 输出包含用户数据和所有关联的 plan_id 的数组
    echo json_encode(['success' => true, 'data' => array_values($usersData)]);
  } else {
      echo json_encode(['success' => false, 'message' => 'No data found.']);
  }
  
  $stmt->close();
  $con->close();
}








?>
  