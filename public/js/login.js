// login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login_form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const username = document.getElementById('username_login').value;
        const email = document.getElementById('email_login').value;
        const password = document.getElementById('password_login').value;
  
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
          });
  
          if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to dashboard on successful login
          } else {
            const errorMessage = await response.text();
            alert(errorMessage || 'Login failed');
          }
        } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred during login. Please try again.');
        }
      });
    }
  });
  