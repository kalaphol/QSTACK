<?php
/**
 * Change Password API
 * POST /backend/api/change-password.php
 */

require_once __DIR__ . '/../includes/headers.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../includes/functions.php';

// Start session
session_start();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, HTTP_BAD_REQUEST);
}

// Check if user is logged in
if (!isLoggedIn()) {
    sendResponse(false, 'Unauthorized. Please login first.', null, HTTP_UNAUTHORIZED);
}

$userId = getCurrentUserId();

// Get JSON input
$input = getJsonInput();

// Validate required fields
if (!isset($input['currentPassword']) || !isset($input['newPassword']) || !isset($input['confirmPassword'])) {
    sendResponse(false, 'Missing required fields', null, HTTP_BAD_REQUEST);
}

$currentPassword = $input['currentPassword'];
$newPassword = $input['newPassword'];
$confirmPassword = $input['confirmPassword'];

// Get user from database
$user = getUserById($conn, $userId);

if (!$user) {
    sendResponse(false, MSG_USER_NOT_FOUND, null, HTTP_NOT_FOUND);
}

// Get full user record with password
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$userRecord = $result->fetch_assoc();
$stmt->close();

// Verify current password
if (!verifyPassword($currentPassword, $userRecord['password'])) {
    logActivity($conn, $userId, 'failed_password_change', 'Incorrect current password');
    sendResponse(false, 'Current password is incorrect', null, HTTP_UNAUTHORIZED);
}

// Validate new password
if (!validatePassword($newPassword)) {
    sendResponse(false, MSG_INVALID_PASSWORD, null, HTTP_BAD_REQUEST);
}

// Check if passwords match
if ($newPassword !== $confirmPassword) {
    sendResponse(false, 'New passwords do not match', null, HTTP_BAD_REQUEST);
}

// Check if new password is same as current password
if ($currentPassword === $newPassword) {
    sendResponse(false, 'New password must be different from current password', null, HTTP_BAD_REQUEST);
}

// Hash new password
$hashedPassword = hashPassword($newPassword);

// Update password in database
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hashedPassword, $userId);

if ($stmt->execute()) {
    $stmt->close();
    
    // Log activity
    logActivity($conn, $userId, 'password_change', 'User changed password');
    
    sendResponse(true, 'Password changed successfully', null, HTTP_OK);
} else {
    $stmt->close();
    sendResponse(false, 'Failed to change password', null, HTTP_INTERNAL_ERROR);
}
?>
