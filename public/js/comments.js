document.addEventListener('DOMContentLoaded', () => {
  const commentForms = document.querySelectorAll('.comment-form');

  commentForms.forEach(form => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const blogId = formData.get('blogId');
      const content = formData.get('content');

      const response = await fetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blogId, content })
      });

      if (response.ok) {
        const comment = await response.json();
        const commentsSection = document.getElementById(`comments-section-${blogId}`);
        const commentElement = document.createElement('div');
        commentElement.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'mb-2');
        commentElement.innerHTML = `
          <p class="text-gray-800">${comment.content}</p>
          <p class="text-gray-600 text-sm">By ${comment.User ? comment.User.username : 'Anonymous'} on ${format_date(comment.createdAt)}</p>
        `;
        commentsSection.appendChild(commentElement);
        form.reset();
      } else {
        alert('Failed to submit comment');
      }
    });
  });
});

function format_date(date) {
  return new Date(date).toLocaleDateString();
}
