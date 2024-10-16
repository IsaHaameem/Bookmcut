document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, phone, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
        alert(data.message); // User registered successfully
        // Redirect or do something after successful signup
    } else {
        alert(data.error); // Display error message
    }
});
  
// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});
