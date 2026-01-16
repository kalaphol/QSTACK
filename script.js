// Registration Form Validation and Functionality
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const schoolEmail = document.getElementById('schoolEmail');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const errorModal = document.getElementById('errorModal');
    const closeErrorModal = document.getElementById('closeErrorModal');

    // Toggle password visibility
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    toggleConfirmPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Real-time validation
    fullName.addEventListener('blur', function() {
        validateFullName();
    });

    schoolEmail.addEventListener('blur', function() {
        validateEmail();
    });

    password.addEventListener('blur', function() {
        validatePassword();
    });

    confirmPassword.addEventListener('blur', function() {
        validateConfirmPassword();
    });

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            submitRegistration();
        }
    });

    // Validation functions
    function validateFullName() {
        const value = fullName.value.trim();
        const errorElement = document.getElementById('fullNameError');
        
        if (value.length < 3) {
            fullName.parentElement.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            fullName.parentElement.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const value = schoolEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById('emailError');

        if (!emailRegex.test(value)) {
            schoolEmail.parentElement.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            schoolEmail.parentElement.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validatePassword() {
        const value = password.value;
        const errorElement = document.getElementById('passwordError');

        if (value.length < 6) {
            password.parentElement.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            password.parentElement.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const passwordValue = password.value;
        const errorElement = document.getElementById('confirmPasswordError');

        if (value !== passwordValue) {
            confirmPassword.parentElement.classList.add('error');
            errorElement.style.display = 'block';
            return false;
        } else {
            confirmPassword.parentElement.classList.remove('error');
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Submit registration
    function submitRegistration() {
        const formData = {
            fullName: fullName.value.trim(),
            email: schoolEmail.value.trim(),
            password: password.value
        };

        // Disable form while submitting
        registrationForm.style.opacity = '0.6';
        registrationForm.style.pointerEvents = 'none';

        // Simulate API call
        setTimeout(() => {
            // Store user info in sessionStorage
            sessionStorage.setItem('userFullName', formData.fullName);
            sessionStorage.setItem('userEmail', formData.email);
            sessionStorage.setItem('registrationDate', new Date().toISOString());
            
            // Redirect to status page
            window.location.href = 'status.html';
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
