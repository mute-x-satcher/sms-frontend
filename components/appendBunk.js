const appendBunk = (allStudents) => {
    const bunkStudentHolder = document.querySelector('#bunkStudentHolder')
    allStudents.map((student) => { 
        const bunkStudentCard = document.createElement('div')
        bunkStudentCard.className = 'bunk-student-card'
        bunkStudentCard.id = student.rollNumber
        bunkStudentCard.dataset.name = student.studentName

        const studeInfo = document.createElement('div')
        studeInfo.className = 'student-info'
 
        const studentName = document.createElement('div')
        const studentRollNumber = document.createElement('div')
        const bunkBtnDiv = document.createElement('div')
        const bunkBtn = document.createElement('div')

        studentName.textContent = `${student.studentName}`
        studentRollNumber.textContent = `Roll No: ${student.rollNumber}`
        bunkBtn.textContent = 'Add to list'

        bunkBtn.id = student.rollNumber
        bunkBtn.className = 'bunk-false'
        
        bunkBtnDiv.className = 'bunk-btn-div'

        bunkBtn.addEventListener('click',(e) => {
            const bunkBtn = e.target
            if(bunkBtn.className == 'bunk-true'){
                bunkBtn.className = 'bunk-false' 
                bunkBtn.textContent = 'Add to list'           
            }else{
                bunkBtn.className = 'bunk-true'
                bunkBtn.textContent = 'Remove from list'
            }
            
        })
        
        bunkBtnDiv.appendChild(bunkBtn)

        studeInfo.appendChild(studentName)
        studeInfo.appendChild(studentRollNumber)
        studeInfo.appendChild(bunkBtnDiv)
        
        bunkStudentCard.appendChild(studeInfo)
      

        bunkStudentHolder.appendChild(bunkStudentCard)

    })
    
    const searchInput = document.querySelector('#searchInput')
    const AllBunkCards = document.querySelectorAll('.bunk-student-card')

     searchInput.addEventListener('input',(e) => {
        const currentInput = e.target.value.toLowerCase()
       AllBunkCards.forEach((card) => {
        if(card.id == currentInput || card.dataset.name.toLowerCase().includes(currentInput)){
            card.style.display = ''
        }else{
            card.style.display = 'none'
        }
       }) 
})


} 

export default appendBunk