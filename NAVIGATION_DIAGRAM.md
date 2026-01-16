# GCTU E-Library - Complete Navigation Diagram

## 🌐 Full System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     GCTU E-LIBRARY SYSTEM                        │
└──────────────────────────────────────────────────────────────────┘

                         ┌─────────────────┐
                         │  Home Page      │
                         │ (index.html)    │
                         └────────┬────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
                ▼                 ▼                 ▼
        ┌─────────────┐  ┌──────────────┐  ┌───────────────┐
        │  Register   │  │    Login     │  │  Dashboard    │
        │    Link     │  │    Link      │  │   Link        │
        └─────────────┘  └──────────────┘  │ (Auto-Route)  │
                │              │           └───────┬───────┘
                │              │                   │
                ▼              ▼                   │
        ┌─────────────┐  ┌──────────────┐         │
        │Registration │  │    Login     │◄────────┘
        │    Form     │  │    Form      │
        │ (register   │  │  (login.html)│
        │  .html)     │  │              │
        └─────────────┘  └──────────────┘
                │              │
                │         ┌────┴────┐
                │         │ Role?   │
                ▼         └────┬────┘
        ┌──────────────┐       │
        │   Status     │  ┌────┴─────────────┐
        │     Page     │  │                  │
        │(status.html) │  ▼                  ▼
        │              │ ┌──────────────┐   ┌──────────────┐
        │ [Redirects   │ │   STAFF      │   │   STUDENT    │
        │  to Login]   │ │ DASHBOARD    │   │  DASHBOARD   │
        └──────────────┘ │(protected)   │   │ (protected)  │
                         └──────┬───────┘   └──────┬───────┘
                                │                  │
                    ┌───────────┼───────────┐      │
                    │           │           │      │
                    ▼           ▼           ▼      ▼
              ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐
              │Reports  │ │ Users   │ │Settings  │ │Settings  │
              │.html    │ │.html    │ │.html     │ │.html     │
              │(Staff)  │ │(Staff)  │ │(Role-    │ │(Role-    │
              │         │ │         │ │ Aware)   │ │ Aware)   │
              └─────────┘ └─────────┘ └──────────┘ └──────────┘
                    │           │           │      │
                    └───────────┼───────────┴──────┘
                                │
                           ┌────▼────┐
                           │ Logout  │
                           │Button   │
                           └────┬────┘
                                │
                      ┌─────────▼─────────┐
                      │Clear Session Data │
                      │ (sessionStorage   │
                      │  .clear())        │
                      └────────┬──────────┘
                               │
                      ┌────────▼─────────┐
                      │Redirect to Login │
                      └───────────────────┘
```

---

## 📊 Navigation Flowchart by Role

### **NEW USER JOURNEY**
```
START
  │
  ├─→ Home (index.html)
  │    │
  │    ├─→ "Register Now"
  │    │    │
  │    │    └─→ Registration Form (registration.html)
  │    │         │
  │    │         ├─ Fill Details
  │    │         ├─ Select Role (Staff/Student)
  │    │         └─ Submit
  │    │              │
  │    │              ├─→ Status Page (status.html)
  │    │              │    │
  │    │              │    ├─→ "Go to Login" or "Back to Home"
  │    │              │         │
  │    └──────────────┴─────────┘
  │
  ├─→ Login Page (login.html)
  │    │
  │    ├─ Enter Email & Password
  │    └─ Submit
  │         │
  │         ├─→ Check Role
  │         │    │
  │         │    ├─ Staff → staff-dashboard.html
  │         │    └─ Student → student-dashboard.html
  │         │
  │         └─→ Role-Based Dashboard
  │
  END
```

### **STAFF MEMBER JOURNEY (After Login)**
```
Login Successful
  │
  └─→ staff-dashboard.html
      │
      ├─→ Navigation: Dashboard | Reports | Users | Settings | Logout
      │
      ├─ View Statistics
      ├─ Manage Registrations
      └─ Quick Actions
           │
           ├─→ Click "Reports"
           │    │
           │    └─→ reports.html
           │         │
           │         ├─→ Navigation: Dashboard | Reports | Users | Settings | Logout
           │         ├─ Generate Reports
           │         ├─ View Recent Reports
           │         └─ [Can navigate back]
           │
           ├─→ Click "Users"
           │    │
           │    └─→ users.html
           │         │
           │         ├─→ Navigation: Dashboard | Reports | Users | Settings | Logout
           │         ├─ User Statistics
           │         ├─ Search & Filter Users
           │         └─ [Can navigate back]
           │
           ├─→ Click "Settings"
           │    │
           │    └─→ settings.html (Staff Version)
           │         │
           │         ├─→ Navigation: Dashboard | Reports | Users | Settings | Logout
           │         ├─ General Settings
           │         ├─ Book Management Settings
           │         └─ [Can navigate back]
           │
           └─→ Click "Logout"
                │
                ├─ Clear session
                └─→ Return to login.html
```

### **STUDENT MEMBER JOURNEY (After Login)**
```
Login Successful
  │
  └─→ student-dashboard.html
      │
      ├─→ Navigation: Dashboard | My Books | Settings | Logout
      │
      ├─ View Statistics
      ├─ View Borrowed Books
      └─ Quick Actions
           │
           ├─→ Click "My Books"
           │    │
           │    └─→ student-dashboard.html (same page, My Books tab)
           │
           ├─→ Click "Settings"
           │    │
           │    └─→ settings.html (Student Version)
           │         │
           │         ├─→ Navigation: Dashboard | Settings | Logout
           │         │  (Staff nav items hidden)
           │         ├─ Student-specific Settings
           │         └─ [Can navigate back]
           │
           └─→ Click "Logout"
                │
                ├─ Clear session
                └─→ Return to login.html
```

---

## 🔄 Session State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    SESSION STORAGE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Created On Login:                                           │
│  • isLoggedIn: "true"                                        │
│  • userEmail: "user@example.com"                             │
│  • userRole: "staff" | "student"                             │
│                                                              │
│  Created On Registration:                                    │
│  • userFullName: "Full Name"                                 │
│  • registrationDate: ISO Timestamp                           │
│                                                              │
│  Cleared On Logout:                                          │
│  • sessionStorage.clear() removes ALL data                   │
│  • User must log in again to access protected pages          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Access Control Matrix

```
┌──────────────────────┬─────────┬──────────┬────────────────┐
│ Page                 │ Public  │  Staff   │   Student      │
├──────────────────────┼─────────┼──────────┼────────────────┤
│ index.html           │   ✅    │    ✅    │      ✅        │
│ login.html           │   ✅    │    ✅    │      ✅        │
│ registration.html    │   ✅    │    ✅    │      ✅        │
│ status.html          │   ✅    │    ✅    │      ✅        │
│ staff-dashboard.html │   ❌    │    ✅    │      ❌*       │
│ reports.html         │   ❌    │    ✅    │      ❌*       │
│ users.html           │   ❌    │    ✅    │      ❌*       │
│ student-dashboard.html│  ❌    │    ❌*   │      ✅        │
│ settings.html        │   ❌    │    ✅    │      ✅        │
└──────────────────────┴─────────┴──────────┴────────────────┘

✅  = Can access
❌  = Denied (not allowed)
❌* = Denied + Redirected to their dashboard
```

---

## 🔐 Authentication Check Points

```
Every Protected Page runs on load:

┌─────────────────────────────────────────────┐
│  Check isLoggedIn status                    │
├─────────────────────────────────────────────┤
│  if (!isLoggedIn)                           │
│    ├─ → Redirect to login.html              │
│    └─ ❌ Stop execution                     │
│                                             │
│  if (userRole !== 'required_role')          │
│    ├─ → Redirect to appropriate dashboard   │
│    └─ ❌ Stop execution                     │
│                                             │
│  ✅ All checks passed                       │
│    └─ → Load page normally                  │
└─────────────────────────────────────────────┘
```

---

## 📱 Responsive Design Flow

```
┌──────────────────────────────────────────────────┐
│            All Pages Support:                    │
├──────────────────────────────────────────────────┤
│ • Desktop (1920px+)                              │
│ • Laptop (1366px)                                │
│ • Tablet (768px)                                 │
│ • Mobile (320px+)                                │
│                                                  │
│ Navigation adapts to screen size:                │
│ • Desktop: Full horizontal navigation            │
│ • Mobile: Optimized for touch                    │
│ • All buttons and links clickable on any device  │
└──────────────────────────────────────────────────┘
```

---

## 🎨 Color-Coded Navigation Status

```
Dashboard Page Status Indicators:

┌─────────────────────────────────┐
│ Navigation Links:               │
│                                 │
│ [Active Page]     = Highlighted │
│ [Other Pages]     = Normal       │
│ [Logout Button]   = Right side   │
└─────────────────────────────────┘

Example - Reports Page:
  Dashboard    Reports [ACTIVE]    Users    Settings    [Logout]
     ↓            ↓✅               ↓          ↓
  Navigate   Currently On      Navigate   Navigate
```

---

## ⚡ Quick Navigation Shortcuts

```
From Any Page:
  • Logo (top left) → Home (if not on home)
  • Navigation items → Jump to any section
  • Logout (top right) → Clear session & return to login
  • "Back" links → Return to previous logical page

From Home:
  • 3 main buttons: Dashboard | Register | Login
  • Dashboard button smart-redirects based on auth status

From Public Pages (Register/Login):
  • Back to Home link available
  • Link to other public pages
```

---

## 📈 System Performance

```
All features optimized for:
✅ Fast page loads
✅ Smooth navigation
✅ Quick session management
✅ Instant role detection
✅ Seamless redirects
✅ Mobile responsiveness
```

---

## 🎯 Current Status: FULLY CONNECTED ✅

- ✅ 9 pages fully interconnected
- ✅ All navigation links working
- ✅ Session management secure
- ✅ Role-based access control active
- ✅ Logout functionality on all protected pages
- ✅ Settings page role-aware
- ✅ Protection redirects in place
- ✅ Error handling implemented
- ✅ Responsive design working
- ✅ Ready for testing and deployment
