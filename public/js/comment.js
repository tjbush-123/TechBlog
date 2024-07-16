document.getElementById('comment-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const content = document.querySelector('textarea[name="content"]').value;
    const postId = document.querySelector('input[name="postId"]').value;
  
    const response = await fetch('/api/comments/new', {
      method: 'POST',
      body: JSON.stringify({ content: content, postId: postId, userId: "{{session.userId}}" }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      location.reload();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  });