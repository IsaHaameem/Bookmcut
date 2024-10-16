document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const notes = document.getElementById('notes').value;

        // Validate form values (optional)
        if (!name || !email || !phone || !date || !time || !location) {
            alert('Please fill in all required fields.');
            return;
        }

        // Save the booking details to localStorage (or you can send them to the server)
        const bookingDetails = {
            name,
            email,
            phone,
            date,
            time,
            location,
            notes
        };

        // Store the booking details in localStorage
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        // Redirect to the services page
        window.location.href = 'services.html';
    });
});
