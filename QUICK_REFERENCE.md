# Quick Reference - Page Navigation Guide

## For End Users

### 🏠 Starting Point
- Go to `index.html` or `http://localhost:8000/`

### 👤 New User Registration
1. Home → "Register Now"
2. Fill registration form
3. View registration status
4. Go to Login → Enter credentials
5. Access appropriate dashboard

### 👤 Existing User Login
1. Home → "Login" OR Home → "Go to Dashboard"
2. Enter credentials (or use test account)
3. Access appropriate dashboard

### 🔐 Default Test Account
```
Email: staff@gctu.edu.gh
Password: Staff@123
```

### 🚪 Logout
- Click logout button (top right) on any dashboard page
- Session cleared, redirected to login

---

## For Developers - Page Structure

### HTML Pages (9 Total)
```
index.html              → Home/Landing page
login.html             → User login
registration.html      → New user registration
status.html            → Registration confirmation
staff-dashboard.html   → Staff main interface
student-dashboard.html → Student main interface
reports.html           → Staff reports (admin only)
users.html             → User management (admin only)
settings.html          → Settings (role-aware)
```

### JavaScript Files (9 Total)
```
logout.js              → Logout functionality (included on all dashboard pages)
login.js               → Login form validation & authentication
script.js              → Registration form validation
status.js              → Status page logic
staff-dashboard.js     → Staff dashboard functions
student-dashboard.js   → Student dashboard functions
reports.js             → Reports page functions
users.js               → Users page functions
settings.js            → Settings page logic (role-aware)
```

### CSS Styling
```
styles.css             → All global styling
```

### Images
```
images/gctu logo.png   → University logo used across all pages
```

---

## Session Storage Keys

```javascript
sessionStorage.setItem('isLoggedIn', 'true' | 'false');
sessionStorage.setItem('userEmail', 'user@example.com');
sessionStorage.setItem('userRole', 'staff' | 'student');
sessionStorage.setItem('userFullName', 'Full Name');
sessionStorage.setItem('registrationDate', 'ISO Date');
```

---

## Protection & Authentication Patterns

### Redirect Logic
```
Unauthenticated → login.html
Staff on Student page → staff-dashboard.html
Student on Staff page → student-dashboard.html
```

### Example Protection Code
```javascript
const isLoggedIn = sessionStorage.getItem('isLoggedIn');
const userRole = sessionStorage.getItem('userRole');

if (!isLoggedIn) {
    window.location.href = 'login.html';
}

if (userRole !== 'staff') {
    window.location.href = 'student-dashboard.html';
}
```

---

## Navigation Hierarchy

### **Staff Navigation**
```
Dashboard ←→ Reports ←→ Users ←→ Settings
   ↓          ↓          ↓        ↓
 Logout      Logout     Logout   Logout
   ↓          ↓          ↓        ↓
login.html (with session cleared)
```

### **Student Navigation**
```
Dashboard ←→ My Books ←→ Settings
   ↓            ↓           ↓
 Logout       Logout      Logout
   ↓            ↓           ↓
login.html (with session cleared)
```

### **Public Navigation**
```
Home ←→ Login ←→ Registration ← (status) → Login
 ↑                  ↑
 └──────────────────┘
     (Back to Home)
```

---

## Role-Aware Features

### Settings Page
```javascript
if (userRole === 'staff') {
    Show: Dashboard, Reports, Users
} else {
    Show: Dashboard (Student)
}
```

### Settings Navigation
```html
<a href="staff-dashboard.html" class="nav-item staff-nav">Dashboard</a>
<a href="student-dashboard.html" class="nav-item student-nav">Dashboard</a>

<!-- Staff nav hidden for students, student nav hidden for staff -->
```

---

## Common Workflows

### 1️⃣ New Staff Member Registration
1. Home → Register
2. Enter details, select "Staff"
3. Status page → Login with credentials
4. Access to: Dashboard, Reports, Users, Settings

### 2️⃣ New Student Registration
1. Home → Register
2. Enter details, select "Student"
3. Status page → Login with credentials
4. Access to: Dashboard, My Books, Settings

### 3️⃣ Testing with Default Account
1. Home → Login
2. Email: `staff@gctu.edu.gh`
3. Password: `Staff@123`
4. Instant access to full staff dashboard

### 4️⃣ Role-Aware Redirects
- Staff accessing student page → redirects to staff dashboard
- Student accessing staff page → redirects to student dashboard
- Anyone not logged in → redirects to login page

---

## Testing Endpoints

### Local Development (Python HTTP Server)
```bash
python3 -m http.server 8000
```

### URLs to Test
```
http://localhost:8000/                  (Home)
http://localhost:8000/login.html        (Login)
http://localhost:8000/registration.html (Register)
http://localhost:8000/staff-dashboard.html      (Staff - protected)
http://localhost:8000/student-dashboard.html    (Student - protected)
```

---

## Logout Flow
```
User clicks Logout button
        ↓
logout.js runs
        ↓
sessionStorage.clear() - removes all session data
        ↓
window.location.href = 'login.html'
        ↓
Session is cleared, user must log in again
```

---

## Key Features

✅ **Role-Based Access Control** - Staff and students see appropriate content
✅ **Session Management** - Secure session handling with sessionStorage
✅ **Protected Pages** - All dashboard pages require authentication
✅ **Responsive Design** - Works on desktop and mobile
✅ **Intuitive Navigation** - Consistent navigation across all pages
✅ **Error Handling** - Modal-based error messages
✅ **Form Validation** - Real-time validation on registration/login
✅ **Quick Logout** - One-click logout with session clearing
