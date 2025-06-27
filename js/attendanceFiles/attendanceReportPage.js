import showMessage from "../../components/showMessage.js"
import deleteAsk from "../../components/deleteAsk.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const reportData = JSON.parse(localStorage.getItem('currentAttendanceReport'))

const studentHolder = document.querySelector('#studentHolder') 
const dateBar = document.querySelector('#date')
const backBtn = document.querySelector('button')
const settingIcon = document.querySelector('#setting-icon')
const updateBtn = document.createElement('button')
const deleteBtn = document.createElement('button')
const pdfBtn = document.createElement('button')
const searchInput = document.querySelector('#searchInput')

updateBtn.innerText = 'Update'
pdfBtn.innerText = 'PDF'
deleteBtn.innerText = 'Delete'

const menuContainer = document.createElement('span')
menuContainer.className = 'menu-container'

const menuButton = document.createElement('img')
menuButton.className = 'menu-button'
menuButton.src = '../../assets/menu.png'

const menuDropDown = document.createElement('span')
menuDropDown.id = 'menuDropdown'
menuDropDown.className = 'menu-dropdown hidden'


    updateBtn.addEventListener('click',(e) => {
        window.location.href = 'attendanceUpdatePage.html'
        })
    pdfBtn.addEventListener('click',(e) => {
        // localStorage.setItem('currentPDF',reportData.pdfURL)
        window.location.href = 'attendancePDFPage.html'
    })    

        deleteBtn.addEventListener('click',(e) => {
        const deleteFunc = () => {
            setLoading(true,'Deleting Attendance Report')    
            const reportData = JSON.parse(localStorage.getItem('currentAttendanceReport'))
            const reportId = reportData._id
            const query = {reportId}
            const url = `${BASE_URL}/attendance/delete`
            const deleteReport = fetch(url,{
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(query)
            })

            deleteReport
            .then(async (res) => {
                setLoading(false)
                const data = await res.json()
                showMessage(data.msg,'success')
                console.log("HI deleted")
                window.location.href = 'attendancePage.html'
            })
            .catch((err) =>{ 
                showMessage(data.msg,'error')
                console.log(`attendanceReportPage.js Error: ${err}`)})
        }

        deleteAsk(deleteFunc,'Attendacne Report')
    })

    menuDropDown.appendChild(updateBtn)
    menuDropDown.appendChild(pdfBtn)
    menuDropDown.appendChild(deleteBtn)

    

backBtn.addEventListener('click',(e) => {
    window.location.href = 'attendancePage.html'
})


const studetnsAttendace = reportData.attendance
const pdfURL = reportData.pdfURL
const date = reportData.reportDate
const url = pdfURL; // Replace this with your actual PDF file path

    menuButton.addEventListener('click',(e)=>{
    e.stopPropagation()
    menuDropDown.classList.toggle('hidden')
})

document.addEventListener('click',()=>{
    menuDropDown.classList.add('hidden')
})

    dateBar.innerText = date
    menuContainer.appendChild(menuButton)
    menuContainer.appendChild(menuDropDown)
    settingIcon.appendChild(menuContainer)


studetnsAttendace.map((student) => {

    const studentCard = document.createElement('div')
    const studentName = document.createElement('div')
    const studentRollNumber = document.createElement('div')
    const studentStatus = document.createElement('div')
    studentName.textContent = `${student.studentName}`
    studentStatus.textContent = `Status: ${student.status}`
    studentRollNumber.textContent = `Roll No: ${student.rollNumber}`
    studentCard.className = 'student-card'
    studentCard.id = student.rollNumber
    studentCard.dataset.name = student.studentName
    studentCard.appendChild(studentName)
    studentCard.appendChild(studentRollNumber)
    studentCard.appendChild(studentStatus)
   
    if(student.status == 'present'){
        studentCard.classList.add('present-student')
    }else if(student.status == 'leave'){
        studentCard.classList.add('leave-student')
    }
    else{
        studentCard.classList.add('absent-student')
    }

    studentHolder.appendChild(studentCard)
})


const AllStudentCards = document.querySelectorAll('.student-card')
searchInput.addEventListener('input',(e) => {
    const currentInput = e.target.value.toLowerCase()
    AllStudentCards.forEach((card) => {
        if(card.id == currentInput || card.dataset.name.toLowerCase().includes(currentInput)){
            card.style.display = ''
        }else{
            card.style.display = 'none'
        }
    })    

})