import showMessage from "../../components/showMessage.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const form = document.querySelector('form')

const studentName = document.querySelector('#studentName')
const rollNumber = document.querySelector('#rollNumber')
const primaryContact = document.querySelector('#pri-contact')
const secondaryContact = document.querySelector('#sec-contact')

const studentData = JSON.parse(localStorage.getItem('currentStudent'))

studentName.value = studentData.studentName
rollNumber.value = studentData.rollNumber
primaryContact.value = studentData.parentContacts[0]
secondaryContact.value = studentData.parentContacts[1]

form.addEventListener('submit',(event) => {
    event.preventDefault()
    setLoading(true,'Updating Student')
    const studentName = document.querySelector('#studentName').value
    const rollNumber = document.querySelector('#rollNumber').value
    const primaryContact = document.querySelector('#pri-contact').value
    const secondaryContact = document.querySelector('#sec-contact').value
    const parentContacts = [primaryContact,secondaryContact]
    const studentData = JSON.parse(localStorage.getItem('currentStudent'))
    const clasData = JSON.parse(localStorage.getItem('currentClass'))
    const studentId = studentData._id
    const classId = clasData._id

    const query = {studentName,rollNumber,parentContacts,studentId,classId}
    const url = `${BASE_URL}/student/update`

    const updateStudent = fetch(url,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(query)
    })

    updateStudent
    .then(async (res) => {
        setLoading(false)
        const data = await res.json()
        const {studentInfo} = data
        if(studentInfo){
            showMessage(data.msg,'success')
        }else{
            showMessage(data.msg,'alert')
        }
    })
    .catch((err) => console.log(`studentUpdatePage.js Error: ${err}`))

})