<?php


$json = file_get_contents('php://input');
  $userData = json_decode($json, true); // 解析 JSON 数据为 PHP 数组
  
  // 指定 JSON 文件路径
  $filePath = './users.json';
  
  // 读取现有的 JSON 文件
  if (file_exists($filePath)) {
    $currentData = json_decode(file_get_contents($filePath), true);
    // 查找 phoneNumber，并更新数据
    $user['ranks'] = 5;
    // 保存更新后的数据回 JSON 文件
    file_put_contents($filePath, json_encode($currentData));
    echo json_encode(["message" => "File updated successfully"]);
  } else {
    echo json_encode(["error" => "File not found"]);
  }
  
  
  /*
  
  
  
  // 确认请求的方法是 POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 获取 JSON 从 HTTP 请求体
  $json = file_get_contents('php://input');
  $userData = json_decode($json, true); // 解析 JSON 数据为 PHP 数组
  
  // 指定 JSON 文件路径
  $filePath = './users.json';
  
  // 读取现有的 JSON 文件
  if (file_exists($filePath)) {
    $currentData = json_decode(file_get_contents($filePath), true);
    // 查找 phoneNumber，并更新数据
    $user['ranks'] = 5;
    foreach ($currentData as &$user) {
      if ($user['phoneNumber'] == $userData['phoneNumber']) {
        //$user['inCompleteId'] = $userData['inCompleteId'];
        //$user['completeId'] = $userData['completeId'];
        $user['ranks'] = 5;
        break;
      }
    }
    // 保存更新后的数据回 JSON 文件
    file_put_contents($filePath, json_encode($currentData));
    echo json_encode(["message" => "File updated successfully"]);
  } else {
    echo json_encode(["error" => "File not found"]);
  }
} else {
  echo json_encode(["error" => "Invalid request method"]);
}



*/
?>
  
