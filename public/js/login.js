const loginFormHandler = async function (event) {
  event.preventDefault();

  const errorElement = document.getElementById('error-message')
  const usernameEl = document.querySelector('#username-input-login')
  const passwordEl = document.querySelector('#password-input-login')
  //awaits for the user to hit the login button once the data has processed validates the info and redirects them to the review board when everything is true
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      email: usernameEl.value,
      password: passwordEl.value
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  //if the password or email is invalid then throws an error
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
