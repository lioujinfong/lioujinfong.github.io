function checkCameraAccess() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            console.log("Camera access granted.");
            stream.getTracks().forEach(track => track.stop()); // 立即停止使用摄像头

            // 确认权限后启动QR扫描
            startQRScanner();
        })
        .catch((error) => {
            console.error("Error accessing camera: ", error);
            alert("Error accessing camera: " + error.message);
        });
}

function startQRScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        decodedText => {
            document.getElementById('output').textContent = decodedText;
            html5QrCode.stop().then(() => console.log("QR Scanning stopped."));
        },
        errorMessage => {
            console.error("QR scanning error:", errorMessage);
        }
    ).catch(err => {
        console.error("Error starting QR scanner:", err);
    });
}

checkCameraAccess()
