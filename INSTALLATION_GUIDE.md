# GCTU E-Library Backend - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Testing](#testing)
4. [API Documentation](#api-documentation)
5. [Troubleshooting](#troubleshooting)
6. [Production Deployment](#production-deployment)

---

## Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or MariaDB 10.2+
- Apache/Nginx web server
- curl (for testing)

### Step 1: Extract Files
The backend files are already in place in the `/workspaces/QSTACK/backend/` directory.

### Step 2: Configure Database Connection

Edit `backend/config/database.php`:

```php
define('DB_HOST', 'localhost');      // Your database host
define('DB_USER', 'root');           // Your MySQL username
define('DB_PASS', '');               // Your MySQL password
define('DB_NAME', 'gctu_elibrary');  // Database name
define('DB_PORT', 3306);             // MySQL port
```

### Step 3: Create Database & Tables

**Method A: Using Setup Script (Recommended)**
```bash
# Start your web server
php -S localhost:8000

# Visit in browser
http://localhost:8000/backend/setup-database.php
```

**Method B: Using MySQL Console**
```bash
mysql -u root -p

CREATE DATABASE gctu_elibrary CHARACTER SET utf8mb4;
USE gctu_elibrary;

# Run the tables creation SQL
# (See section below for SQL)
```

**Method C: Using Command Line**
```bash
mysql -u root -p gctu_elibrary < backend/setup-database.sql
```

### Step 4: Verify Installation

Create a test file `test.php`:
```php
<?php
// Test database connection
require_once 'backend/config/database.php';

if ($conn) {
    echo "✅ Database connection successful!";
} else {
    echo "❌ Database connection failed!";
}
?>
```

Access: `http://localhost:8000/test.php`

---

## Configuration

### Environment Variables

Create `.env` file in root directory (optional):
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=gctu_elibrary
DB_PORT=3306
APP_URL=http://localhost:8000
```

Load in `database.php`:
```php
if (file_exists(__DIR__ . '/../../.env')) {
    $env = parse_ini_file(__DIR__ . '/../../.env');
    define('DB_HOST', $env['DB_HOST']);
    // ... etc
}
```

### CORS Configuration

For production, update `backend/includes/headers.php`:

```php
// Development (allow all origins)
header('Access-Control-Allow-Origin: *');

// Production (specific domain)
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### Session Configuration

Configure timeout in `backend/config/constants.php`:
```php
define('SESSION_TIMEOUT', 1800); // 30 minutes
```

### Email Configuration

To enable email verification:

1. Create `backend/api/send-email.php`:
```php
<?php
require_once __DIR__ . '/../config/constants.php';

function sendEmail($to, $subject, $message) {
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: noreply@gctu.edu.gh\r\n";
    
    return mail($to, $subject, $message, $headers);
}
?>
```

2. Update `register.php` to enable email:
```php
// Uncomment this line in register.php
sendVerificationEmail($email, $fullName, $verificationToken);
```

---

## Testing

### Using Interactive Testing Tool
```
http://localhost:8000/backend/test-api.php
```

Features:
- Beautiful UI for all endpoints
- Real-time responses
- No external tools needed
- Error handling

### Using curl

**Register User**
```bash
curl -X POST http://localhost:8000/backend/api/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@students.gctu.edu.gh",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

**Login User**
```bash
curl -X POST http://localhost:8000/backend/api/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@students.gctu.edu.gh",
    "password": "SecurePass123"
  }'
```

**Get Profile**
```bash
curl -X GET http://localhost:8000/backend/api/profile.php \
  -H "Cookie: PHPSESSID=your_session_id"
```

### Using Postman

1. Import collection from `backend/postman-collection.json`
2. Set `{{base_url}}` variable to `http://localhost:8000/backend/api`
3. Test each endpoint

---

## API Documentation

### Base URL
```
http://localhost:8000/backend/api
```

### Response Format

**Success**
```json
{
    "success": true,
    "message": "Operation message",
    "data": { /* data object */ }
}
```

**Error**
```json
{
    "success": false,
    "message": "Error message"
}
```

### Endpoints

#### 1. Register
```
POST /register.php
```

**Request**
```json
{
    "fullName": "John Doe",
    "email": "john@students.gctu.edu.gh",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
}
```

**Validation**
- Email must be @gctu.edu.gh or @students.gctu.edu.gh
- Password: 8+ chars, uppercase, lowercase, number
- Name: 2-50 chars, letters & spaces

**Response (201 Created)**
```json
{
    "success": true,
    "message": "Registration successful...",
    "data": {
        "email": "john@students.gctu.edu.gh",
        "fullName": "John Doe"
    }
}
```

#### 2. Login
```
POST /login.php
```

**Request**
```json
{
    "email": "john@students.gctu.edu.gh",
    "password": "SecurePass123"
}
```

**Response (200 OK)**
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

#### 3. Logout
```
POST /logout.php
```

**Response (200 OK)**
```json
{
    "success": true,
    "message": "Logout successful"
}
```

#### 4. Get Profile
```
GET /profile.php
```

**Headers**
```
Authorization: Bearer <session_id>
```

**Response (200 OK)**
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

#### 5. Update Profile
```
PUT /profile.php
```

**Request**
```json
{
    "fullName": "Jane Doe"
}
```

**Response (200 OK)**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": { /* updated user */ }
}
```

#### 6. Change Password
```
POST /change-password.php
```

**Request**
```json
{
    "currentPassword": "SecurePass123",
    "newPassword": "NewSecurePass456",
    "confirmPassword": "NewSecurePass456"
}
```

**Response (200 OK)**
```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

---

## Troubleshooting

### Issue: "Database connection failed"

**Cause**: MySQL credentials incorrect or server not running

**Solution**:
1. Check MySQL is running: `mysql -u root -p`
2. Verify credentials in `database.php`
3. Check database exists: `SHOW DATABASES;`

### Issue: "Email already registered"

**Cause**: Email exists in database

**Solution**:
- Use a different email address
- Check `SELECT * FROM users WHERE email='...';`

### Issue: "Invalid GCTU email"

**Cause**: Email doesn't match GCTU domain

**Solution**:
- Use @gctu.edu.gh or @students.gctu.edu.gh
- Example: john@students.gctu.edu.gh

### Issue: "CORS error in browser console"

**Cause**: API URL mismatch

**Solution**:
1. Check API_URL in `script.js` and `login.js`
2. Verify backend is running on same port
3. Update CORS header in `headers.php`

### Issue: "Password too weak"

**Cause**: Password doesn't meet requirements

**Requirements**:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

**Example**: `SecurePass123` ✅

### Issue: "Sessions not working"

**Cause**: PHP session configuration

**Solution**:
1. Check session.save_path in php.ini
2. Ensure /tmp is writable: `chmod 777 /tmp`
3. Restart web server

### Issue: "404 Not Found" on API endpoints

**Cause**: Incorrect URL or file doesn't exist

**Solution**:
1. Check file exists: `ls backend/api/`
2. Verify correct endpoint URL
3. Check .htaccess permissions

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Update database credentials
- [ ] Change APP_URL to production domain
- [ ] Enable HTTPS/SSL
- [ ] Update CORS for production domain
- [ ] Enable email verification
- [ ] Configure error logging
- [ ] Set strong database password
- [ ] Disable debug mode
- [ ] Configure firewall
- [ ] Set up regular backups

### Server Setup

**1. Apache Configuration**
```apache
<VirtualHost *:443>
    ServerName api.gctu.edu.gh
    DocumentRoot /var/www/gctu-elibrary
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/gctu.crt
    SSLCertificateKeyFile /etc/ssl/private/gctu.key
    
    <Directory /var/www/gctu-elibrary>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**2. Nginx Configuration**
```nginx
server {
    listen 443 ssl http2;
    server_name api.gctu.edu.gh;
    root /var/www/gctu-elibrary;
    
    ssl_certificate /etc/ssl/certs/gctu.crt;
    ssl_certificate_key /etc/ssl/private/gctu.key;
    
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
```

### Security Hardening

**1. File Permissions**
```bash
chmod 755 /var/www/gctu-elibrary
chmod 644 /var/www/gctu-elibrary/*.html
chmod 600 /var/www/gctu-elibrary/backend/config/*.php
chmod 755 /var/www/gctu-elibrary/backend
```

**2. Database Security**
```sql
-- Create dedicated database user
CREATE USER 'gctu_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT SELECT,INSERT,UPDATE,DELETE ON gctu_elibrary.* TO 'gctu_user'@'localhost';
FLUSH PRIVILEGES;
```

**3. PHP Configuration**
```ini
; php.ini
display_errors = Off
log_errors = On
error_log = /var/log/php-errors.log
upload_max_filesize = 50M
post_max_size = 50M
session.cookie_httponly = On
session.cookie_secure = On
session.cookie_samesite = Strict
```

### Monitoring & Logging

**1. Error Logging**
```php
// In database.php
ini_set('log_errors', 1);
ini_set('error_log', '/var/log/gctu-elibrary/error.log');
```

**2. Activity Monitoring**
```bash
# Monitor logs
tail -f /var/log/gctu-elibrary/error.log
tail -f /var/log/apache2/access.log
```

**3. Database Backups**
```bash
# Daily backup
mysqldump -u gctu_user -p gctu_elibrary > /backups/gctu_$(date +\%Y\%m\%d).sql

# Automated cron job
0 2 * * * mysqldump -u gctu_user -p gctu_elibrary > /backups/gctu_$(date +\%Y\%m\%d).sql
```

### Performance Optimization

**1. Database Optimization**
```sql
-- Add indexes
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE activity_logs ADD INDEX idx_user_id (user_id);
ALTER TABLE activity_logs ADD INDEX idx_created_at (created_at);
```

**2. Query Caching**
```php
// Implement simple caching
class Cache {
    private $file;
    
    public function get($key) {
        $file = "/tmp/cache_$key";
        if (file_exists($file) && time() - filemtime($file) < 3600) {
            return unserialize(file_get_contents($file));
        }
        return null;
    }
}
```

**3. Load Balancing**
```
Primary Server (API)
    ↓
Load Balancer
    ↓
├─ Web Server 1
├─ Web Server 2
└─ Web Server 3
    ↓
Shared Database
```

---

## Support & Maintenance

### Regular Maintenance
- Monitor error logs daily
- Check database size weekly
- Verify backups working monthly
- Security updates as released
- Performance optimization quarterly

### Useful Commands

```bash
# Check PHP version
php -v

# Check MySQL connection
mysql -u root -p -e "SELECT VERSION();"

# Check Apache modules
apache2ctl -M | grep php

# Monitor disk space
df -h

# Monitor memory
free -h

# Check active PHP sessions
ls -la /var/lib/php/sessions/
```

---

## Additional Resources

- [PHP Official Documentation](https://www.php.net/manual/)
- [MySQL Official Documentation](https://dev.mysql.com/doc/)
- [OWASP Security Best Practices](https://owasp.org/)
- [PHP Security](https://www.php.net/manual/en/security.php)

---

**Last Updated**: January 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
