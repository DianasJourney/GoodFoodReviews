async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const description = document.querySelector('input[name="review-description"]').value;
    const img = document.querySelector('input[name="review-image"]').value;

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/review/${id}`, {
        method: 'PUT',
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
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.editReview').addEventListener('click', editFormHandler);