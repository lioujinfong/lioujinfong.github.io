<?php
header('Content-Type: application/json');



$phoneNumber = $_POST['phoneNumber'];
$phoneNumber = ltrim($phoneNumber, '0');

//$phoneNumber = "926354120";

include("connect_Database.php");



$stmt = $con->prepare("
    SELECT users.*, userRecord.plan_id
    FROM users 
    LEFT JOIN userRecord ON users.cellphone = userRecord.cellphone
    WHERE users.cellphone = ?
");

//$stmt = $con->prepare("SELECT * FROM users WHERE cellphone = ?");

$stmt->bind_param("s", $phoneNumber);
$stmt->execute();
$result = $stmt->get_result();



$usersData = []; // 创建一个数组来存储所有用户数据

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


?>