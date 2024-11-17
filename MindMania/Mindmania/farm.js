let dailyTask1 = 0;
let dailyTask2 = 0;
let weeklyTask1 = 0;
let weeklyTask2 = 0;
let referrals = []; 

function handleIconClick(iconName) {
    alert('You clicked on the ' + iconName + ' icon.');
}

function showTONWallet() {
    document.getElementById('ton-wallet-output').innerHTML = `
        <img src="/photos/ton.png" alt="TON Logo" class="logo">
        <p>Connect TON Wallet</p>
    `;
}

function showTaskList() {
    document.getElementById('ton-wallet-output').innerHTML = `
        <div class="task-list">
            <h3>Daily Tasks:</h3>
            <p>Answer 5 riddles <span id="dailyTask1">${dailyTask1}/5</span></p>
            <p>Answer 10 riddles <span id="dailyTask2">${dailyTask2}/10</span></p>
            <h3>Weekly Tasks:</h3>
            <p>Answer 15 riddles <span id="weeklyTask1">${weeklyTask1}/15</span></p>
            <p>Answer 20 riddles <span id="weeklyTask2">${weeklyTask2}/20</span></p>
            <button onclick="completeTask()">Complete Task</button> <!-- Simulate task completion -->
        </div>
    `;
}

function completeTask() {
    if (dailyTask1 < 5) dailyTask1++;
    if (dailyTask2 < 10) dailyTask2++;
    if (weeklyTask1 < 15) weeklyTask1++;
    if (weeklyTask2 < 20) weeklyTask2++;

    document.getElementById('dailyTask1').innerText = `${dailyTask1}/5`;
    document.getElementById('dailyTask2').innerText = `${dailyTask2}/10`;
    document.getElementById('weeklyTask1').innerText = `${weeklyTask1}/15`;
    document.getElementById('weeklyTask2').innerText = `${weeklyTask2}/20`;
}

function showReferralList() {
    let referralOutput = '<div class="referral-list"><h3>Referral List:</h3>';
    if (referrals.length === 0) {
        referralOutput += '<p>No referrals</p>';
    } else {
        referrals.forEach(referral => {
            referralOutput += `<p>${referral}</p>`;
        });
    }
    referralOutput += '</div>';
    document.getElementById('ton-wallet-output').innerHTML = referralOutput;
}

function goBack() {
    window.location.href = '/Mindmania/Menu.html'; 
}