function startApp() {
    window.location.href = '/Mindmania/menu.html'; 
}

function exitApp() {
    if (confirm('Are you sure you want to exit?')) {
        window.close(); 
    }
}

document.body.addEventListener('mouseover', () => {
    document.body.style.backgroundColor = '#E7BF80';
});

document.body.addEventListener('mouseout', () => {
    document.body.style.backgroundColor = '#D9AB57';
});