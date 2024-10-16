// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const passwordToggle = document.querySelector('.toggle-password');

    // Check current type and toggle it
    const isPasswordVisible = passwordField.type === "text";

    passwordField.type = isPasswordVisible ? "password" : "text";
    passwordToggle.innerHTML = isPasswordVisible ? "👁️" : "🙈"; // Update icon based on visibility

    // Update aria attributes for accessibility
    passwordToggle.setAttribute("aria-pressed", !isPasswordVisible);
}

// Add event listener for the toggle button
document.querySelector('.toggle-password').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default action if needed
    togglePassword();
});

// Optional: Add keypress event to allow toggling with Enter key
document.querySelector('.toggle-password').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        togglePassword();
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', { // Adjust URL as needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // Handle successful login
            console.log('Login successful', data);
            // Redirect to a new page or show a success message
            window.location.href = '/dashboard.html'; // Adjust as needed
        } else {
            const errorData = await response.json();
            // Handle login error
            console.error('Login failed:', errorData.message);
            alert('Login failed: ' + errorData.message); // Show error to the user
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message); // Show error to the user
    }
});
