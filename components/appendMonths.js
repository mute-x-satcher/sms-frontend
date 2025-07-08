  const months = {
    Jan: "January",
    Feb: "February", // 29 if leap year
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
  };


function appendMonths(allReports){
    const cardContainer = document.querySelector('.card-container')
    allReports.map((report) => {
        if(report.monthAttendance != 0){
         const card = document.createElement('div')
         const cellBox = document.createElement('div')
         const dateBar = document.createElement('h1')
        //  console.log(months[report.reportMonth])
         dateBar.textContent = `${months[report.reportMonth]}, 2025`
         cellBox.className = 'cell-box'
         card.className = 'analytics-card'
         
         let dayCounter = 1
         report.monthAttendance.map((day) => {
             const dateCell = document.createElement('div')
             const status = day.dateStatus
             dateCell.className = `cell ${status}`
             dateCell.textContent = dayCounter  
             cellBox.appendChild(dateCell)
             dayCounter++               
            })   
            card.appendChild(dateBar)
            card.appendChild(cellBox)
            cardContainer.appendChild(card)
        }
   
    })



}

export default appendMonths