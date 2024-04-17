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
