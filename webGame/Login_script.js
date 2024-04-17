function sendData() {
    event.preventDefault(); // 阻止表單提交
    const email = document.getElementById('email').value;
    fetch('receive.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`
    })
    .then(response => response.text())
    .then(data => {
        if(data === "True"){
          // alert("True"); // 或者用彈窗顯示服務器的響應
          localStorage.setItem('email', email);
          window.location.href = "./loginSuccess.html";
        } else{
          alert("Please check your email or password！"); // 或者用彈窗顯示服務器的響應
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending data'); // 顯示錯誤信息
    });
}