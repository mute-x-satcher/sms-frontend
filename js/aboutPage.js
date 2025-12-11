import BASE_URL from "../url/base_url.js"
localStorage.setItem('firstVisitor','false');
const backBtn = document.getElementById('aboutBack')
const fmcYes = document.getElementById('fmcYes')
const thankBox = document.getElementById("thankYouBox");
console.log(backBtn)

backBtn.addEventListener('click',(e) => {
    window.location.href = 'homePage.html'
})

fmcYes.addEventListener('click',(e) => {
    console.log('fmc Yes')
    thankBox.style.display = "block"; 
    const accountId = localStorage.getItem('accountId')
const url = `${BASE_URL}/user/fmc`
const fmcVerification = true
const getClass = fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({accountId: accountId,fmcVerification})
})


getClass
.then(async (res) => {
    // setLoading(false)
    console.log('Thank you FMC Team')
    
})
.catch((err) => console.log('aboutPage.js Error',err))
// setLoading(true,'Loading Classes')

})