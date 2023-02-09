const deleteButtonHandler = async (event) => {
    event.preventDefault();
  
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

  document.querySelectorAll('#delete').forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteButtonHandler);
  });