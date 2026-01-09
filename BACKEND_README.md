# GCTU E-Library Backend Documentation

## Overview
This is a PHP backend for the GCTU E-Library Registration system. It provides user authentication, registration, and account management APIs.

## Backend Structure

```
backend/
├── config/
│   ├── database.php      # Database connection configuration
│   └── constants.php     # Application constants and messages
├── includes/
│   ├── headers.php       # CORS and API headers
│   └── functions.php     # Helper functions
├── api/
│   ├── register.php      # User registration endpoint
│   ├── login.php         # User login endpoint
│   ├── logout.php        # User logout endpoint
│   ├── profile.php       # User profile management
│   └── change-password.php # Password change endpoint
└── setup-database.php    # Database initialization script
```

## Requirements

- **PHP**: 7.4 or higher
- **MySQL**: 5.7 or higher
- **Server**: Apache, Nginx, or similar
- **Extensions**: mysqli (MySQL extension)

## Installation & Setup

### Step 1: Configure Database Connection

Edit `backend/config/database.php` and update the database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'gctu_elibrary');
```

### Step 2: Initialize Database

Access the setup script in your browser:
```
http://localhost:8000/backend/setup-database.php
```

This will create:
- Database: `gctu_elibrary`
- Tables: `users`, `activity_logs`

### Step 3: Configure API URL

Update the `API_URL` in your frontend JavaScript files:

**script.js** (Registration page)
```javascript
const API_URL = 'http://localhost:8000/backend/api';
```

**login.js** (Login page)
```javascript
const API_URL = 'http://localhost:8000/backend/api';
```

## API Endpoints

### 1. User Registration
**POST** `/backend/api/register.php`

**Request:**
```json
{
    "fullName": "John Doe",
    "email": "john@students.gctu.edu.gh",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "message": "Registration successful. Please check your email for verification.",
    "data": {
        "email": "john@students.gctu.edu.gh",
        "fullName": "John Doe",
        "message": "Your account has been created. You can now login."
    }
}
```

**Response (Error):**
```json
{
    "success": false,
    "message": "This email is already registered"
}
```

### 2. User Login
**POST** `/backend/api/login.php`

**Request:**
```json
{
    "email": "john@students.gctu.edu.gh",
    "password": "SecurePass123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user_id": 1,
        "email": "john@students.gctu.edu.gh",
        "fullName": "John Doe",
        "isVerified": false
    }
}
```

### 3. User Logout
**POST** `/backend/api/logout.php`

**Response:**
```json
{
    "success": true,
    "message": "Logout successful"
}
```

### 4. Get User Profile
**GET** `/backend/api/profile.php`

**Response:**
```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {
        "id": 1,
        "full_name": "John Doe",
        "email": "john@students.gctu.edu.gh",
        "is_verified": false,
        "created_at": "2024-01-09 10:30:00"
    }
}
```

### 5. Update User Profile
**PUT** `/backend/api/profile.php`

**Request:**
```json
{
    "fullName": "Jane Doe"
}
```

### 6. Change Password
**POST** `/backend/api/change-password.php`

**Request:**
```json
{
    "currentPassword": "SecurePass123",
    "newPassword": "NewSecurePass456",
    "confirmPassword": "NewSecurePass456"
}
```

## Validation Rules

### Email
- Must be a valid GCTU email: `@gctu.edu.gh` or `@students.gctu.edu.gh`
- Example: `john@students.gctu.edu.gh`

### Password
- Minimum 8 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

### Full Name
- 2-50 characters
- Letters and spaces only

## Database Schema

### users table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT 0,
    verification_token VARCHAR(255),
    verification_token_expires DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME
);
```

### activity_logs table
```sql
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Security Features

1. **Password Hashing**: Bcrypt with cost 12
2. **Input Validation**: All inputs are validated and sanitized
3. **CORS Protection**: Configured for local development
4. **Session Management**: 30-minute session timeout
5. **Activity Logging**: All user actions are logged
6. **SQL Injection Prevention**: Using prepared statements

## Error Handling

All API responses follow a consistent format:

**Success Response:**
```json
{
    "success": true,
    "message": "Operation message",
    "data": {}
}
```

**Error Response:**
```json
{
    "success": false,
    "message": "Error message"
}
```

## HTTP Status Codes

- `200 OK` - Successful operation
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication failed
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

## Environment Variables

Update these settings in `backend/config/constants.php` or `database.php`:

- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASS` - Database password
- `DB_NAME` - Database name
- `APP_URL` - Application base URL
- `SESSION_TIMEOUT` - Session timeout in seconds (default: 1800)

## Development Notes

### CORS Configuration
CORS is enabled for all origins in development. Update `backend/includes/headers.php` for production:

```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### Email Sending
Email verification is currently disabled in `register.php`. To enable:

1. Uncomment the `sendVerificationEmail()` call in `register.php`
2. Configure your mail server or use a service like PHPMailer

### Password Reset
Implement password reset functionality:
- Create a `forgot-password.php` endpoint
- Generate verification tokens
- Send reset links via email
- Validate tokens before allowing password change

## Extending the Backend

### Add New API Endpoint

1. Create file: `backend/api/new-endpoint.php`
2. Include required files:
   ```php
   require_once __DIR__ . '/../includes/headers.php';
   require_once __DIR__ . '/../config/database.php';
   require_once __DIR__ . '/../config/constants.php';
   require_once __DIR__ . '/../includes/functions.php';
   ```
3. Implement your logic
4. Return JSON response using `sendResponse()`

### Add New Database Table

1. Create migration in database initialization script
2. Update `setup-database.php` with new table creation SQL
3. Add helper functions in `includes/functions.php`

## Troubleshooting

### "Database connection failed"
- Check database credentials in `config/database.php`
- Ensure MySQL server is running
- Verify database exists

### "CORS error"
- Check `Access-Control-Allow-Origin` header in `includes/headers.php`
- Update to your frontend URL in production

### "Email already registered"
- The email already exists in the database
- User should use a different email or login if they have an account

### "Invalid GCTU email"
- Email must end with `@gctu.edu.gh` or `@students.gctu.edu.gh`
- Check email format

## Performance Optimization

1. Add database indexes for frequently queried columns
2. Implement caching for user data
3. Use connection pooling for high traffic
4. Optimize database queries
5. Consider implementing API rate limiting

## Production Deployment

1. Change `APP_URL` to your production domain
2. Update CORS configuration for your domain
3. Enable email verification
4. Implement password reset functionality
5. Use HTTPS for all connections
6. Configure proper error logging
7. Set strong database credentials
8. Regular database backups
9. Monitor activity logs

## Support & Maintenance

For updates or additional features:
- Check the activity logs in the database
- Monitor failed login attempts
- Regular security audits
- Keep PHP and MySQL updated

---

**Last Updated**: January 2024
**Version**: 1.0.0
