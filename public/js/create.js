async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const description = document.querySelector('input[name="review-description"]').value;
    const img = document.querySelector('input[name="review-image"]').value;

    const errorElement = document.getElementById('error-message');

      const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        img
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/reviewboard');
    } 
  }
  
  document.querySelector('.createReview').addEventListener('click', newFormHandler);