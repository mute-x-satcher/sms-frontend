const appendClass = (allClasses) => {
    const classContainer = document.querySelector('.class-container')

    allClasses?.map((classroom) => {
        const newClass = document.createElement('div')
        newClass.className = 'class-card'
        newClass.textContent = classroom.className
        newClass.id = classroom._id
        newClass.addEventListener('click',(event)=>{
                event.preventDefault()
                const classId = event.target.id
               
                const classObj = allClasses.find((classroom) => classroom._id === classId)
                localStorage.setItem('currentClass',JSON.stringify(classObj))
                console.log(`class Saved: ${classObj}`)
                window.location.href = './classPages/classPage.html'
            })

    
        classContainer.appendChild(newClass)

    })

}

export default appendClass