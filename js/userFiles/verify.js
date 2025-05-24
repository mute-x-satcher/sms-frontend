import showMessage from "../../components/showMessage.js"
import setLoading from "../../components/setLoading.js"
import BASE_URL from "../../url/base_url.js"


const verficationForm = document.querySelector('form')

verficationForm.addEventListener('submit', (event) => {

  event.preventDefault()
  setLoading(true,'Verifying You')
  const codeInputs = document.querySelectorAll('.code')
  const verifyBtn = document.querySelector('button')
  let verificationCode = "";
  codeInputs.forEach(input => {
    verificationCode += input.value;
  });


  if (verificationCode.length !== 6 || /\D/.test(verificationCode)) {
    alert("Please enter a valid 4-digit code.");
    return;
  }

  const email = localStorage.getItem('userEmail')

  console.log(verificationCode)

  const query = { verificationCode, email }

  const url = `${BASE_URL}/user/verify`

  verifyBtn.innerText = "Verifying"
  verifyBtn.disabled = true

  const verfiyAccount = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })



  verfiyAccount
    .then(async (res) => {
      setLoading(false)
      const data = await res.json()
      console.log(data)
      const token = data.authToken
      if (token) {
        localStorage.setItem('authToken', token)
        console.log("authToken saved")
        showMessage(data.msg, 'success')
        verifyBtn.innerText = 'Submit Code'
        verifyBtn.disabled = false
        window.location.href = '../homePage.html'
      } else {
        console.log(data.msg)
        showMessage(data.msg, 'error')
        verifyBtn.innerText = 'Submit Code'
        verifyBtn.disabled = false
      }
    }).catch((err) => console.log(`verify.js error: ${err}`))

})

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".code");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
      paste.split("").forEach((char, i) => {
        if (inputs[i]) inputs[i].value = char;
      });
      if (inputs[paste.length - 1]) {
        inputs[paste.length - 1].focus();
      }
    });
  });
});