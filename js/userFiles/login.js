import showMessage from "../../components/showMessage.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"

const token = localStorage.getItem('authToken')
console.log(token)
if (token) {
    setLoading(true,'Loading Data')
    const protectedURL = `${BASE_URL}/user/protected`
    const authAccount = fetch(protectedURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    authAccount
        .then(async (res) => {
            setLoading(false)
            const data = await res.json()
            console.log(data)
            if(data.userInfo._id){
                window.location.href = './pages/homePage.html'
            }
        })
        .catch((err) => console.log(`login.js error: ${err}`))

}

const loginForm = document.querySelector('form')

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setLoading(true,'Loading Data')
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const query = { email, password }

    console.log(query)

    const url = `${BASE_URL}/user/login`
    const loginAccount = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })

    loginAccount
        .then(async (res) => {
            setLoading(false)
            const data = await res.json()
            const token = data.authToken
            const { userInfo } = data
            if (token) {
                localStorage.setItem('authToken', token)
                console.log(`authToken saved`)
                localStorage.setItem('accountId', userInfo._id)
                console.log('Account Id saved', userInfo._id)
                showMessage(data.msg, "success")
                window.location.href = './pages/homePage.html'
            } else {
                console.log(data.msg)
                await showMessage(data.msg, 'error')
            }

        })
        .catch((err) => console.log(`login.js error: ${err}`))


})