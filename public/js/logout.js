const logout = async function (event) {
  event.preventDefault();
  const response = await fetch('/api/user/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('HTTP error: ' + response.status)
  }
//waits for the user to hit the logout button then redirects them to the homepage
  document.location.replace('/')
}

document.querySelector('#logout-link').addEventListener('click', logout)
