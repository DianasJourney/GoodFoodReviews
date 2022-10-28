async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const review_description = document.querySelector('input[name="review-description"]').value;
  console.log('hi')
    const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        review_description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/reviewboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-review-form').addEventListener('submit', newFormHandler);