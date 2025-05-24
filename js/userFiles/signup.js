import showMessage from '../../components/showMessage.js'
import setLoading from '../../components/setLoading.js'
import BASE_URL from '../../url/base_url.js'


const signupForm = document.querySelector('form')

signupForm.addEventListener("submit", (event) => {
    event.preventDefault()
    setLoading(true,'Signing Up !')
    const fullName = document.getElementById('fullName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const organizationName = document.getElementById('organizationName').value
    const organizationCategory = document.getElementById('categoryForm').value

    const obj = {
        fullName,
        email,
        password,
        organizationName,
        organizationCategory
    }

    const url = `${BASE_URL}/user/create`

    const createAccount = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    createAccount
        .then(async (res) => {
            setLoading(false)
            const data = await res.json()
            console.log(data) // TEMP

            const { userInfo } = data
            if (userInfo) {
                const email = userInfo.email
                const accountId = userInfo._id
                localStorage.setItem('userEmail', email)
                localStorage.setItem('accountId', accountId)
                console.log(`AccountId saved: ${accountId}`)
                console.log("You are successfuly registered, now verfiy")
                await showMessage(data.msg, "success")
                window.location.href = 'verify.html'
            } else {
                console.log(data.msg) // MSG-TEMP
                showMessage(data.msg, 'error')
            }
        })
        .catch((err) => console.log(err))


})