import appendBunk from "../../components/appendBunk.js"
import showMessage from "../../components/showMessage.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const bunkForm = document.querySelector('form')
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
            rollNumber: bunkStudent.rollNumber
        })  
        
    })
    
    if(bunkList.length === 0){
        showMessage('Please select atleast one student','alert')
        return 
    }

    const classData = JSON.parse(localStorage.getItem('currentClass'))
    const groupId = classData.groupId
    const query = {bunkList,groupId}
    const url = `${BASE_URL}/student/bunk`
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
        showMessage(data.msg,'success')
    })
    .catch((err) => console.log(`bunkStudent.js Error: ${err}`))








})

