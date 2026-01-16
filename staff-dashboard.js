// Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    const approveAllBtn = document.getElementById('approve-all-btn');
    const generateReportBtn = document.getElementById('generate-report-btn');
    const exportDataBtn = document.getElementById('export-data-btn');
    const confirmModal = document.getElementById('confirmation-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const confirmBtn = document.querySelector('.confirm-btn');
    const closeModal = document.querySelector('.close-modal');
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');

    let currentAction = null;

    // Quick Actions
    approveAllBtn.addEventListener('click', function() {
        currentAction = 'approve-all';
        showConfirmation('Are you sure you want to approve all pending registrations?');
    });

    generateReportBtn.addEventListener('click', function() {
        currentAction = 'generate-report';
        showConfirmation('Generate a comprehensive registration report?');
    });

    exportDataBtn.addEventListener('click', function() {
        currentAction = 'export-data';
        showConfirmation('Export all registration data as CSV?');
    });

    // Table action buttons
    approveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            const studentName = row.querySelector('td:nth-child(2)').textContent;
            currentAction = 'approve-single';
            currentAction.studentName = studentName;
            showConfirmation(`Approve registration for ${studentName}?`);
        });
    });

    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = btn.closest('tr');
            const studentName = row.querySelector('td:nth-child(2)').textContent;
            currentAction = 'reject-single';
            currentAction.studentName = studentName;
            showConfirmation(`Reject registration for ${studentName}?`);
        });
    });

    // Modal functions
    function showConfirmation(message) {
        document.getElementById('modal-message').textContent = message;
        confirmModal.classList.add('show');
    }

    function hideConfirmation() {
        confirmModal.classList.remove('show');
    }

    closeModal.addEventListener('click', hideConfirmation);

    cancelBtn.addEventListener('click', hideConfirmation);

    confirmBtn.addEventListener('click', function() {
        executeAction();
        hideConfirmation();
    });

    // Close modal when clicking outside
    confirmModal.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            hideConfirmation();
        }
    });

    // Execute actions
    function executeAction() {
        switch(currentAction) {
            case 'approve-all':
                approveAllPending();
                break;
            case 'generate-report':
                generateReport();
                break;
            case 'export-data':
                exportData();
                break;
            case 'approve-single':
                approveSingle();
                break;
            case 'reject-single':
                rejectSingle();
                break;
        }
    }

    function approveAllPending() {
        const rows = document.querySelectorAll('tbody tr');
        let approved = 0;

        rows.forEach(row => {
            const status = row.querySelector('.status-badge');
            if (status.classList.contains('status-pending')) {
                status.textContent = 'Approved';
                status.classList.remove('status-pending');
                status.classList.add('status-approved');
                approved++;
            }
        });

        showNotification(`${approved} registrations approved successfully!`);
        updateStatistics();
    }

    function generateReport() {
        const reportData = {
            generatedDate: new Date().toLocaleString(),
            totalRegistrations: document.getElementById('total-registrations').textContent,
            pendingRegistrations: document.getElementById('pending-registrations').textContent,
            approvedRegistrations: document.getElementById('approved-registrations').textContent
        };

        const report = `
GCTU Library Registration Report
================================
Generated: ${reportData.generatedDate}

Statistics:
- Total Registrations: ${reportData.totalRegistrations}
- Pending: ${reportData.pendingRegistrations}
- Approved: ${reportData.approvedRegistrations}

Report generated successfully!
        `;

        console.log(report);
        showNotification('Report generated successfully! Check console for details.');
    }

    function exportData() {
        const rows = document.querySelectorAll('tbody tr');
        let csvContent = 'ID,Student Name,Date,Status\n';

        rows.forEach(row => {
            const id = row.querySelector('td:nth-child(1)').textContent;
            const name = row.querySelector('td:nth-child(2)').textContent;
            const date = row.querySelector('td:nth-child(3)').textContent;
            const status = row.querySelector('td:nth-child(5)').textContent;

            csvContent += `${id},${name},${date},${status.trim()}\n`;
        });

        downloadCSV(csvContent, 'registrations.csv');
        showNotification('Data exported successfully!');
    }

    function approveSingle() {
        console.log('Approving single registration');
        showNotification('Registration approved!');
        updateStatistics();
    }

    function rejectSingle() {
        console.log('Rejecting single registration');
        showNotification('Registration rejected!');
        updateStatistics();
    }

    function downloadCSV(content, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    function updateStatistics() {
        // Simulate updating statistics
        const totalEl = document.getElementById('total-registrations');
        const pendingEl = document.getElementById('pending-registrations');
        const approvedEl = document.getElementById('approved-registrations');

        // Update values (in a real app, these would come from the backend)
        console.log('Statistics updated');
    }

    function showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .modal.show {
            display: flex !important;
        }
    `;
    document.head.appendChild(style);

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
});
