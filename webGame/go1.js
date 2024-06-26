
// 載入user data
function loadUserData() {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        console.log('Loaded user data:', userData[0]);
        return userData[0];
    }
    return null;
}






// 更新local user資料
function updateTaskStatus(plan_id, ranks) {
    
    const user = loadUserData();
    
    //const plan_id = 5;
    //const ranks = 1;

    let data = {
        phoneNumber: user.cellphone,
        userEmail: user.email,
        ranks: ranks,
        plan_id: plan_id
    };
    let jsonData = JSON.stringify(data);

    fetch('https://cors-anywhere.herokuapp.com/http://120.125.73.101/~05170091/webGame/api/updateUserData.php', {
        method: 'POST',
        body: jsonData,
        headers: {
            'Content-Type': 'application/json', 
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())  // 假设服务器返回 JSON 数据
    .then(data => {
        if (data.success) {  // 假设返回的 JSON 中有 success 字段
            localStorage.setItem('user', JSON.stringify(data.data));  // 假设返回的 JSON 也包含 user 信息
            alert('更新成功');
            document.getElementById('incompleteFrame').src += '';
            document.getElementById('completeFrame').src += '';
            
        } else {
            alert('更新失敗1');
        }
        console.log('data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('更新失敗2');
    });
    
}




// ---------------------------------------------------------------------------------------掃描QR CODE
let qrCodeReader;

function startQRScanner() {
    const readerElement = document.getElementById('reader');
    readerElement.style.display = "block"; // 顯示掃描器

    qrCodeReader = new Html5Qrcode("reader");

    qrCodeReader.start(
        { facingMode: "environment" }, // 使用後置攝像頭
        { fps: 10, qrbox: 250 },       // 指定每秒幀數和掃描區域的大小
        qrCodeMessage => {
            alert(qrCodeMessage);
            let parsedResult = parseScanResult(qrCodeMessage);
            console.log("攤位號碼:", parsedResult.boothNumber); // 顯示攤位號碼
            console.log("獲得積分:", parsedResult.score); // 顯示積分
            updateTaskStatus(parsedResult.boothNumber, parsedResult.score)
            
            
            stopQRScanner();
        },
        errorMessage => {
            // 掃描錯誤處理
            //console.error('QR scan error:', errorMessage);
        }
    ).catch(err => {
        //console.error('Unable to start QR scanner', err);
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

// 配置 QR 掃描器的回調函數（這些函數可選，如果你需要自定義掃描成功或錯誤處理邏輯）
function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('output').textContent = decodedText;
    stopQRScanner();
}

function onScanError(errorMessage) {
    console.log(errorMessage);
}


function parseScanResult(scanResult) {
    // 使用中文分號拆分掃描結果字符串
    let parts = scanResult.split('；');
    console.log('Parts:', parts); // 輸出看看拆分的部分是否正確

    if (parts.length < 2) {
        console.error('掃描結果格式不正確:', scanResult);
        return { boothNumber: undefined, score: undefined };
    }

    // 提取攤位號碼
    let boothPart = parts[0];
    let boothNumber = boothPart.split(' ')[1]; // 分割"展覽攤位 1"並取第二個元素
    console.log('Booth Number:', boothNumber); // 輸出攤位號碼以確認解析正確

    // 提取積分
    let scorePart = parts[1];
    let scoreWords = scorePart.trim().split(/\s+/); // 使用正則表達式分割任何空白字符
    console.log('Score Words:', scoreWords); // 輸出積分字詞以確認解析正確

    let score = scoreWords.length > 1 ? scoreWords[1] : undefined; // 確保有足夠的元素再取值
    console.log('Score:', score); // 輸出積分

    return {
        boothNumber: boothNumber,
        score: score
    };
}
