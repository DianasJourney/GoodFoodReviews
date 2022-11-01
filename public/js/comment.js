const commentFormHandler = async function (event) {
  event.preventDefault();
  const review_id = document.querySelector('input[name="review-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;
  
  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        review_id,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.location.reload();
  }
};

document
  .querySelector('#new-comment-button')
  .addEventListener('click', commentFormHandler);