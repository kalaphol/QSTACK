# Quick Start Guide - PHP Backend Setup

## 5-Minute Setup

### 1. Prerequisites
- PHP 7.4+ installed
- MySQL/MariaDB running
- Web server (Apache/Nginx)

### 2. Database Setup

**Option A: Using the Setup Script**
1. Start your web server
2. Open browser: `http://localhost:8000/backend/setup-database.php`
3. Done! Database and tables created automatically

**Option B: Manual MySQL**
```bash
mysql -u root -p

CREATE DATABASE gctu_elibrary CHARACTER SET utf8mb4;
USE gctu_elibrary;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT 0,
    verification_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

### 3. Configure Backend

Edit `backend/config/database.php`:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');           // Your MySQL user
define('DB_PASS', '');               // Your MySQL password
define('DB_NAME', 'gctu_elibrary');
```

### 4. Run Application
```bash
# Start PHP built-in server
php -S localhost:8000

# Or use your web server
# Visit: http://localhost:8000
```

## Testing the Backend

### Test Registration
```bash
curl -X POST http://localhost:8000/backend/api/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@students.gctu.edu.gh",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:8000/backend/api/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@students.gctu.edu.gh",
    "password": "TestPass123"
  }'
```

## Common Issues

| Issue | Solution |
|-------|----------|
| "Database connection failed" | Check MySQL is running & credentials in database.php |
| "Email already registered" | Use a different email address |
| "Invalid GCTU email" | Use @gctu.edu.gh or @students.gctu.edu.gh |
| "CORS error in console" | Update API_URL in script.js and login.js to match your server |
| "Password too weak" | Use: Uppercase, lowercase, number, 8+ characters |

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/backend/api/register.php` | Register new user |
| POST | `/backend/api/login.php` | Login user |
| POST | `/backend/api/logout.php` | Logout user |
| GET | `/backend/api/profile.php` | Get user profile |
| PUT | `/backend/api/profile.php` | Update user profile |
| POST | `/backend/api/change-password.php` | Change password |

## File Structure
```
QSTACK/
├── backend/
│   ├── config/
│   │   ├── database.php         ← Edit database credentials here
│   │   └── constants.php
│   ├── includes/
│   │   ├── headers.php
│   │   └── functions.php
│   ├── api/
│   │   ├── register.php
│   │   ├── login.php
│   │   ├── logout.php
│   │   ├── profile.php
│   │   └── change-password.php
│   └── setup-database.php       ← Run this first
├── index.html                    ← Registration page
├── login.html                    ← Login page
├── script.js                     ← Updated for backend
├── login.js                      ← Updated for backend
└── style.css
```

## Next Steps

1. ✅ Set up database
2. ✅ Configure database.php
3. ✅ Start web server
4. ✅ Test registration
5. ✅ Test login
6. 📝 Create dashboard page (dashboard.html)
7. 📝 Add password reset feature
8. 📝 Implement email verification

## Dashboard Page Example

Create `dashboard.html` to redirect after login:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard - GCTU E-Library</title>
</head>
<body>
    <h1>Welcome to GCTU E-Library</h1>
    <div id="userInfo"></div>
    <button onclick="logout()">Logout</button>
    
    <script>
        // Get user info from sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user'));
        document.getElementById('userInfo').innerHTML = 
            `<h2>Hello, ${user.fullName}</h2><p>Email: ${user.email}</p>`;
        
        async function logout() {
            await fetch('http://localhost:8000/backend/api/logout.php', {
                method: 'POST'
            });
            window.location.href = 'login.html';
        }
    </script>
</body>
</html>
```

## Security Reminders

⚠️ **For Development Only:**
- CORS is open to all origins
- Sensitive errors shown in responses
- Email verification disabled

🔒 **For Production:**
- Update CORS to your domain only
- Hide error messages
- Enable email verification
- Use HTTPS
- Strong database passwords
- Regular security audits

---

**Need Help?** Check BACKEND_README.md for detailed documentation.
