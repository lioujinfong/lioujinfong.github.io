

let users = [];


// 加载 JSON 数据
fetch('https://api.github.com/repos/lioujinfong/lioujinfong.github.io/contents/webGame/users.json?version=' + new Date().getTime())
.then(response => response.json())
.then(data => {
    if (data.content && typeof data.content === 'string') {
        try {
            const content = JSON.parse(atob(data.content.replace(/\s/g, ''))); // 移除所有空格字符并解码
            users = content;
            console.log('Users loaded:', users);
        } catch (error){
            console.error('Error decoding the content:', error);
        }
    }
    
    
    
})
.catch(error => console.error('Error loading JSON:', error));


function checkPhoneNumber(event) {
    event.preventDefault(); // 阻止表单默认提交

    const phoneNumber = document.getElementById('phoneNumber').value;
    const data = JSON.stringify({ phoneNumber: phoneNumber });
    
    console.log('Sending phone number:', phoneNumber);

    fetch('https://cors-anywhere.herokuapp.com/http://120.125.73.101/~05170091/webGame/api/login.php', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json', 
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {  // 假设返回的 JSON 中有 success 字段
            setLoginCookie(phoneNumber); // 设置cookie
            localStorage.setItem('user', JSON.stringify(data.data));
            //alert('Login successful');
            window.location.href = "./loginSuccess.html"; // 跳转到成功页面
        } else {
            alert('Phone number does not exist. Please check your information' + phoneNumber);
        }
        console.log('data:', data);
    });

    /*
    fetch('http://120.125.73.101/~05170091/webGame/api/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // 假设服务器返回 JSON 数据
    .then(data => {
        if (data.success) {  // 假设返回的 JSON 中有 success 字段
            setLoginCookie(phoneNumber); // 设置cookie
            localStorage.setItem('user', JSON.stringify(data.data));  // 假设返回的 JSON 也包含 user 信息
            //alert('Login successful');
            window.location.href = "./loginSuccess.html"; // 跳转到成功页面
        } else {
            alert('Phone number does not exist. Please check your information');
        }
        console.log('data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
    */
}


// 設定cookie-- 目前將username設定為phoneNumber
function setLoginCookie(username) {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + (24*60*60*1000)); // Cookie 有效期設為1天
    const expires = "expires=" + expiration.toUTCString();
    document.cookie = "username=" + username + ";" + expires + ";path=/";
}


// 檢查cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function checkLogin() {
    const user = getCookie("username");
    if (user) {
        alert("Welcome back, " + user);
        window.location.href = "./loginSuccess.html"; // 導向到主頁面
    }
}
