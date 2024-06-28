
// 重新加載資料
window.addEventListener('pageshow', function() {
    const user = loadUserData();
    if (user) {
        document.getElementById('welcomeMessage').textContent = '歡迎回來　' + user.name + '!';
        document.getElementById('TotalRank').textContent = '目前總點數: ' + user.ranks;
    }
});


// 顯示登入資訊
document.addEventListener('DOMContentLoaded', function () {
    const user = loadUserData();
    if (user) {
        document.getElementById('welcomeMessage').textContent = '歡迎回來　' + user.name + '!';
        document.getElementById('TotalRank').textContent = '目前總點數: ' + user.ranks;
    }
});



// 登出
function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    localStorage.removeItem('phoneNumber'); // 清除 localStorage
    window.location.href = "./index.html"; // 導回登入頁面
    alert("我要登出拉");
}

// 載入user data
function loadUserData() {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        console.log('Loaded user data:', userData[0]);
        return userData[0];
    }
    return null;
}



// 去展攤
function go1(){
  localStorage.setItem('range', JSON.stringify({min: 0, max: 40}));
  window.location.href = "./go1.html";
}

// 去演講
function go2(){
  localStorage.setItem('range', JSON.stringify({min: 50, max: 60}));
  window.location.href = "./go2.html";
}



// ----------------------------------------------------------------------------------------------






