// Status Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve registration data from sessionStorage
    const userFullName = sessionStorage.getItem('userFullName');
    const userEmail = sessionStorage.getItem('userEmail');
    const registrationDate = sessionStorage.getItem('registrationDate');

    // If user data exists, display it (can be used to show user info)
    if (userFullName) {
        console.log('User registered:', userFullName, userEmail);
    }

    // Add event listeners to status page buttons
    const goToLoginBtn = document.querySelector('a[href="login.html"]');
    const backToHomeBtn = document.querySelector('a[href="index.html"]');

    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', function() {
            // Could add analytics or logging here
            console.log('User navigating to login');
        });
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            console.log('User navigating to home');
        });
    }

    // Optional: Auto-redirect after certain time
    // setTimeout(() => {
    //     window.location.href = 'login.html';
    // }, 5000);
});
