<?php

// include(./mysql_connect.inc.php)
  

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // 檢查變量是否存在
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
        
        if($email == "j963852741s@gmail.com"){
          // echo htmlspecialchars($email);
          echo "True";
        } else {
          // echo "Not correct: " . htmlspecialchars($email);
          echo "False";
        }
        
        
    } else {
        echo "email not received";
    }
} else {
    echo "Invalid request";
}

?>