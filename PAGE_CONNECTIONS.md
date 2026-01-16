# GCTU E-Library System - Page Connections Map

## Navigation Flow Overview

### 1. **Home Page** (`index.html`)
- **Accessible without login**
- **Navigation options:**
  - ✅ Go to Dashboard (redirects based on login status & role)
    - If logged in as staff → `staff-dashboard.html`
    - If logged in as student → `student-dashboard.html`
    - If not logged in → `login.html`
  - ✅ Register Now → `registration.html`
  - ✅ Login → `login.html`

---

### 2. **Login Page** (`login.html`)
- **Accessible without login**
- **Authentication:**
  - Default staff account: `staff@gctu.edu.gh` / `Staff@123` → Staff Dashboard
  - Registered users: Redirects to appropriate dashboard based on role
- **Navigation links:**
  - ✅ Register Now → `registration.html`
  - ✅ Back to Home → `index.html`
- **Logout script:** `logout.js` ✅

---

### 3. **Registration Page** (`registration.html`)
- **Accessible without login**
- **Functionality:**
  - Collect user details (Name, Email, Role, Password)
  - Store in sessionStorage
  - Redirect to status page after registration
- **Navigation links:**
  - ✅ Login Here → `login.html`
  - ✅ Back to Home → `index.html`
- **Redirect:** → `status.html` (after registration)

---

### 4. **Registration Status Page** (`status.html`)
- **Accessible after registration**
- **Functionality:**
  - Shows registration confirmation message
  - Account Status: "Pending"
- **Navigation links:**
  - ✅ Go to Login → `login.html`
  - ✅ Back to Home → `index.html`
- **Script:** `status.js` ✅

---

### 5. **Staff Dashboard** (`staff-dashboard.html`)
- **Protected - Requires authentication & staff role**
- **Features:**
  - Registration statistics
  - Recent registration requests management
  - Quick actions (Approve All, Generate Report, Export Data)
- **Navigation bar:**
  - ✅ Dashboard (active) → `staff-dashboard.html`
  - ✅ Reports → `reports.html`
  - ✅ Users → `users.html`
  - ✅ Settings → `settings.html`
  - ✅ Logout → Clears session, redirects to `login.html`
- **Scripts:**
  - `staff-dashboard.js` ✅
  - `logout.js` ✅

---

### 6. **Reports Page** (`reports.html`)
- **Protected - Requires authentication & staff role**
- **Features:**
  - Generate reports (Registration, Activity, Statistical, Library)
  - View and manage recent reports
  - Download and delete reports
- **Navigation bar:**
  - ✅ Dashboard → `staff-dashboard.html`
  - ✅ Reports (active) → `reports.html`
  - ✅ Users → `users.html`
  - ✅ Settings → `settings.html`
  - ✅ Logout → Clears session, redirects to `login.html`
- **Scripts:**
  - `reports.js` ✅
  - `logout.js` ✅

---

### 7. **Users Page** (`users.html`)
- **Protected - Requires authentication & staff role**
- **Features:**
  - User statistics (Total, Active, Suspended)
  - User management (search, filter, edit, suspend, delete)
- **Navigation bar:**
  - ✅ Dashboard → `staff-dashboard.html`
  - ✅ Reports → `reports.html`
  - ✅ Users (active) → `users.html`
  - ✅ Settings → `settings.html`
  - ✅ Logout → Clears session, redirects to `login.html`
- **Scripts:**
  - `users.js` ✅
  - `logout.js` ✅

---

### 8. **Student Dashboard** (`student-dashboard.html`)
- **Protected - Requires authentication & student role**
- **Features:**
  - Student statistics (Books Borrowed, Books Due, Reading Points)
  - My Borrowed Books section
  - Quick actions (Search Books, Renew Book, Reserve Book)
- **Navigation bar:**
  - ✅ Dashboard (active) → `student-dashboard.html`
  - ✅ My Books → `student-dashboard.html`
  - ✅ Settings → `settings.html` (role-aware)
  - ✅ Logout → Clears session, redirects to `login.html`
- **Scripts:**
  - `student-dashboard.js` ✅
  - `logout.js` ✅

---

### 9. **Settings Page** (`settings.html`)
- **Protected - Requires authentication (both staff & students)**
- **Features:**
  - Role-aware navigation display
  - Different settings based on user role
  - General settings (Library Name, Email, Phone, Hours)
  - Book Management settings (Max books, Duration, Renewal Limit, Late Fee)
- **Navigation bar (Dynamic):**
  - **For Staff:**
    - ✅ Dashboard → `staff-dashboard.html`
    - ✅ Reports → `reports.html`
    - ✅ Users → `users.html`
  - **For Students:**
    - ✅ Dashboard → `student-dashboard.html`
  - ✅ Settings (active) → `settings.html`
  - ✅ Logout → Clears session, redirects to `login.html`
- **Scripts:**
  - `settings.js` (role-aware) ✅
  - `logout.js` ✅

---

## Authentication & Session Management

### Session Storage Keys:
- `isLoggedIn`: "true" / "false"
- `userEmail`: User's email address
- `userRole`: "staff" or "student"
- `userFullName`: User's full name (from registration)
- `registrationDate`: ISO timestamp of registration

### Authentication Checks:
- All protected pages check `isLoggedIn` status
- Role-based redirects:
  - Staff trying to access student dashboard → redirected to staff dashboard
  - Student trying to access staff pages → redirected to student dashboard
  - Unauthenticated users → redirected to login page

---

## Page Connection Summary

```
┌─────────────────────────────────────────────────────────┐
│                   HOME PAGE (index.html)                 │
│                                                          │
│  ├─→ Dashboard (role-based redirect)                   │
│  ├─→ Register Now                                      │
│  └─→ Login                                             │
└─────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
    ┌─────────────────────────────────────────────────────┐
    │              REGISTRATION FLOW                       │
    │                                                      │
    │  Registration → Status → Login → Dashboard          │
    └─────────────────────────────────────────────────────┘
         ↓                                        ↓
    ┌──────────────────┐              ┌─────────────────────┐
    │  STAFF ACCESS    │              │  STUDENT ACCESS     │
    │                  │              │                     │
    │ • Dashboard      │              │ • Dashboard         │
    │ • Reports        │              │ • My Books          │
    │ • Users          │              │ • Settings          │
    │ • Settings       │              │ • Logout            │
    │ • Logout         │              │                     │
    └──────────────────┘              └─────────────────────┘
         ↓                                      ↓
    All pages fully interconnected     All pages fully interconnected
    with logout capability            with logout capability
```

---

## ✅ Connection Checklist

- ✅ Home page connects to all main entry points
- ✅ Login redirects based on user role
- ✅ Registration flow completes with status page
- ✅ Staff pages interconnected with shared navigation
- ✅ Student dashboard connects to settings
- ✅ Settings page is role-aware (visible navigation changes)
- ✅ All logout buttons clear session and redirect to login
- ✅ Protected pages check authentication status
- ✅ Role-based redirects prevent unauthorized access
- ✅ Back to Home links provided on login and registration pages
- ✅ All JavaScript files included properly

---

## How to Test the Connections

1. **Test Registration Flow:**
   - Go to Home → Register → Complete form → Should see Status page
   - From Status → Go to Login → Login → Should see Dashboard

2. **Test Staff Access:**
   - Login with `staff@gctu.edu.gh` / `Staff@123`
   - Navigate between Dashboard → Reports → Users → Settings
   - Verify navigation updates "active" state
   - Click Logout → Should clear session and return to login

3. **Test Student Access:**
   - Register as Student or Login (email not staff)
   - Should see Student Dashboard
   - Navigate to Settings → Should see Student-specific navigation
   - Click Logout → Should clear session and return to login

4. **Test Protection:**
   - Try accessing Staff pages without login → Should redirect to login
   - Try accessing Staff pages as Student → Should redirect to Student Dashboard
   - Try accessing Student pages as Staff → Should redirect to Staff Dashboard
