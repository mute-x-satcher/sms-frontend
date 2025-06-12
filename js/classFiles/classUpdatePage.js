import showMessage from '../../components/showMessage.js'
import setLoading from '../../components/setLoading.js'
import BASE_URL from '../../url/base_url.js'
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

// location.reload(1)

const className = document.querySelector('#className')
const standard = document.querySelector('#standard')
const groupName = document.querySelector('#groupName')
const form = document.querySelector('form')

const classData = JSON.parse(localStorage.getItem('currentClass'))

className.value = classData.className
standard.value = classData.standard
groupName.value = classData.groupName

form.addEventListener('submit', (event) => {
    event.preventDefault()
    setLoading(true,'Updating Class')
    let className = document.querySelector('#className').value
    let standard = document.querySelector('#standard').value
    let groupName = document.querySelector('#groupName').value
    const classId = classData._id 

    const query = { classId, className, standard, groupName }
    console.log(query)
    const url = `${BASE_URL}/class/update`
    const updateClass = fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    })

    updateClass
        .then(async (res) => {
            setLoading(false)
            const data = await res.json()
            const { query } = data
            if (query) {
                query._id = query.classId
               localStorage.setItem('currentClass',JSON.stringify(query))
               showMessage(data.msg, 'success')

            } else {
                showMessage(data.msg, 'alert')
            }
        })
        .catch((err) => console.log(`classUpdatePage.js Error: ${err}`))

})

