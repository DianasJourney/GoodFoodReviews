const signupFormHandler = async function (event) {
  event.preventDefault()
  const errorElement2 = document.getElementById('error-message2')
  const nameEl = document.querySelector('#name-input-signup')
  const emailEl = document.querySelector('#username-input-signup')
  const passwordEl = document.querySelector('#password-input-signup')

  //a function that throws an error when it is not equal to the corresponding value's needed
  let messages = []
  if (nameEl.value.length <= 2) {
    messages.push('Name is required!')
  }

  if (passwordEl.value.length <= 6) {
    messages.push('Password must be longer than 6 characters!')

  }

  if (!emailEl.value) {
    messages.push('Please enter a valid email!')
  }

  if (messages.length > 0) {
    errorElement2.innerText = messages.join(' ')
  }
//awaits for users to press create, processes the data stores it and creates it
  const response = await fetch('/api/user', {
    method: 'post',
    body: JSON.stringify({
      name: nameEl.value,
      email: emailEl.value,
      password: passwordEl.value
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('HTTP error: ' + response.status)
  }
//redirects users to the review board
  document.location.replace('/reviewboard')
}

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler)
