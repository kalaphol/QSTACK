// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userRole = sessionStorage.getItem('userRole');
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (!isLoggedIn || isLoggedIn === 'false') {
        window.location.href = 'login.html';
        return;
    }
    
    // Settings page is accessible by both staff and students
    // Show appropriate navigation based on role
    const staffNavItems = document.querySelectorAll('.staff-nav');
    const studentNavItems = document.querySelectorAll('.student-nav');
    const userProfileSpan = document.querySelector('.user-profile span');
    
    if (userRole === 'staff') {
        staffNavItems.forEach(item => item.style.display = '');
        studentNavItems.forEach(item => item.style.display = 'none');
        if (userProfileSpan && userEmail) {
            userProfileSpan.textContent = userEmail.split('@')[0];
        }
    } else {
        staffNavItems.forEach(item => item.style.display = 'none');
        studentNavItems.forEach(item => item.style.display = '');
        if (userProfileSpan && userEmail) {
            userProfileSpan.textContent = userEmail.split('@')[0];
        }
    }
    
    initializeSettings();
});

// Initialize settings page
function initializeSettings() {
    const saveButtons = document.querySelectorAll('.save-btn');
    const backupButtons = document.querySelectorAll('.backup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    // Save buttons for settings sections
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            saveSettings(this.closest('.settings-section'));
        });
    });
    
    // Backup buttons
    backupButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            handleBackupAction(this);
        });
    });
    
    // Modal controls
    closeModal.addEventListener('click', closeSuccessModal);
    confirmBtn.addEventListener('click', closeSuccessModal);
    
    // Note: Logout button is handled by logout.js
}

// Save settings for a specific section
function saveSettings(section) {
    const inputs = section.querySelectorAll('input, select');
    const sectionTitle = section.querySelector('.section-header h2').textContent;
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('modal-message');
    
    // Validate inputs
    let isValid = true;
    inputs.forEach(input => {
        if (input.type !== 'checkbox' && input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        message.textContent = 'Please fill in all required fields!';
        modal.style.display = 'block';
        return;
    }
    
    // Simulate saving
    message.textContent = `${sectionTitle} has been saved successfully!`;
    modal.style.display = 'block';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 2000);
}

// Handle backup actions
function handleBackupAction(btn) {
    const btnText = btn.textContent.trim();
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('modal-message');
    
    if (btn.classList.contains('backup-now')) {
        message.textContent = 'Backup is in progress. This may take a few minutes...';
        modal.style.display = 'block';
        
        setTimeout(() => {
            message.textContent = 'Backup completed successfully!';
        }, 3000);
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 5000);
    } else if (btn.classList.contains('danger')) {
        if (confirm('Are you sure you want to clear the cache? This action cannot be undone.')) {
            message.textContent = 'Cache is being cleared...';
            modal.style.display = 'block';
            
            setTimeout(() => {
                message.textContent = 'Cache cleared successfully!';
            }, 2000);
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 3500);
        }
    } else {
        // Download backup
        message.textContent = 'Backup download is starting...';
        modal.style.display = 'block';
        
        setTimeout(() => {
            message.textContent = 'Backup file has been downloaded successfully!';
        }, 2000);
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3500);
    }
}

// Close modal
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Add CSS for error state
const style = document.createElement('style');
style.textContent = `
    .setting-input.error {
        border-color: #e74c3c !important;
        background-color: #fdeaea !important;
    }
`;
document.head.appendChild(style);
