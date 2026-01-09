<?php
/**
 * Database Configuration
 * Contains database connection settings
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'gctu_elibrary');
define('DB_PORT', 3306);

// Application settings
define('APP_NAME', 'GCTU E-Library');
define('APP_URL', 'http://localhost:8000');
define('UPLOAD_DIR', __DIR__ . '/../../uploads/');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}

// Set charset to utf8mb4
$conn->set_charset('utf8mb4');

// Set timezone
date_default_timezone_set('Africa/Accra');
?>
