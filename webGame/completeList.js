
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



// 這邊只添加未完成項目
document.addEventListener('DOMContentLoaded', function() {
    const user = loadUserData();
    const completeIds = new Set(user.plan_ids);
    
    console.log(completeIds);
    
    const range = JSON.parse(localStorage.getItem('range')); // 取得範圍

    fetch('./exhibitionList.json')
    .then(response => response.json())
    .then(data => {
        const completeBody = document.getElementById('complete-table').getElementsByTagName('tbody')[0];
        data.forEach(item => {
            const itemId = parseInt(item.id, 10); 
            if (itemId >= range.min && itemId <= range.max && completeIds.has(itemId)) {
                const row = document.createElement('tr');
                row.insertCell(0).textContent = item.id;
                row.insertCell(1).textContent = item.type;
                row.insertCell(2).textContent = item.school;
                row.insertCell(3).textContent = item.plan;
                completeBody.appendChild(row);
            }
            

        });
    })
    .catch(error => console.error('Error loading the data:', error));
});
