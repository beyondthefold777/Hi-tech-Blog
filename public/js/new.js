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

  if (response.ok) {
      const blog = await response.json();
      // Optionally, update the UI to show the new blog without reloading the page
      location.reload(); // Reload the page to show the new blog post
  } else {
      alert('Failed to create blog post');
  }
});

// Toggle visibility of the new blog form
document.getElementById('new_button').addEventListener('click', function() {
  document.querySelector('.new_form').classList.toggle('hidden');
});
