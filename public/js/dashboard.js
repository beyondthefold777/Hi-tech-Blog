// public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-blog');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const blogId = event.target.dataset.id;
  
        const response = await fetch(`/dashboard/blogs/${blogId}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          // Remove the blog from the DOM
          event.target.closest('.mb-4').remove();
        } else {
          alert('Failed to delete blog post');
        }
      });
    });
  });
  