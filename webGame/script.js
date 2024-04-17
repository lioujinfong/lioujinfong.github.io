const loginForm = document.querySelector('.login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const defaultEmailsList = document.getElementById('defaultEmails');
const alertElement = document.querySelector('.alert'); // Corrected element ID
const userEmailElement = document.getElementById('user-email'); // Corrected element ID

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

  const email = emailInput.value;
  const password = passwordInput.value;

  // 簡單的驗證 (實際上應使用伺服器端驗證)
  if (email === 'test@example.com' && password === '123456') {
    // 登入成功
    window.location.href = 'loginSuccess.html'; // 跳到下一個頁面
  } else {
    // 登入失敗
    alertElement.textContent = '登入失敗，請檢查您的帳號密碼';
  }
});

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search); // Corrected URLSearchParams usage
  const email = urlParams.get('email'); // Corrected URL parameter name

  if (email) {
    userEmailElement.textContent = email;
  }
};



// ---------------------------------------------------------------------------------------
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



