import BASE_URL from "../../url/base_url.js";
import setLoading from "../../components/setLoading.js";

const backBtn = document.querySelector('.back-btn')
const pdfContainer = document.querySelector('.pdf-container')
const pdfFrame = document.querySelector('#pdfFrame')
const sharePDFBtn = document.querySelector('#sharePDF')

setLoading(true,'Loading PDF')

// const pdfPath = localStorage.getItem('currentPDF')
const reportData = JSON.parse(localStorage.getItem('currentAttendanceReport'))
const classData = JSON.parse(localStorage.getItem('currentClass'))
const localPDF = '../../assets/12th_Science_Friday_06-06-2025.pdf'
// pdfFrame.src = pdfPath

// console.log(pdfPath)

backBtn.addEventListener('click',(e) => {
    window.location.href = 'attendanceReportPage.html'
})

fetch(`${BASE_URL}/attendance/pdf`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ report: reportData , className: classData.className})
})
  .then(res => res.blob())
  .then(blob => {
    setLoading(false)
    const url = URL.createObjectURL(blob);
    pdfFrame.src = url;
  })
  .catch((err) => console.log(`attendancePDFPage Error: ${err}`))


// sharePDFBtn.addEventListener('click',(e) => {

// async function sharePDFFile() {
//   const response = await fetch(pdfPath);
//   const blob = await response.blob();
//   const file = new File([blob], 'document.pdf', { type: 'application/pdf' });

//   if (navigator.canShare && navigator.canShare({ files: [file] })) {
//     navigator.share({
//       title: 'Classmark PDF',
//       text: 'Check out this PDF file.',
//       files: [file]
//     }).catch(console.error);
//   } else {
//     alert('This device/browser does not support file sharing.');
//   }
// }

// sharePDFFile()

// })
