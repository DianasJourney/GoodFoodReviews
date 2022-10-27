const signupFormHandler = async function (event) {
  event.preventDefault()

  const usernameEl = document.querySelector('#username-input-signup')
  const passwordEl = document.querySelector('#password-input-signup')
  const response = fetch('/api/user', {
    method: 'post',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('HTTP error: ' + response.status)
  }

  document.location.replace('/reviewboard')
}

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler)
