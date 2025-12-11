const GuestBtn = document.getElementById('guest');

GuestBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('sdsd')
    localStorage.setItem('accountId','685586542773bd06b8e5c998')
    localStorage.setItem('firstVisitor','')
     window.location.href = './pages/homePage.html';
})