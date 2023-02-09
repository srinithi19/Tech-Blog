async function commentFormHandler(event) {
    event.preventDefault();
  console.log("in comments-----------")
    const comment = document.querySelector('#comment');
    const url = new URL(document.location);
    const post_id = url.pathname.split('/').pop();
  
    const commentData = {
      comment: comment.value,
      post_id: post_id,
    };
    if (comment) {
      const response = await fetch('/api/post/comments', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.reload();
      }
    }
  }
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);