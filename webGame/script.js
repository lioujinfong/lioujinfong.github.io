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



