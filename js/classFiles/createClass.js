import showMessage from '../../components/showMessage.js'
import setLoading from '../../components/setLoading.js'
import BASE_URL from '../../url/base_url.js'
import reloadOnce from "../../components/reloadOnce.js";

reloadOnce()

const createClassForm = document.querySelector('form')

createClassForm.addEventListener('submit',(event) => {
        event.preventDefault()
        setLoading(true,'Creating Class')
        const className = document.getElementById('className').value
        const groupName = document.getElementById('groupName').value
        const standard = document.getElementById('standard').value
        const accountId = localStorage.getItem('accountId')

        const query = {className,groupName,standard,accountId}

        const url = `${BASE_URL}/class/create`
        const createClass = fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(query)
        }) 

        createClass
        .then(async (res) => {
            setLoading(false)
            const data = await res.json()
            if(data.classInfo){
                showMessage(data.msg,'success')
                window.location.href = '../homePage.html'
            }else{
                showMessage(data.msg,'alert')
            }
        })
        .catch((err) => console.log(`createClass.js Error: ${err}`))
    })