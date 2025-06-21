import showMessage from '../../components/showMessage.js'
import setLoading from '../../components/setLoading.js';
import BASE_URL from '../../url/base_url.js';
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const reportData = JSON.parse(localStorage.getItem('currentAttendanceReport'));
const allStudentsAttendance = reportData.attendance
const reportId = reportData._id
const form = document.querySelector('form');
const studentHolder = document.querySelector('#studentHolder');
const reportName = document.querySelector('#reportName')
const reportType = document.querySelector('#reportType')
const searchInput = document.querySelector('#searchInput')

reportName.value = reportData.reportName
reportType.value = reportData.reportType

allStudentsAttendance.forEach((student) => {
  const studentCard = document.createElement('div');
  studentCard.className = 'student-card';
  studentCard.id = student.rollNumber;
  studentCard.dataset.name = student.studentName;

  const studentInfo = document.createElement('div');
  studentInfo.className = 'student-info';

  const studentName = document.createElement('p');
  studentName.textContent = `${student.studentName}`;

  const rollNumber = document.createElement('p');
  rollNumber.textContent = `Roll No: ${student.rollNumber}`;

  studentInfo.appendChild(studentName);
  studentInfo.appendChild(rollNumber);

  const attendanceOptions = document.createElement('div');
  attendanceOptions.className = 'attendance-options';

  const radioGroupName = `attendance-${student.rollNumber}`;

  // Present label
  const presentLabel = document.createElement('label');
  presentLabel.className = 'present-label'; // typo fixed: lable -> label

  const presentInput = document.createElement('input');
  presentInput.type = 'radio';
  presentInput.name = radioGroupName;
  presentInput.value = 'present';
  presentInput.required = true;

  const presentSpan = document.createElement('span');
  presentSpan.textContent = 'Present';

  presentLabel.appendChild(presentInput);
  presentLabel.appendChild(presentSpan);

  // Absent label
  const absentLabel = document.createElement('label');
  absentLabel.className = 'absent-label'; // typo fixed: lable -> label

  const absentInput = document.createElement('input');
  absentInput.type = 'radio';
  absentInput.name = radioGroupName;
  absentInput.value = 'absent';
  absentInput.required = true;

  const absentSpan = document.createElement('span');
  absentSpan.textContent = 'Absent';

  absentLabel.appendChild(absentInput);
  absentLabel.appendChild(absentSpan);

  if(student.status == 'present'){
    presentInput.checked = true
  }else{
    absentInput.checked = true
  }

  // Append to options container
  attendanceOptions.appendChild(presentLabel);
  attendanceOptions.appendChild(absentLabel);

  // Assemble student card
  studentCard.appendChild(studentInfo);
  studentCard.appendChild(attendanceOptions);
  studentHolder.appendChild(studentCard);
});

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

form.addEventListener('submit', (e) => {
  e.preventDefault();
    setLoading(true,'Updating Attendance Report')
    const reportName = document.querySelector('#reportName').value
    const reportType = document.querySelector('#reportType').value

    const updatedAttendance = [];

  allStudentsAttendance.forEach((student) => {
    const radioName = `attendance-${student.rollNumber}`;
    const selectedOption = document.querySelector(`input[name="${radioName}"]:checked`);

    if (selectedOption) {
      updatedAttendance.push({
        studentName: student.studentName,
        rollNumber: student.rollNumber,
        studentId: student._id,
        status: selectedOption.value  // 'present' or 'absent'
      });
    }
  });

  const classData = JSON.parse(localStorage.getItem('currentClass'))
  const groupId = classData.groupId
  const className = classData.className
  const url = `${BASE_URL}/attendance/update`

  const query = {reportId,className,reportName,reportType,groupId,updatedAttendance}

  const updateAttedance = fetch(url,{
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(query)
  })

  updateAttedance
  .then(async (res) => {
        setLoading(false)
        const data = await res.json()
        const {updatedReport} = data
        if(updatedReport){
          const currentUpdatedReport= JSON.parse(localStorage.getItem('currentAttendanceReport'));
          currentUpdatedReport.reportName = updatedReport.reportName
          currentUpdatedReport.reportType = updatedReport.reportType
          currentUpdatedReport.attendance = updatedReport.attendance
          localStorage.setItem('currentAttendanceReport',JSON.stringify(updatedReport))
          showMessage(data.msg,'success')
        }else{
          showMessage(data.msg,'alert')
        }
        console.log(data)
  })
  .catch((err) => console.log(`updateAttendance Error: ${err}`))


})


