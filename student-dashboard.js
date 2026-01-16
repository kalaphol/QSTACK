// Student Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and is student
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    const userRole = sessionStorage.getItem('userRole');

    // If user is not logged in, redirect to login page
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // If user is staff, redirect to staff dashboard
    if (userRole === 'staff') {
        window.location.href = 'staff-dashboard.html';
        return;
    }

    // Update user profile with logged-in user's email
    const userProfileSpan = document.querySelector('.user-profile span');
    if (userProfileSpan && userEmail) {
        userProfileSpan.textContent = userEmail.split('@')[0];
    }

    const searchBooksBtn = document.querySelector('.search-books');
    const renewBookBtn = document.querySelector('.renew-book');
    const reserveBookBtn = document.querySelector('.reserve-book');
    const actionModal = document.getElementById('action-modal');
    const closeModal = document.querySelector('.close-modal');
    const confirmBtn = document.querySelector('.confirm-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Quick Actions
    searchBooksBtn.addEventListener('click', function() {
        showMessage('Search Books', 'Open the library catalog to search for books');
    });

    renewBookBtn.addEventListener('click', function() {
        showMessage('Renew Books', 'Your books have been renewed for 14 more days!');
    });

    reserveBookBtn.addEventListener('click', function() {
        showMessage('Reserve Book', 'Book reservation request submitted successfully!');
    });

    // Modal functions
    function showMessage(title, message) {
        document.querySelector('.modal-header h3').textContent = title;
        document.getElementById('modal-message').textContent = message;
        actionModal.classList.add('show');
    }

    function hideMessage() {
        actionModal.classList.remove('show');
    }

    closeModal.addEventListener('click', hideMessage);
    confirmBtn.addEventListener('click', hideMessage);

    // Close modal when clicking outside
    actionModal.addEventListener('click', function(e) {
        if (e.target === actionModal) {
            hideMessage();
        }
    });

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    document.head.appendChild(style);
});
