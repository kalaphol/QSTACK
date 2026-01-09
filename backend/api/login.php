<?php
/**
 * User Login API
 * POST /backend/api/login.php
 */

require_once __DIR__ . '/../includes/headers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../includes/functions.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, HTTP_BAD_REQUEST);
}

// Get JSON input
$input = getJsonInput();

// Validate required fields
if (!isset($input['email']) || !isset($input['password'])) {
    sendResponse(false, 'Email and password are required', null, HTTP_BAD_REQUEST);
}

// Sanitize input
$email = sanitizeInput($input['email']);
$password = $input['password'];

// Validate email format
if (!validateGCTUEmail($email)) {
    sendResponse(false, MSG_INVALID_EMAIL, null, HTTP_BAD_REQUEST);
}

// Get user from database
$user = getUserByEmail($conn, $email);

if (!$user) {
    sendResponse(false, MSG_INVALID_CREDENTIALS, null, HTTP_UNAUTHORIZED);
}

// Verify password
if (!verifyPassword($password, $user['password'])) {
    // Log failed login attempt
    logActivity($conn, $user['id'], 'failed_login', 'Incorrect password');
    sendResponse(false, MSG_INVALID_CREDENTIALS, null, HTTP_UNAUTHORIZED);
}

// Check if email is verified (optional)
// if (!$user['is_verified']) {
//     sendResponse(false, 'Please verify your email before logging in', null, HTTP_FORBIDDEN);
// }

// Start user session
startUserSession($user);

// Log successful login
logActivity($conn, $user['id'], 'login', 'User logged in successfully');

// Return success response
sendResponse(true, MSG_LOGIN_SUCCESS, [
    'user_id' => $user['id'],
    'email' => $user['email'],
    'fullName' => $user['full_name'],
    'isVerified' => (bool)$user['is_verified']
], HTTP_OK);
?>
