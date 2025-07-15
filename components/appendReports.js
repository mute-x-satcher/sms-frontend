const appendReports = (allReports) => {
    let filteredReports = allReports.filter(element => element !== null);
    const attendanceContainer = document.querySelector('.attendance-container')
    while (attendanceContainer.firstChild) {
  attendanceContainer.removeChild(attendanceContainer.firstChild);
}
    filteredReports.map((report) => {
        if(report){
            const reportCard = document.createElement('div')
        reportCard.className = 'attendance-card'
        reportCard.textContent = report.reportDate
        reportCard.id = report._id
        if(report.reportType == 'Exam'){
            reportCard.classList.add('exam-attendance-card')
        }
        reportCard.addEventListener('click',(event)=> {
            const reportId = event.target.id
            const attendanceReport = filteredReports.find((report) => report._id == reportId)
            localStorage.setItem('currentAttendanceReport',JSON.stringify(attendanceReport))
            window.location.href = 'attendanceReportPage.html'
        })
    
        attendanceContainer.appendChild(reportCard)
        }
        
    })

}

export default appendReports