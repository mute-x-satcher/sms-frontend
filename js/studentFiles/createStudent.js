import showMessage from '../../components/showMessage.js'
import setLoading from '../../components/setLoading.js'
import BASE_URL from '../../url/base_url.js'
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const form = document.querySelector('form')
const classData = JSON.parse(localStorage.getItem('currentClass'))
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    setLoading(true,'Creating Student')
    const studentName = document.querySelector('#studentName').value
    const rollNumber = document.querySelector('#rollNumber').value
    const primaryContact = document.querySelector('#pri-contact').value
    const secondaryContact = document.querySelector('#sec-contact').value

    const parentContacts = [primaryContact,secondaryContact]

    // const classData = JSON.parse(localStorage.getItem('currentClass'))
    console.log('classData',classData)
    const classId = classData._id 

    const query = {studentName,rollNumber,classId,parentContacts}

    console.log(query)

    const url = `${BASE_URL}/student/create`
    const createStudent = fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })


    createStudent
    .then(async (res) => {
        setLoading(false)
        const data = await res.json()
        const {studentInfo,msg} = data
        if(studentInfo){
            console.log(studentInfo)
            showMessage(msg,'success')
        }else{
            console.log(data)
            showMessage(msg,'alert')
        }

    } )
    .catch((err) => console.log(`createStudent.js Error: ${err}`))

})