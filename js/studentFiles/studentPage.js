import appendStudents from "../../components/appendStudents.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const createStudentBtn = document.querySelector('#createStudent')
const searchInput = document.querySelector('#searchInput')

createStudentBtn.addEventListener('click',(event) => {
        window.location.href = 'createStudent.html'
})



function fetchStudents(){
        setLoading(true,'Loading Students')
        const classData = JSON.parse(localStorage.getItem('currentClass'))
        const classId = classData._id
        const query = {classId}
        const url = `${BASE_URL}/student/get`
        
        const getStudent = fetch(url,{
                method: 'POST',
                headers: {
                        'Content-Type':'application/json'
                },
                body: JSON.stringify(query)
        })
        
        getStudent
        .then(async (res) => {
                setLoading(false)
                const data = await res.json()
                const {allStudentInfo} = data
                allStudentInfo.sort((a, b) => Number(a.rollNumber) - Number(b.rollNumber))
                localStorage.setItem('currentStudentsArray',JSON.stringify(allStudentInfo))
                appendStudents(allStudentInfo)
                const allStudentCards = document.querySelectorAll('.student-card')
                console.log(allStudentCards)
                searchInput.addEventListener('input',(event) => {
                const currentInput = event.target.value.toLowerCase()
                console.log('currentInput',currentInput)
                allStudentCards.forEach((card) => {
                if(card.id == currentInput || card.dataset.name.toLowerCase().includes(currentInput)){
                        card.style.display = ''
                }else{
                        card.style.display = 'none'
                 }
       }) 
})
        })
        .catch((err) => console.log(`studentPage.js Error: ${err}`))
        
}

fetchStudents()

const allStudentCards = document.querySelectorAll('.student-card')
console.log(allStudentCards)
searchInput.addEventListener('input',(event) => {
        const currentInput = event.target.textContent.toLowerCase()
        // console.log(allStudentCards) 
      allStudentCards.forEach((card) => {
        if(card.id.toLowerCase().includes(currentInput) || card.name.toLowerCase().includes(currentInput)){
                console.log('matched_values',card)    
        }else{
                // card.style.display = 'none'
        }
       }) 
})