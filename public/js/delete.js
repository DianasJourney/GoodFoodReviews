async function deleteFormHandler (event) {
  event.preventDefault()

  console.log('this is the review id')
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]
  console.log(id)

  const response = await fetch(`/api/review/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    document.location.replace('/reviewboard')
  } else {
    console.log(response)
    alert(response.statusText)
  }
}

document
  .querySelector('.deleteReview')
  .addEventListener('click', deleteFormHandler)
