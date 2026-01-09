// API Base URL
const API_URL = 'http://localhost:8000/backend/api';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const toggleLoginPasswordBtn = document.getElementById('toggleLoginPassword');
const errorModal = document.getElementById('errorModal');
const closeErrorModalBtn = document.getElementById('closeErrorModal');
const errorMessage = document.getElementById('errorMessage');

// Email validation regex - same as registration
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

// Validate school email
function validateSchoolEmail(email) {
    return emailRegex.test(email.trim());
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

// Show modal with custom error message
function showErrorModal(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'flex';
}

// Close error modal
function closeErrorModalFn() {
    errorModal.style.display = 'none';
}

// Form submission handler
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    // Clear all previous errors
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });
    
    // Get form values
    const schoolEmail = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;
    
    let isValid = true;
    
    // Validate school email
    if (!schoolEmail) {
        showError(loginEmailInput, 'School email is required');
        isValid = false;
    } else if (!validateSchoolEmail(schoolEmail)) {
        showError(loginEmailInput, 'Please enter a valid GCTU school email');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError(loginPasswordInput, 'Password is required');
        isValid = false;
    }
    
    // If form is not valid, stop here
    if (!isValid) return;
    
    // Disable submit button and show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    try {
        // Send login request to backend
        const response = await fetch(`${API_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: schoolEmail,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user info in sessionStorage (optional)
            sessionStorage.setItem('user', JSON.stringify(data.data));
            
            // Redirect to dashboard or home page
            window.location.href = 'dashboard.html';
        } else {
            // Show error in modal
            showErrorModal(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        showErrorModal('An error occurred. Please try again.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// Initialize the login page
function initLogin() {
    // Set up event listeners
    toggleLoginPasswordBtn.addEventListener('click', () => {
        togglePasswordVisibility(loginPasswordInput, toggleLoginPasswordBtn);
    });
    
    loginForm.addEventListener('submit', handleLoginSubmit);
    
    closeErrorModalBtn.addEventListener('click', function() {
        closeErrorModalFn();
        // Clear password field on error
        loginPasswordInput.value = '';
        loginPasswordInput.focus();
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === errorModal) {
            closeErrorModalFn();
            loginPasswordInput.value = '';
            loginPasswordInput.focus();
        }
    });
    
    // Set up input validation
    loginEmailInput.addEventListener('input', function() {
        clearError(this);
    });
    
    loginPasswordInput.addEventListener('input', function() {
        clearError(this);
    });
    
    // Focus on email input field
    loginEmailInput.focus();
}

// Initialize the login page when DOM is loaded
document.addEventListener('DOMContentLoaded', initLogin);