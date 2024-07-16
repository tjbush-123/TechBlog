const editBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      console.log('WOOHOO')
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'GET'
      })
      if (!response.ok){
        console.log('ERROR LOL')
        return;
      }
  
      const post = await response.json();
  
      const editForm = document.getElementById('edit-form');
  
      if (editForm) {
        editForm.innerHTML = `
          <label for="title">Title:</label>
          <input type="text" id="title" value="${post.title}">
          <label for="content">Content:</label>
          <textarea id="content">${post.content}</textarea>
          <button id="save-btn">Save Changes</button>
        `;
      
        const saveBtn = editForm.querySelector('#save-btn');
      
  
      saveBtn.addEventListener('click', async () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
  
        const response = await fetch(`/api/posts/editSave/${id}`,
         {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
  
        if (response.ok) {
          console.log('Post updated successfully!');
          window.location.reload();
        } else {
          console.error('Failed to update post!');
        }
      });
    }
  };
  }
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      console.log('WOOHOO')
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('WOOHOO')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  
  const createPostForm = document.querySelector('.new-post-form');
  const createPostBtn = document.querySelector('#create-post-btn');
  
  createPostBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts/new', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Post created successfully!');
        document.location.replace('/')
      } else {
        console.error('Failed to create post!');
      }
    }
  });
  
  document
    .querySelector('.edit-me')
    .addEventListener('click', editBtnHandler);
  
  document
    .querySelector('.btn-danger')
    .addEventListener('click', delButtonHandler);