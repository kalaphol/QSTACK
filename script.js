// API Base URL
const API_URL = 'http://localhost:8000/backend/api';

// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const schoolEmailInput = document.getElementById('schoolEmail');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const loginLink = document.getElementById('loginLink');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

// Email validation regex - accepts GCTU school emails
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gctu\.edu\.gh|students\.gctu\.edu\.gh)$/i;

// Toggle password visibility
function togglePasswordVisibility(inputElement, toggleBtn) {
    const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
    inputElement.setAttribute('type', type);
    
    // Toggle eye icon
    const eyeIcon = toggleBtn.querySelector('i');
    if (type === 'text') {
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Validate full name
function validateFullName(name) {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    return nameRegex.test(name.trim());
}

// Validate school email
function validateSchoolEmail(email) {
    return emailRegex.test(email.trim());
}

// Validate password
function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

// Show error message
function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    formGroup.classList.add('error');
    
    // Remove existing error message if any
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

// Clear error message
function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Validate form on input
function setupInputValidation() {
    const inputs = [fullNameInput, schoolEmailInput, passwordInput, confirmPasswordInput];
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
            
            // Real-time validation for email format
            if (this === schoolEmailInput && this.value.trim() !== '') {
                if (!validateSchoolEmail(this.value)) {
                    showError(this, 'Please enter a valid GCTU school email (e.g., name@gctu.edu.gh)');
                }
            }
            
            // Real-time validation for password match
            if ((this === passwordInput || this === confirmPasswordInput) && 
                passwordInput.value !== '' && confirmPasswordInput.value !== '') {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    showError(confirmPasswordInput, 'Passwords do not match');
                } else {
                    clearError(confirmPasswordInput);
                }
            }
        });
    });
}

// Form submission handler
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear all previous errors
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    });
    
    // Get form values
    const fullName = fullNameInput.value.trim();
    const schoolEmail = schoolEmailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    let isValid = true;
    
    // Validate full name
    if (!fullName) {
        showError(fullNameInput, 'Full name is required');
        isValid = false;
    } else if (!validateFullName(fullName)) {
        showError(fullNameInput, 'Please enter a valid name (2-50 characters, letters and spaces only)');
        isValid = false;
    }
    
    // Validate school email
    if (!schoolEmail) {
        showError(schoolEmailInput, 'School email is required');
        isValid = false;
    } else if (!validateSchoolEmail(schoolEmail)) {
        showError(schoolEmailInput, 'Please enter a valid GCTU school email (e.g., name@gctu.edu.gh)');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 8 characters with uppercase, lowercase, and a number');
        isValid = false;
    }
    
    // Validate password confirmation
    if (!confirmPassword) {
        showError(confirmPasswordInput, 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match');
        isValid = false;
    }
    
    // If form is not valid, stop here
    if (!isValid) return;
    
    // Disable submit button and show loading state
    const submitBtn = registrationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';
    
    try {
        // Send registration request to backend
        const response = await fetch(`${API_URL}/register.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName,
                email: schoolEmail,
                password: password,
                confirmPassword: confirmPassword
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success modal
            successModal.style.display = 'flex';
        } else {
            // Show error message
            const errorField = data.message.toLowerCase().includes('email') ? schoolEmailInput : fullNameInput;
            showError(errorField, data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError(fullNameInput, 'An error occurred. Please try again.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Initialize the application
function init() {
    // Set up event listeners
    togglePasswordBtn.addEventListener('click', () => {
        togglePasswordVisibility(passwordInput, togglePasswordBtn);
    });
    
    toggleConfirmPasswordBtn.addEventListener('click', () => {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
    });
    
    registrationForm.addEventListener('submit', handleFormSubmit);
    
    closeModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
        registrationForm.reset();
        window.location.href = 'login.html';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Set up input validation
    setupInputValidation();
    
    // Focus on first input field
    fullNameInput.focus();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);