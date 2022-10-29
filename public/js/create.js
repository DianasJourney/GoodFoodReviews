async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const description = document.querySelector('input[name="review-description"]').value;
  
    const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    console.log('create.js req');
    console.log(response.body);

    if (response.ok) {
      document.location.replace('/reviewboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.submitReview').addEventListener('click', newFormHandler);