import appedMonths from '../../components/appendMonths.js'
// import BASE_URL from '../../url/base_url'

const cardContainer = document.querySelector('.card-container')

const classData = JSON.parse(localStorage.getItem('currentClass'))
const studentData = JSON.parse(localStorage.getItem('currentStudent'))

const classId = classData._id
const studentId = studentData._id

// const base_url = BASE_URL
const base_url_raw = 'http://localhost:3000/'
const url = `${base_url_raw}attendance/analytics`

const studentDeatil = document.createElement('div')
const studentName = document.createElement('div')
const studentRoll = document.createElement('div')

studentDeatil.className = 'student-detail-card'

studentName.textContent = `${studentData.studentName}`
studentRoll.textContent = `Roll No: ${studentData.rollNumber}`

studentDeatil.appendChild(studentName)
studentDeatil.appendChild(studentRoll)
cardContainer.appendChild(studentDeatil)


const query = {classId: classId,studentId}
const fechAnalytics = fetch(url,{
    method: 'POST',
    headers: {
               'Content-Type':'application/json'
    },
    body: JSON.stringify(query)
})

fechAnalytics.then(async (res)=> {
    const data = await res.json()
    console.log(data)
    appedMonths(data.allReports)
})
.catch((err) => console.log("studentFiles studentAnalytics Error: ",err))