import reloadOnce from "../../components/reloadOnce.js";
import BASE_URL from "../../url/base_url.js"

reloadOnce()

function fetchStudents(){
    const classData = JSON.parse(localStorage.getItem('currentClass'))
    const classId = classData._id
    console.log(classId)
    const query = {classId}
    const url = `${BASE_URL}/student/get`

    const getStudents = fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })

    getStudents
    .then(async (res) => {
        const data = await res.json()
        const {allStudentInfo} = data
        console.log(allStudentInfo)
        localStorage.setItem('currentStudentsArray',JSON.stringify(allStudentInfo))
    } )
    .catch((err) => console.log(`classPage.js Error: ${err}`))

}

fetchStudents()

const h1 = document.querySelector("nav h1");
const span = h1.querySelector("span");

if (span.scrollWidth > h1.clientWidth) {
    h1.classList.add("scroll");
}

const classData = JSON.parse(localStorage.getItem('currentClass'))
console.log(classData)
h1.textContent = classData.className

const settingBtn = document.getElementById('classSetting')
const homeBtn = document.getElementById('home')
const studentsBtn = document.getElementById('students')
const attendaceBtn = document.getElementById('attendance')
const bunkBtn = document.getElementById('bunk-report')

settingBtn.addEventListener('click',(event)=>{
    window.location.href = 'classSetting.html'
})

homeBtn.addEventListener('click',(event)=>{
    window.location.href = '../homePage.html'
})

studentsBtn.addEventListener('click',(event) =>{
    window.location.href = '../studentPages/studentPage.html'
})

attendaceBtn.addEventListener('click',(event) => {
    window.location.href = '../attendancePages/attendancePage.html'
})

bunkBtn.addEventListener('click',(event) => {
    window.location.href = '../attendancePages/bunkStudentPage.html'
})

