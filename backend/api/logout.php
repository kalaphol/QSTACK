<?php
/**
 * User Logout API
 * POST /backend/api/logout.php
 */

require_once __DIR__ . '/../includes/headers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../includes/functions.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, HTTP_BAD_REQUEST);
}

// Check if user is logged in
if (!isLoggedIn()) {
    sendResponse(false, 'Not logged in', null, HTTP_UNAUTHORIZED);
}

// Get user ID before logout
$userId = getCurrentUserId();

// Log logout activity
logActivity($conn, $userId, 'logout', 'User logged out');

// Logout user
logoutUser();

// Return success response
sendResponse(true, 'Logout successful', null, HTTP_OK);
?>
