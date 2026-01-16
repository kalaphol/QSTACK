// Login Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const errorModal = document.getElementById('errorModal');
    const closeErrorModal = document.getElementById('closeErrorModal');

    // Toggle password visibility
    toggleLoginPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPassword.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email format
        if (!isValidEmail(loginEmail.value)) {
            showError('Please enter a valid email address');
            return;
        }

        // Validate password
        if (loginPassword.value.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Simulate login - in real app, this would call a backend API
        simulateLogin();
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error modal
    function showError(message) {
        document.getElementById('errorMessage').textContent = message;
        errorModal.classList.add('show');
    }

    // Default staff account for testing
    const DEFAULT_STAFF_EMAIL = 'staff@gctu.edu.gh';
    const DEFAULT_STAFF_PASSWORD = 'Staff@123';

    // Simulate login process
    function simulateLogin() {
        const email = loginEmail.value;
        const password = loginPassword.value;

        // Validate credentials
        if (!email || !password) {
            showError('Please enter both email and password');
            return;
        }

        // Simulate API call with timeout
        loginForm.style.opacity = '0.6';
        loginForm.style.pointerPoints = 'none';

        setTimeout(() => {
            let userRole = 'student';

            // Check if using default staff account
            if (email === DEFAULT_STAFF_EMAIL && password === DEFAULT_STAFF_PASSWORD) {
                userRole = 'staff';
            } else {
                // Retrieve role from registration (in real app, this would come from backend)
                userRole = sessionStorage.getItem('userRole') || 'student';
            }
            
            // Store user info in sessionStorage
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userRole', userRole);
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Redirect based on role
            if (userRole === 'staff') {
                window.location.href = 'staff-dashboard.html';
            } else {
                window.location.href = 'student-dashboard.html';
            }
        }, 1500);
    }

    // Close error modal
    closeErrorModal.addEventListener('click', function() {
        errorModal.classList.remove('show');
    });

    // Close modal when clicking outside
    errorModal.addEventListener('click', function(e) {
        if (e.target === errorModal) {
            errorModal.classList.remove('show');
        }
    });
});
