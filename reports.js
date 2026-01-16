// Check authentication
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userRole = sessionStorage.getItem('userRole');
    
    if (!isLoggedIn || isLoggedIn === 'false') {
        window.location.href = 'login.html';
        return;
    }
    
    if (userRole !== 'staff') {
        window.location.href = 'student-dashboard.html';
        return;
    }
    
    initializeReports();
});

// Initialize reports page
function initializeReports() {
    const generateButtons = document.querySelectorAll('.card-button');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    // Generate report buttons
    generateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.closest('.card').querySelector('.card-title').textContent;
            generateReport(reportType);
        });
    });
    
    // Download buttons
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reportName = this.closest('tr').querySelector('td').textContent;
            downloadReport(reportName);
        });
    });
    
    // Delete buttons
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reportName = this.closest('tr').querySelector('td').textContent;
            deleteReport(reportName);
        });
    });
    
    // Modal close buttons
    closeModal.addEventListener('click', closeSuccessModal);
    confirmBtn.addEventListener('click', closeSuccessModal);
}

// Generate report
function generateReport(reportType) {
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('modal-message');
    
    message.textContent = `${reportType} report is being generated. This may take a few moments.`;
    modal.style.display = 'block';
    
    // Simulate report generation
    setTimeout(() => {
        message.textContent = `${reportType} report has been generated successfully!`;
    }, 2000);
}

// Download report
function downloadReport(reportName) {
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('modal-message');
    
    message.textContent = `Downloading ${reportName}...`;
    modal.style.display = 'block';
    
    // Simulate download
    setTimeout(() => {
        message.textContent = `${reportName} has been downloaded successfully!`;
    }, 1500);
}

// Delete report
function deleteReport(reportName) {
    if (confirm(`Are you sure you want to delete "${reportName}"?`)) {
        const modal = document.getElementById('success-modal');
        const message = document.getElementById('modal-message');
        
        message.textContent = `${reportName} has been deleted successfully!`;
        modal.style.display = 'block';
        
        // Simulate deletion by removing from table
        setTimeout(() => {
            location.reload();
        }, 1500);
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
