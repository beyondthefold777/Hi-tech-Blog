// signup.js
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({
      username: document.getElementById('username_signup').value,
      email: document.getElementById('email_signup').value,
      password: document.getElementById('password_signup').value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
    if (response.ok) {
      document.location.replace('/');
    } else {
      throw new Error('Network response was not ok.');
    }      
}


document.addEventListener('DOMContentLoaded', function() {
const signupForm = document.querySelector('form');


signupForm.addEventListener('submit', signupFormHandler);
})