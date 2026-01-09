<?php
/**
 * User Profile API
 * GET /backend/api/profile.php - Get current user profile
 * PUT /backend/api/profile.php - Update user profile
 */

require_once __DIR__ . '/../includes/headers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../includes/functions.php';

// Start session
session_start();

// Check if user is logged in
if (!isLoggedIn()) {
    sendResponse(false, 'Unauthorized. Please login first.', null, HTTP_UNAUTHORIZED);
}

$userId = getCurrentUserId();

// GET request - Retrieve user profile
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = getUserById($conn, $userId);
    
    if (!$user) {
        sendResponse(false, MSG_USER_NOT_FOUND, null, HTTP_NOT_FOUND);
    }
    
    sendResponse(true, MSG_SUCCESS, $user, HTTP_OK);
}

// PUT request - Update user profile
elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = getJsonInput();
    
    // Validate input
    if (!isset($input['fullName'])) {
        sendResponse(false, 'Full name is required', null, HTTP_BAD_REQUEST);
    }
    
    $fullName = sanitizeInput($input['fullName']);
    
    // Validate full name format
    if (!validateFullName($fullName)) {
        sendResponse(false, 'Invalid full name format', null, HTTP_BAD_REQUEST);
    }
    
    // Update user
    $stmt = $conn->prepare("UPDATE users SET full_name = ? WHERE id = ?");
    $stmt->bind_param("si", $fullName, $userId);
    
    if ($stmt->execute()) {
        $stmt->close();
        
        // Log activity
        logActivity($conn, $userId, 'profile_update', 'User updated profile');
        
        // Get updated user data
        $user = getUserById($conn, $userId);
        sendResponse(true, 'Profile updated successfully', $user, HTTP_OK);
    } else {
        $stmt->close();
        sendResponse(false, 'Failed to update profile', null, HTTP_INTERNAL_ERROR);
    }
}

else {
    sendResponse(false, 'Method not allowed', null, HTTP_BAD_REQUEST);
}
?>
