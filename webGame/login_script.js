

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
    event.preventDefault(); // 阻止表單提交
    const phoneNumber = document.getElementById('phoneNumber').value;
    const user = users.find(user => user.phoneNumber == phoneNumber);
    
    if (user) {
        //alert('phoneNumber exists!');
        setLoginCookie(phoneNumber); // 設定cookie
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "./loginSuccess.html";
    } else {
        alert('Phone number does not exist. Please check your information');
    }
}



function checkPhoneNumber(event) {
    event.preventDefault(); // 阻止表單提交
    const phoneNumber = document.getElementById('phoneNumber').value;
    const user = users.find(user => user.phoneNumber == phoneNumber);
    
    if (user) {
        //alert('phoneNumber exists!');
        setLoginCookie(phoneNumber); // 設定cookie
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "./loginSuccess.html";
    } else {
        alert('Phone number does not exist. Please check your information');
    }
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