document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Clear all session storage data
            sessionStorage.clear();
            
            // Redirect to the login page
            window.location.href = 'login.html';
        });
    }
});
