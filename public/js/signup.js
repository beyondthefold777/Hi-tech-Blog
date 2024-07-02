// signup.js
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form');
  
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      const formData = new FormData(signupForm);
      fetch('/signup', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // Assuming the server responds with JSON
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        if (data.success) {
          // Redirect to the homepage
          window.location.href = '/';
        } else {
          alert('Signup failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    });
  });
  