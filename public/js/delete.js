async function deleteFormHandler () {
  //event.preventDefault();

  console.log('this is the review id')
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

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
    alert(response.statusText)
  }
}

document
  .querySelector('#deleteReview')
  .addEventListener('click', deleteFormHandler)
