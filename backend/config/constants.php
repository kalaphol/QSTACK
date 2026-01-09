<?php
/**
 * Application Constants
 */

// Password hashing algorithm
define('PASSWORD_ALGO', PASSWORD_BCRYPT);
define('PASSWORD_OPTIONS', ['cost' => 12]);

// Session timeout (30 minutes in seconds)
define('SESSION_TIMEOUT', 1800);

// Email validation patterns
define('GCTU_EMAIL_PATTERN', '/^[a-zA-Z0-9._%+-]+@(gctu\.edu\.gh|students\.gctu\.edu\.gh)$/i');
define('PASSWORD_PATTERN', '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/');
define('NAME_PATTERN', '/^[A-Za-z\s]{2,50}$/');

// HTTP status codes
define('HTTP_OK', 200);
define('HTTP_CREATED', 201);
define('HTTP_BAD_REQUEST', 400);
define('HTTP_UNAUTHORIZED', 401);
define('HTTP_FORBIDDEN', 403);
define('HTTP_NOT_FOUND', 404);
define('HTTP_CONFLICT', 409);
define('HTTP_INTERNAL_ERROR', 500);

// Response messages
define('MSG_SUCCESS', 'Operation completed successfully');
define('MSG_INVALID_EMAIL', 'Please enter a valid GCTU school email');
define('MSG_INVALID_PASSWORD', 'Password must be at least 8 characters with uppercase, lowercase, and number');
define('MSG_EMAIL_EXISTS', 'This email is already registered');
define('MSG_INVALID_CREDENTIALS', 'Invalid email or password');
define('MSG_USER_NOT_FOUND', 'User not found');
define('MSG_REGISTRATION_SUCCESS', 'Registration successful. Please check your email for verification.');
define('MSG_LOGIN_SUCCESS', 'Login successful');
?>
