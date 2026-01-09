<?php
/**
 * Database Setup Script
 * Run this file once to create the database and tables
 * Access: http://localhost:8000/backend/setup-database.php
 */

// Database credentials
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbPort = 3306;
$dbName = 'gctu_elibrary';

// Create connection without database
$conn = new mysqli($dbHost, $dbUser, $dbPass, '', $dbPort);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Create database
$createDbSql = "CREATE DATABASE IF NOT EXISTS $dbName CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if (!$conn->query($createDbSql)) {
    die('Error creating database: ' . $conn->error);
}

// Select the database
$conn->select_db($dbName);

// Create users table
$createUsersSql = "
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT 0,
        verification_token VARCHAR(255),
        verification_token_expires DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login DATETIME,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
";

if (!$conn->query($createUsersSql)) {
    die('Error creating users table: ' . $conn->error);
}

// Create activity logs table
$createLogsSQL = "
    CREATE TABLE IF NOT EXISTS activity_logs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        details TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
";

if (!$conn->query($createLogsSQL)) {
    die('Error creating activity_logs table: ' . $conn->error);
}

$conn->close();

echo '<h1>Database Setup Successful!</h1>';
echo '<p>The following have been created:</p>';
echo '<ul>';
echo '<li>Database: ' . $dbName . '</li>';
echo '<li>Table: users</li>';
echo '<li>Table: activity_logs</li>';
echo '</ul>';
echo '<p><a href="/index.html">Go to Registration Page</a></p>';
?>
