import showMessage from '../../components/showMessage.js'
import deleteAsk from '../../components/deleteAsk.js'
import setLoading from '../../components/setLoading.js'
import BASE_URL from '../../url/base_url.js'
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()


const updateBtn = document.querySelector('#updateBtn')
const deleteBtn = document.querySelector('#deleteBtn')

const className = document.querySelector('#className')
const standard = document.querySelector('#standard')
const groupName = document.querySelector('#groupName')

const classData = JSON.parse(localStorage.getItem('currentClass'))

className.textContent = classData.className
standard.textContent = classData.standard
groupName.textContent = classData.groupName


updateBtn.addEventListener('click',(event) => {
    window.location.href = 'classUpdatePage.html'
})

deleteBtn.addEventListener('click',(event) =>{
    const deleteFunc = () => {        
    setLoading(true,'Deleting Class')
    const url = `${BASE_URL}/class/delete`
    const classId = classData._id
    const query = {classId}
    const deleteClass = fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })

    deleteClass
    .then(async (res) => {
        setLoading(false)
        const data = await res.json()
        window.location.href = '../homePage.html'
        showMessage(data.msg,"success")
    })
    .catch((err) => console.log(`classSetting Error: ${err}`))
    }

    deleteAsk(deleteFunc,'class')


})