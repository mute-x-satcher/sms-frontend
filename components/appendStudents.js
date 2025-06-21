import showMessage from './showMessage.js'
import setLoading from './setLoading.js'
import deleteAsk from './deleteAsk.js'
import BASE_URL from '../url/base_url.js'

const appendStudents = (allStudents) => {
    
const studentContainer = document.querySelector('.student-container')


allStudents.map((student) => {
const mainCard = document.createElement('div')
mainCard.id = student.rollNumber
mainCard.dataset.name = student.studentName
mainCard.className = 'student-card'

const menuContainer = document.createElement('span')
menuContainer.className = 'menu-container'

const menuButton = document.createElement('img')
menuButton.className = 'menu-button'
menuButton.src = '../../assets/three-dots.png'

const menuDropDown = document.createElement('span')
menuDropDown.id = 'menuDropdown'
menuDropDown.className = 'menu-dropdown hidden'

// const actionsDiv = document.createElement('div')
// actionsDiv.className = 'card-actions'

menuButton.addEventListener('click',(e)=>{
    e.stopPropagation()
    menuDropDown.classList.toggle('hidden')
})

document.addEventListener('click',()=>{
    menuDropDown.classList.add('hidden')
})

const updateBtn = document.createElement('button')
updateBtn.textContent = 'Update'
updateBtn.id = student.rollNumber
updateBtn.addEventListener('click',(event) => {
    event.stopPropagation()
    const studentId = event.target.id
    const currentStudent = allStudents.find((student) => student.rollNumber == studentId)
    localStorage.setItem('currentStudent', JSON.stringify(currentStudent))
    window.location.href = 'studentUpdatePage.html'
})


const deleteBtn = document.createElement('button')
deleteBtn.textContent = 'Delete'
deleteBtn.id = student._id
deleteBtn.addEventListener('click', (event) => {
  event.stopPropagation()
  const deleteFunc = () => {
    setLoading(true,'Deleting Student')
    const studentId = event.target.id
    const url = `${BASE_URL}/student/delete`
    const query = {studentId}
    const deleteStudent = fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })

    deleteStudent
    .then(async (res) => {
    setLoading(false)
    const data = await res.json()
    showMessage(data.msg,'success')
    location.reload()
    })
    .catch((err) => console.log(`appendStudent.js Error: ${err}`))

}
    
deleteAsk(deleteFunc,'student')

})

menuDropDown.appendChild(updateBtn)
menuDropDown.appendChild(deleteBtn)


menuContainer.appendChild(menuButton)
menuContainer.appendChild(menuDropDown)

mainCard.appendChild(menuContainer)

const nameDiv = document.createElement('div')
const rollDiv = document.createElement('div')
const absentDiv = document.createElement('div')
const lable = document.createElement('div')



nameDiv.textContent = `${student.studentName}`
rollDiv.textContent = `Roll No: ${student.rollNumber}`
absentDiv.textContent = `Absent Count: ${student.absentCount}`
lable.textContent = 'Parent Contacts:'

mainCard.appendChild(nameDiv)
mainCard.appendChild(rollDiv)
mainCard.appendChild(absentDiv)
mainCard.appendChild(lable)

student.parentContacts?.map((number,index)=>{
    if(number){
        const callDiv = document.createElement('div')
        callDiv.className = 'call-container'
        const phoneSpan = document.createElement('span')
        phoneSpan.textContent = `${number}`
        const callLink = document.createElement('a')
        callLink.href = `tel:+91${number}`
        callLink.className = 'call-button'
        callLink.textContent = 'Call'
        callDiv.appendChild(phoneSpan)
        callDiv.appendChild(callLink)
        mainCard.appendChild(callDiv)
    }
})

studentContainer.appendChild(mainCard)


})

}

export default appendStudents