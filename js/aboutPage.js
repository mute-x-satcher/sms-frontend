localStorage.setItem('firstVisitor','false');
const backBtn = document.getElementById('aboutBack')
console.log(backBtn)

backBtn.addEventListener('click',(e) => {
    window.location.href = 'homePage.html'
})