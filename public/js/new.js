// public/js/new.js
document.getElementById('new_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('new_title').value;
    const content = document.getElementById('new_content').value;
  
    const response = await fetch('/dashboard/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
  
    const blog = await response.json();
    // Handle the response, e.g., update the UI to show the new blog
  });
  