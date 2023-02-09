const deleteButtonHandler = async (event) => {
    
    event.preventDefault();
    console.log("=======IN DELETE CONSOLE--------")
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/post/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to delete project');
      }
    }
  };

  const editFormHandler = async (e) => {
    e.preventDefault();
  
    const title = document.querySelector('#editpost-title').value.trim();
    const post_content = document.querySelector('#editpost-content').value.trim();
  
    console.log(title, post_content);
  
    const url = new URL(document.location);
    const post_id = url.pathname.split('/').pop();
  
    if (title && post_content) {
      const response = await fetch(`/api/post/update/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
  };

  document.querySelectorAll('.deletebtn').forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteButtonHandler);
  });
  
  document.querySelector('#update-post').addEventListener('click', editFormHandler);
