
// 登出
function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem('phoneNumber'); // 清除 localStorage
    window.location.href = "./index.html"; // 導回登入頁面
    alert("我要登出拉");
}

// 載入user data
function loadUserData() {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        console.log('Loaded user data:', userData);
        return userData;
    }
    return null;
}

// 顯示登入資訊
document.addEventListener('DOMContentLoaded', function () {
    const user = loadUserData();
    if (user) {
        document.getElementById('welcomeMessage').textContent = 'Welcome back, ' + user.phoneNumber + '!';
        document.getElementById('TotalRank').textContent = '目前總點數: ' + user.ranks;
    }
});


// 去展攤
function go1(){
  localStorage.setItem('range', JSON.stringify({min: 0, max: 40}));
  window.location.href = "./go1.html";
}

// 去演講
function go2(){
  localStorage.setItem('range', JSON.stringify({min: 50, max: 60}));
  window.location.href = "./go2.html";
}




// 更新local user資料
function updateTaskStatus() {
    
    const userDataStr = localStorage.getItem('user');
    const userData = JSON.parse(userDataStr);
    
    const qrCodeValueTest = 2;
    

    // 从未完成中移除
    const index = userData.inCompleteId.indexOf(qrCodeValueTest);
    if (index > -1) {
        
        userData.inCompleteId.splice(index, 1); // 移除
        userData.completeId.push(qrCodeValueTest);  // 添加到已完成
        userData.ranks += 1;
        
        // 將更新後的值寫回local的user Data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // 更新清單
        document.getElementById('incompleteFrame').src += '';
        document.getElementById('completeFrame').src += '';
        
        
        // 要更改最原始的users.json
        updataAllUser(userData);
    } else {
        alert('ID not found in inCompleteId');
        console.log("ID not found in inCompleteId");
    }
}


// ----------------------------------------------- 測試更新github上的json file
// 更新總檔案資料
function updataAllUser(userData){
    const username = 'lioujinfong';
    const repo = 'lioujinfong.github.io';
    const path = 'webGame/users.json';
    const token = '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';
    
    // 获取文件内容和SHA
    fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.content && typeof data.content === 'string') {
            try {
                const content = JSON.parse(atob(data.content.replace(/\s/g, ''))); // 移除所有空格字符并解码
                const sha = data.sha;
            
                // 查找 phoneNumber
                const user = content.find(user => user.phoneNumber === userData.phoneNumber);
                if (user) {
                    user.inCompleteId = userData.inCompleteId; // 假设你想把 ranks 更新为 10
                    user.completeId = userData.completeId;
                    user.ranks = userData.ranks;
                }
            
                // 准备提交更新
                return fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: 'Update for' + userData.phoneNumber,
                        content: btoa(JSON.stringify(content)), // Base64 编码的新文件内容
                        sha: sha  // 文件的原始 SHA
                    })
                });
            } catch (error) {
                console.error('Error decoding the content:', error);
            }
        }
        
    })
    .then(response => response.json())
    .then(data => console.log('File updated successfully:', data))
    .catch(error => console.error('Error updating file:', error));
}


// ----------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------掃描QR CODE
// 開始掃描
function startQRScanner() {
    const qrCodeReader = new Html5Qrcode("reader");
    const readerElement = document.getElementById('reader');
    readerElement.style.display = "block"; // 顯示掃描器

    qrCodeReader.start(
      { facingMode: "environment" }, // 使用後置攝像頭
      { fps: 10, qrbox: 250 },       // 指定每秒幀數和掃描區域的大小
      qrCodeMessage => {
          // 掃描到的數據處理
          document.getElementById('output').textContent = qrCodeMessage;
          qrCodeReader.stop().then(() => {
            readerElement.style.display = "none"; // 掃描完畢隱藏掃描器
          }).catch(err => {
            console.error('Error stopping the QR scanner', err);
          });
      },
      errorMessage => {
          // 掃描錯誤處理
          console.error('QR scan error:', errorMessage);
      }
    ).catch(err => {
        console.error('Unable to start QR scanner', err);
    });
}

function stopQRScanner() {
    if (qrCodeReader) {
        qrCodeReader.stop().then(() => {
            document.getElementById('reader').style.display = "none";
        }).catch(err => {
            console.error('Error stopping the QR scanner', err);
        });
    }
}


// QRcode script
function onScanSuccess(decodedText, decodedResult) {
    // 使用解码文本，例如将其显示在页面上
    document.getElementById('output').textContent = decodedText;
    // 可以选择停止扫描
    html5QrCode.stop().then(() => {
        console.log("QR Scanning stopped.");
    }).catch((err) => {
        console.log("Unable to stop QR scanning.");
    });
}

function onScanError(errorMessage) {
    // 处理扫描过程中的错误
    console.log(errorMessage);
}

// 配置 QR 扫描器
let html5QrCode = new Html5Qrcode("reader");
html5QrCode.start(
    { facingMode: "environment" }, // 使用后置摄像头
    {
        fps: 10,    // 每秒帧数
        qrbox: { width: 250, height: 250 } // 扫描区域大小
    },
    onScanSuccess,
    onScanError
).catch((err) => {
    console.error(err);
});





