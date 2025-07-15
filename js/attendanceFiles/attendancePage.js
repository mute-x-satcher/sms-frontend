import appendReports from "../../components/appendReports.js"
import setLoading from '../../components/setLoading.js'
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()
const currentDate = new Date();
const options = { month: 'short' };
const currentMonthAbbreviation = currentDate.toLocaleString('en-US', options);
localStorage.setItem('currentMonth',currentMonthAbbreviation)
const createAttendanceBtn = document.querySelector('#createAttendance')
const backBtn = document.querySelector('button')
const attendanceMonth = document.querySelector('#attendanceMonth')

// const currentMonth = localStorage.getItem('currentMonth')
attendanceMonth.value = currentMonthAbbreviation


backBtn.addEventListener('click',(e) =>{
    window.location.href = '../classPages/classPage.html'
})

createAttendanceBtn.addEventListener('click',(event) => {
    window.location.href = 'createAttendance.html'
})

setLoading(true,'Loading Attendance Reports')

function fetchAttendanceReport(){

    
    const classData = JSON.parse(localStorage.getItem('currentClass'))
    console.log(classData)
    const classId = classData._id
    const reportMonth = attendanceMonth.value

    const url = `${BASE_URL}/attendance/get`
    const query = {classId,reportMonth}
    console.log(query)
    const getAttendanceReports = fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(query)
})

getAttendanceReports
.then(async (res) => {
    setLoading(false)
    const data = await res.json()
    const {allAttendanceInfo} = data
    console.log(data)
    appendReports(allAttendanceInfo)
})
.catch((err) => console.log(`attendancePage.js Error: ${err}`) )
}

fetchAttendanceReport()

attendanceMonth.addEventListener('change',(e) => {
    fetchAttendanceReport()
})