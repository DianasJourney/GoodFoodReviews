async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const review_description = document.querySelector('input[name="review-description"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
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
  
  document.querySelector('.edit-review-form').addEventListener('submit', editFormHandler);