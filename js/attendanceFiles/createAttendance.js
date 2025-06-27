import showMessage from '../../components/showMessage.js'
import setLoading from '../../components/setLoading.js';
import BASE_URL from '../../url/base_url.js';
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const allStudents = JSON.parse(localStorage.getItem('currentStudentsArray'));

const form = document.querySelector('form');
const studentHolder = document.querySelector('#studentHolder');

allStudents.forEach((student) => {
  const studentCard = document.createElement('div');
  studentCard.className = 'student-card';
  studentCard.id = student.rollNumber;
  studentCard.name = student.studentName;

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

  
  // Leave label
  const leaveLabel = document.createElement('label');
  leaveLabel.className = 'leave-label'; // typo fixed: lable -> label

  const leaveInput = document.createElement('input');
  leaveInput.type = 'radio';
  leaveInput.name = radioGroupName;
  leaveInput.value = 'leave';
  leaveInput.required = true;

  const leaveSpan = document.createElement('span');
  leaveSpan.textContent = 'Leave';

  
  leaveLabel.appendChild(leaveInput);
  leaveLabel.appendChild(leaveSpan);

  // Absent label
  const absentLabel = document.createElement('label');
  leaveLabel.className = 'absent-label'; // typo fixed: lable -> label



  const absentInput = document.createElement('input');
  absentInput.type = 'radio';
  absentInput.name = radioGroupName;
  absentInput.value = 'absent';
  absentInput.required = true;

  const absentSpan = document.createElement('span');
  absentSpan.textContent = 'Absent';

  absentLabel.appendChild(absentInput);
  absentLabel.appendChild(absentSpan);
 
  // Append to options container
  attendanceOptions.appendChild(presentLabel);
  attendanceOptions.appendChild(absentLabel);
  attendanceOptions.appendChild(leaveLabel)

  // Assemble student card
  studentCard.appendChild(studentInfo);
  studentCard.appendChild(attendanceOptions);
  studentHolder.appendChild(studentCard);
});


form.addEventListener('submit', (e) => {
  e.preventDefault();
    setLoading(true,'Creating Attendance')
    const reportName = document.querySelector('#reportName').value
    const reportType = document.querySelector('#reportType').value

    const attendance = [];

  allStudents.forEach((student) => {
    const radioName = `attendance-${student.rollNumber}`;
    const selectedOption = document.querySelector(`input[name="${radioName}"]:checked`);

    if (selectedOption) {
      attendance.push({
        studentId: student._id,
        status: selectedOption.value  // 'present' or 'absent' or 'leave'
      });
    }
  });

  const classData = JSON.parse(localStorage.getItem('currentClass'))
  console.log(`classData:`,classData)
  const classId = classData._id 
  const className = classData.className
  const groupId = classData.groupId
  const url = `${BASE_URL}/attendance/create`

  const query = {classId,className,reportName,reportType,groupId,attendance}
  console.log(`query: `,query)


  const uploadAttedance = fetch(url,{
    method: 'POST',
    headers: {      
      'Content-Type':'application/json'
    },
    body: JSON.stringify(query)
  })

  uploadAttedance
  .then(async (res) => {
        setLoading(false)
        const data = await res.json()
        if(data.attendanceReport){
          showMessage(data.msg,'success')
        }else{
          showMessage(data.msg,'alert')
        }
        console.log(data)
  })
  .catch((err) => console.log(`createAttendance Error: ${err}`))


})