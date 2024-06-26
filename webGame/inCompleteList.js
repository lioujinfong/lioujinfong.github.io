


// 這邊只添加未完成項目
document.addEventListener('DOMContentLoaded', function() {
    const userDataStr = localStorage.getItem('user');
    const userData = JSON.parse(userDataStr);
    const completeIds = new Set(userData.completeId);

    const range = JSON.parse(localStorage.getItem('range')); // 取得範圍

    fetch('./exhibitionList.json')
    .then(response => response.json())
    .then(data => {
        const incompleteBody = document.getElementById('incomplete-table').getElementsByTagName('tbody')[0];


        data.forEach(item => {
            if (item.id >= range.min && item.id <= range.max && !completeIds.has(item.id)) {
                const row = document.createElement('tr');
                row.insertCell(0).textContent = item.id;
                row.insertCell(1).textContent = item.type;
                row.insertCell(2).textContent = item.school;
                row.insertCell(3).textContent = item.plan;
                incompleteBody.appendChild(row); // 添加到已完成表格   
            }
        });
    })
    .catch(error => console.error('Error loading the data:', error));
});
