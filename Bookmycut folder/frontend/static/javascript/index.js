// index.js

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved dark mode preference on page load
function checkDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    const body = document.body;
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
    }
}

// Smooth scrolling for navigation links
function smoothScroll(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listener for dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Event listeners for smooth scrolling
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Apply saved dark mode preference on page load
checkDarkModePreference();

// Mobile navigation toggle
const navbar = document.querySelector('.navbar');
const navToggle = document.createElement('button');
navToggle.innerText = '☰';
navToggle.classList.add('nav-toggle');
navbar.appendChild(navToggle);

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
});

// Animation effects for service cards
const serviceCards = document.querySelectorAll('.card');

serviceCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.classList.add('hover');
    });

    card.addEventListener('mouseout', () => {
        card.classList.remove('hover');
    });
});
