# 🧪 QUICK TEST CHECKLIST - Navigation Fixes

## Before You Test
1. **Clear browser cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. **Close any open tabs** with the old version
3. **Refresh all pages** (F5 or Cmd+R)
4. **Open Developer Console** (F12) to check for errors

---

## Test 1: Staff Navigation Links ✓ or ✗
**Goal:** Verify staff can navigate between all dashboard pages

### Steps:
1. Go to `http://localhost:8000/`
2. Click "Login"
3. Enter: `staff@gctu.edu.gh` / `Staff@123`
4. Should load Staff Dashboard

### From Staff Dashboard:
- [ ] Click **Reports** → Should load reports.html (URL changes)
- [ ] Click **Users** → Should load users.html (URL changes)
- [ ] Click **Settings** → Should load settings.html (URL changes)
- [ ] Click **Dashboard** → Should load staff-dashboard.html (URL changes)

### Check:
- [ ] No console errors (F12)
- [ ] All links are clickable
- [ ] Pages load within 1 second
- [ ] Navigation bar stays visible

---

## Test 2: Student Navigation Links ✓ or ✗
**Goal:** Verify students can navigate correctly

### Setup:
1. Open new tab: `http://localhost:8000/`
2. Click "Register"
3. Fill form as **Student** role
4. Submit → Should show status page
5. Click "Go to Login"
6. Use new credentials to login

### From Student Dashboard:
- [ ] Click **My Books** → Should load page (or stay on dashboard)
- [ ] Click **Settings** → Should load settings.html
- [ ] In Settings, verify navigation shows:
  - [ ] **Dashboard** link present (not Reports/Users)
  - [ ] **Settings** link present

### Check:
- [ ] No console errors
- [ ] Settings page shows ONLY Dashboard + Settings in nav (not Reports/Users)
- [ ] All links are clickable

---

## Test 3: Logout Functionality ✓ or ✗
**Goal:** Verify logout works and clears session

### Steps:
1. Login as staff or student
2. Click the **logout button** (icon with arrow, top right)
3. Check what happens:
   - [ ] Session clears (back to login page)
   - [ ] URL changes to login.html
   - [ ] No errors in console

### Verify Session Cleared:
1. Go back (browser back button)
2. Should be redirected to login (not back to dashboard)
3. Try opening dashboard directly: `staff-dashboard.html`
   - [ ] Should redirect to login

---

## Test 4: Settings Page Role-Awareness ✓ or ✗
**Goal:** Verify settings shows correct navigation based on role

### As Staff:
1. Login as staff
2. Go to Settings
3. Check navigation bar shows:
   - [ ] **Dashboard** link (to staff-dashboard.html)
   - [ ] **Reports** link
   - [ ] **Users** link
   - [ ] **Settings** link (active/highlighted)

### As Student:
1. Login as student (or register new one)
2. Go to Settings
3. Check navigation bar shows:
   - [ ] **Dashboard** link (to student-dashboard.html)
   - [ ] **Settings** link (active/highlighted)
   - [ ] **NO Reports** link (should be hidden)
   - [ ] **NO Users** link (should be hidden)

---

## Test 5: No Console Errors ✓ or ✗
**Goal:** Verify no JavaScript errors

### Steps:
1. Open any dashboard page
2. Press **F12** to open Developer Console
3. Click through all navigation links
4. Check the Console tab for errors:
   - [ ] No red error messages
   - [ ] No warnings about undefined functions
   - [ ] No CORS errors

### If You See Errors:
Note the exact error message and report it.

---

## Test 6: Form Submission Still Works ✓ or ✗
**Goal:** Verify page-specific functionality wasn't broken

### Login Form:
1. Go to login.html
2. Try logging in with bad credentials
   - [ ] Should show error message
3. Login with correct credentials
   - [ ] Should redirect to dashboard

### Registration Form:
1. Go to registration.html
2. Try submitting with empty fields
   - [ ] Should show validation errors
3. Fill form completely with new email
   - [ ] Should redirect to status.html after submit

---

## Quick Diagnostic

If links aren't working, check:

```
❌ Links still not working?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Close ALL browser tabs
3. Refresh the page (F5)
4. Check console for errors (F12)
5. Try incognito/private window

Still broken?
→ Screenshot the error message
→ Note the exact page and link clicked
→ Note the browser console errors
```

---

## What Was Fixed

1. **Script Loading Order** - Page scripts now load before logout.js
2. **CSS Display Issue** - Settings navigation now uses proper flex layout
3. **Duplicate Handlers** - Removed duplicate logout handler from settings.js

---

## Expected Results

✅ All navigation links work
✅ Pages load when clicked  
✅ Logout clears session
✅ Settings shows correct nav
✅ No console errors
✅ Forms work properly

---

## Report Issues

If something still doesn't work:

```
What's broken: [describe the problem]
Page affected: [page name and URL]
Browser: [Chrome/Firefox/Safari/Edge]
Console error: [exact error message if any]
Steps to reproduce: [specific clicks that cause issue]
```

---

**Status: Ready to Test!** 🚀
