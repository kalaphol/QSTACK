<?php
/**
 * User Registration API
 * POST /backend/api/register.php
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
if (!isset($input['fullName']) || !isset($input['email']) || !isset($input['password']) || !isset($input['confirmPassword'])) {
    sendResponse(false, 'Missing required fields', null, HTTP_BAD_REQUEST);
}

// Sanitize input
$fullName = sanitizeInput($input['fullName']);
$email = sanitizeInput($input['email']);
$password = $input['password'];
$confirmPassword = $input['confirmPassword'];

// Validate full name
if (!validateFullName($fullName)) {
    sendResponse(false, 'Invalid full name format', null, HTTP_BAD_REQUEST);
}

// Validate email format
if (!validateGCTUEmail($email)) {
    sendResponse(false, MSG_INVALID_EMAIL, null, HTTP_BAD_REQUEST);
}

// Check if email already exists
if (emailExists($conn, $email)) {
    sendResponse(false, MSG_EMAIL_EXISTS, null, HTTP_CONFLICT);
}

// Validate password
if (!validatePassword($password)) {
    sendResponse(false, MSG_INVALID_PASSWORD, null, HTTP_BAD_REQUEST);
}

// Check if passwords match
if ($password !== $confirmPassword) {
    sendResponse(false, 'Passwords do not match', null, HTTP_BAD_REQUEST);
}

// Create user
$verificationToken = createUser($conn, $fullName, $email, $password);

if (!$verificationToken) {
    sendResponse(false, 'Registration failed. Please try again.', null, HTTP_INTERNAL_ERROR);
}

// Send verification email (optional - for now we'll skip email sending in development)
// sendVerificationEmail($email, $fullName, $verificationToken);

// Return success response
sendResponse(true, MSG_REGISTRATION_SUCCESS, [
    'email' => $email,
    'fullName' => $fullName,
    'message' => 'Your account has been created. You can now login.'
], HTTP_CREATED);
?>
