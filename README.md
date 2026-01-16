# GCTU E-Library System

A comprehensive e-library management system for Ghana Communication Technology University with separate dashboards for students and staff.

## Features

### User Roles
- **Students**: Can borrow books, renew books, reserve books, and track their reading activity
- **Staff**: Can manage student registrations, approve/reject applications, generate reports, and export data

### Student Features
- View borrowed books
- Track due dates
- Renew books
- Reserve books
- View reading statistics
- Receive notifications

### Staff Features
- Manage registration requests
- Approve/reject student applications
- View registration statistics
- Generate reports
- Export registration data as CSV
- Manage user accounts

## Default Staff Account

For testing purposes, a default staff account has been pre-configured:

**Email:** `staff@gctu.edu.gh`  
**Password:** `Staff@123`  
**Role:** Staff

Use this account to access the staff dashboard directly without needing to register.

## User Registration

New users can register by:
1. Going to the Registration page
2. Filling in their details (Full Name, Email, Role)
3. Creating a password
4. Submitting the registration form
5. Being directed to a confirmation page
6. Logging in with their credentials to access their respective dashboard

## Navigation

- **Home Page:** `/index.html` - Landing page with navigation
- **Login:** `/login.html` - Login for all users
- **Registration:** `/registration.html` - New user registration
- **Status:** `/status.html` - Registration confirmation
- **Staff Dashboard:** `/staff-dashboard.html` - Admin interface (staff only)
- **Student Dashboard:** `/student-dashboard.html` - Student interface (students only)

## How to Run

### Using Python HTTP Server
```bash
cd /workspaces/QSTACK
python3 -m http.server 8000
```

Then open your browser to:
- `http://localhost:8000/` - Home page
- `http://localhost:8000/login.html` - Login page

### Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Files Structure

```
QSTACK/
├── index.html                 # Landing page
├── login.html                # Login page
├── registration.html         # Registration form
├── status.html               # Registration confirmation
├── staff-dashboard.html      # Staff dashboard (admin)
├── student-dashboard.html    # Student dashboard
├── login.js                  # Login functionality
├── script.js                 # Registration functionality
├── status.js                 # Status page functionality
├── staff-dashboard.js        # Staff dashboard logic
├── student-dashboard.js      # Student dashboard logic
├── styles.css               # Global styling
├── images/
│   └── gctu logo.png        # GCTU logo
└── README.md                # This file
```

## Authentication Flow

1. **Registration**
   - User registers with role (Student/Staff)
   - Data is stored in sessionStorage
   - Redirected to confirmation page
   - Must login to access dashboard

2. **Login**
   - User enters credentials
   - System validates against registered accounts or default staff account
   - Role is determined from registration or default staff
   - User is redirected to appropriate dashboard

3. **Dashboard Access**
   - Dashboard checks if user is logged in
   - Dashboard verifies user role
   - Staff users access staff dashboard
   - Students access student dashboard
   - Unauthorized access is prevented

4. **Logout**
   - Clears all session data
   - Redirects to login page

## Session Storage

The application uses browser sessionStorage to maintain authentication:
- `isLoggedIn` - Boolean flag for login status
- `userEmail` - User's email address
- `userRole` - User's role (student/staff)
- `userFullName` - User's full name (for registered users)
- `registrationDate` - Registration timestamp

## Security Notes

⚠️ **This is a demo application.** In production:
- Use a proper backend server
- Implement secure password hashing
- Use JWT or sessions for authentication
- Validate all inputs on the server side
- Use HTTPS for all connections
- Implement proper access control on the backend

## Testing Scenarios

### Test as Staff
1. Go to Login page
2. Use default staff credentials:
   - Email: `staff@gctu.edu.gh`
   - Password: `Staff@123`
3. Access staff dashboard features

### Test as Student
1. Go to Registration page
2. Fill in details and select "Student" as role
3. Create account
4. Login with registered credentials
5. Access student dashboard features

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5** - Markup
- **CSS3** - Styling
- **Vanilla JavaScript** - Functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## License

© 2023 Ghana Communication Technology University (GCTU)

## Support

For issues or questions, contact the IT department at GCTU.
