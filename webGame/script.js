document.addEventListener('DOMContentLoaded', function () {
    function onScanSuccess(decodedText, decodedResult) {
        document.getElementById('output').textContent = decodedText;
        html5QrCode.stop().then(() => {
            console.log("QR Scanning stopped.");
        }).catch((err) => {
            console.log("Unable to stop QR scanning.");
        });
    }

    function onScanError(errorMessage) {
        console.log(errorMessage);
    }

    // 配置 QR 扫描器
    let html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" }, // 使用后置摄像头
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanError
    ).catch((err) => {
        console.error("Error starting QR scanner:", err);
    });
});
