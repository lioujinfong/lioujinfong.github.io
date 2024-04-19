document.addEventListener('DOMContentLoaded', function () {
    console.log("Document loaded, attempting to start QR scanner");

    function onScanSuccess(decodedText, decodedResult) {
        document.getElementById('output').textContent = decodedText;
        html5QrCode.stop().then(() => {
            console.log("QR Scanning stopped.");
        }).catch((err) => {
            console.error("Unable to stop QR scanning:", err);
        });
    }

    function onScanError(errorMessage) {
        console.error("QR scanning error:", errorMessage);
    }

    let html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
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



function checkCameraAccess() {
    // 请求摄像头访问权限
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            // 摄像头已获得授权，流正在运行
            console.log("Camera access granted.");
            stream.getTracks().forEach(track => track.stop()); // 关闭流，如果不再使用摄像头

            // 可以在这里调用其他函数，比如启动QR代码扫描
        })
        .catch((error) => {
            // 错误处理
            if (error.name === "NotAllowedError") {
                console.error("Camera access denied by user.");
                alert("Please allow camera access to use this feature.");
            } else if (error.name === "NotFoundError") {
                console.error("No camera device found.");
                alert("No camera device found.");
            } else {
                console.error("Error accessing camera: ", error);
                alert("Error accessing camera: " + error.message);
            }
        });
}

// 调用函数检查摄像头访问
checkCameraAccess();

