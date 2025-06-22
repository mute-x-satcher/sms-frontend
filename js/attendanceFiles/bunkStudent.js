import appendBunk from "../../components/appendBunk.js"
import showMessage from "../../components/showMessage.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const bunkForm = document.querySelector('form')
const lecture = document.querySelector('#lectureName')
const currentStudents = JSON.parse(localStorage.getItem('currentStudentsArray'))

appendBunk(currentStudents)


bunkForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    e.stopPropagation()
    const allBunkBtn = document.querySelectorAll('.bunk-true') 
   
    const bunkList = []

    allBunkBtn.forEach((bunkBtn) => {
          const id = bunkBtn.id
          const bunkStudent = currentStudents.find((student) => student.rollNumber == id)  
          bunkList.push({
            studentName: bunkStudent.studentName,
            rollNumber: bunkStudent.rollNumber,
            studentId: bunkStudent._id
        })  
        
    })
    
    if(bunkList.length === 0){
        showMessage('Please select atleast one student','alert')
        return 
    }

    const classData = JSON.parse(localStorage.getItem('currentClass'))
    const groupId = classData.groupId
    const classId = classData._id
    const lectureName = lecture.value
    const query = {bunkList,groupId,classId,lectureName}
    const url = `${BASE_URL}/attendance/bunk`
    console.log(query)
    setLoading(true,'Submiting Bunk Report')
    const bunkReport = fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })


    bunkReport
    .then(async (res) => {
        setLoading(false)
        const data = await res.json()
       if (res.status === 500 || res.status === 409) {
            showMessage(data.msg, 'alert');
        } else {
            showMessage(data.msg, 'success');
        }
    })
    .catch((err) => console.log(`bunkStudent.js Error: ${err}`))








})

