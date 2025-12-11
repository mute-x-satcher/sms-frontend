import appendClass from "../components/appendClass.js"
import setLoading from "../components/setLoading.js"
import BASE_URL from "../url/base_url.js"

window.onload = function () {
      if (!window.location.hash.includes('#reloaded')) {
        window.location.href += '#reloaded';
        window.location.reload();
      }
    };

// localStorage.removeItem('currentClass')
// localStorage.removeItem('currentStudentsArray')
// localStorage.removeItem('currentStudent')


function fetchClasses(){
setLoading(true,'Loading Classes')
const accountId = localStorage.getItem('accountId')
const url = `${BASE_URL}/class/get`
const getClass = fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({accountId: accountId})
})


getClass
.then(async (res) => {
    setLoading(false)
    const data = await res.json()
    const {allClassInfo} = data
    localStorage.setItem('AllClasses',JSON.stringify(allClassInfo))
    appendClass(allClassInfo)   
})
.catch((err) => console.log('homePage.js Error',err))

}

fetchClasses()



const createBtn = document.querySelector('#createClass')
const settingIcon = document.querySelector('#setting-icon')
const aboutBtn = document.querySelector('#about')
const logoutBtn = document.createElement('button')
logoutBtn.innerText = 'Logout'

const menuContainer = document.createElement('span')
menuContainer.className = 'menu-container'

const menuButton = document.createElement('img')
menuButton.className = 'menu-button'
menuButton.src = '../assets/menu.png'

const menuDropDown = document.createElement('span')
menuDropDown.id = 'menuDropdown'
menuDropDown.className = 'menu-dropdown hidden'

logoutBtn.addEventListener('click',(e) => {
    localStorage.removeItem('authToken')
    window.location.href = '../index.html'
}) 


menuDropDown.appendChild(logoutBtn)

 menuButton.addEventListener('click',(e)=>{
    e.stopPropagation()
    menuDropDown.classList.toggle('hidden')
})

document.addEventListener('click',()=>{
    menuDropDown.classList.add('hidden')
})

    menuContainer.appendChild(menuButton)
    menuContainer.appendChild(menuDropDown)
    settingIcon.appendChild(menuContainer)


createBtn.addEventListener('click',(event)=>{
    window.location.href = './classPages/createClass.html'
})

aboutBtn.addEventListener('click',(e) => {
    window.location.href = 'aboutPage.html'
})


