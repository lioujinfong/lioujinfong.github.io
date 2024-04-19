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


/*
document.addEventListener('DOMContentLoaded', function () {
    function waitForQrCodeLibrary() {
        if (typeof Html5Qrcode !== "undefined") {
            console.log("Html5Qrcode is loaded.");
            checkCameraAccess(); // Now start the camera access check
        } else {
            console.log("Html5Qrcode is not loaded yet, waiting...");
            setTimeout(waitForQrCodeLibrary, 100); // Wait for 100ms and check again
        }
    }

    waitForQrCodeLibrary();
});
*/

