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
    
    initializeUsers();
});

// Initialize users page
function initializeUsers() {
    const searchInput = document.getElementById('search-users');
    const roleFilter = document.getElementById('role-filter');
    const statusFilter = document.getElementById('status-filter');
    const logoutBtn = document.getElementById('logout-btn');
    const modal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    // Search and filter functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    }
    if (roleFilter) {
        roleFilter.addEventListener('change', filterUsers);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterUsers);
    }
    
    // Action buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const suspendButtons = document.querySelectorAll('.suspend-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            editUser(this.closest('tr'));
        });
    });
    
    suspendButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            suspendUser(this.closest('tr'));
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            deleteUser(this.closest('tr'));
        });
    });
    
    // Modal controls
    closeModal.addEventListener('click', closeActionModal);
    confirmBtn.addEventListener('click', closeActionModal);
}

// Filter users based on search and filters
function filterUsers() {
    const searchInput = document.getElementById('search-users').value.toLowerCase();
    const roleFilter = document.getElementById('role-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const tableRows = document.querySelectorAll('.users-table tbody tr');
    
    tableRows.forEach(row => {
        const userId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const role = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        const status = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
        
        const matchesSearch = userId.includes(searchInput) || name.includes(searchInput) || email.includes(searchInput);
        const matchesRole = roleFilter === 'all' || role.includes(roleFilter.toLowerCase());
        const matchesStatus = statusFilter === 'all' || status.includes(statusFilter.toLowerCase());
        
        row.style.display = (matchesSearch && matchesRole && matchesStatus) ? '' : 'none';
    });
}

// Edit user
function editUser(row) {
    const userId = row.querySelector('td:nth-child(1)').textContent;
    const name = row.querySelector('td:nth-child(2)').textContent;
    const email = row.querySelector('td:nth-child(3)').textContent;
    
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('modal-message');
    
    message.innerHTML = `<strong>Edit User</strong><br><br>
        User ID: ${userId}<br>
        Name: ${name}<br>
        Email: ${email}<br><br>
        User information has been loaded for editing.`;
    
    modal.style.display = 'block';
}

// Suspend user
function suspendUser(row) {
    const userId = row.querySelector('td:nth-child(1)').textContent;
    const name = row.querySelector('td:nth-child(2)').textContent;
    
    if (confirm(`Are you sure you want to suspend user ${name}?`)) {
        const modal = document.getElementById('success-modal');
        const message = document.getElementById('modal-message');
        
        message.textContent = `User ${name} (${userId}) has been suspended successfully!`;
        modal.style.display = 'block';
        
        // Update status in table
        row.querySelector('td:nth-child(6)').innerHTML = '<span class="status-badge suspended">Suspended</span>';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
    }
}

// Delete user
function deleteUser(row) {
    const userId = row.querySelector('td:nth-child(1)').textContent;
    const name = row.querySelector('td:nth-child(2)').textContent;
    
    if (confirm(`Are you sure you want to delete user ${name}? This action cannot be undone.`)) {
        const modal = document.getElementById('success-modal');
        const message = document.getElementById('modal-message');
        
        message.textContent = `User ${name} (${userId}) has been deleted successfully!`;
        modal.style.display = 'block';
        
        // Remove row from table
        setTimeout(() => {
            row.remove();
            modal.style.display = 'none';
        }, 1500);
    }
}

// Close modal
function closeActionModal() {
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
