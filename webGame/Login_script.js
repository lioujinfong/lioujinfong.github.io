

let users = [];

// 加载 JSON 数据
fetch('users.json')
.then(response => response.json())
.then(data => {
    users = data;
    console.log('Users loaded:', users);
})
.catch(error => console.error('Error loading JSON:', error));


function checkEmail() {
    event.preventDefault(); // 阻止表單提交
    const email = document.getElementById('email').value;
    const exists = users.some(user => user.email === email);
    if (exists) {
        localStorage.setItem('userEmail', email);
        window.location.href = "./loginSuccess.html";
    } else {
        alert('Email does not exist. Please check your email or password!');
    }
}
