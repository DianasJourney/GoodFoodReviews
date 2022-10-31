const loginFormHandler = async function (event) {
  event.preventDefault();

  const errorElement = document.getElementById('error-message')
  const usernameEl = document.querySelector('#username-input-login')
  const passwordEl = document.querySelector('#password-input-login')
  
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      email: usernameEl.value,
      password: passwordEl.value
    }),
    headers: { 'Content-Type': 'application/json' }
  })
let messages = []
  if (!response.ok) {
    messages.push('Invalid password or email')
    errorElement.innerText = messages;
  } else
  document.location.replace('/reviewboard/')
}

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler)
