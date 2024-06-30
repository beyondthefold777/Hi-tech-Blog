document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
  
    if (signupForm) {
      signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        const formData = new FormData(signupForm);
        fetch('/signup', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Redirect to the homepage
            window.location.href = '/';
          } else {
            alert('Signup failed: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error submitting the form.');
        });
      });
    }
  });
  