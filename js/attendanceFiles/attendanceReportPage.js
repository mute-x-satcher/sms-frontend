import showMessage from "../../components/showMessage.js"
import deleteAsk from "../../components/deleteAsk.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()


const studentHolder = document.querySelector('#studentHolder') 
const dateBar = document.querySelector('#date')
const backBtn = document.querySelector('button')
const pdfBtn = document.querySelector('#view-pdf')
const updateBtn = document.querySelector('#update-btn')
const deleteBtn = document.querySelector('#delete-btn')
const searchInput = document.querySelector('#searchInput')


backBtn.addEventListener('click',(e) => {
    window.location.href = 'attendancePage.html'
})

const reportData = JSON.parse(localStorage.getItem('currentAttendanceReport'))
const studetnsAttendace = reportData.attendance
const pdfURL = reportData.pdfURL
const date = reportData.reportDate
const url = pdfURL; // Replace this with your actual PDF file path

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
    }else{
        studentCard.classList.add('absent-student')
    }
    
    pdfBtn.addEventListener('click',(e) => {
        window.location.href = url
    })

    updateBtn.addEventListener('click',(e) => {
        window.location.href = 'attendanceUpdatePage.html'
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
            .catch((err) => console.log(`attendanceReportPage.js Error: ${err}`))
        }

        deleteAsk(deleteFunc,'Attendacne Report')
    })

    dateBar.innerText = date
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