<?php
/**
 * Helper Functions
 */

/**
 * Send JSON response
 */
function sendResponse($success, $message, $data = null, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response);
    exit();
}

/**
 * Validate GCTU email format
 */
function validateGCTUEmail($email) {
    return preg_match(GCTU_EMAIL_PATTERN, $email);
}

/**
 * Validate password strength
 */
function validatePassword($password) {
    return preg_match(PASSWORD_PATTERN, $password);
}

/**
 * Validate full name
 */
function validateFullName($name) {
    return preg_match(NAME_PATTERN, $name);
}

/**
 * Hash password
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_ALGO, PASSWORD_OPTIONS);
}

/**
 * Verify password
 */
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

/**
 * Sanitize input
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate random token
 */
function generateToken($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

/**
 * Get JSON input
 */
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true);
}

/**
 * Check if email exists in database
 */
function emailExists($conn, $email) {
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    
    return $result->num_rows > 0;
}

/**
 * Create new user
 */
function createUser($conn, $fullName, $email, $password) {
    $hashedPassword = hashPassword($password);
    $verificationToken = generateToken();
    $createdAt = date('Y-m-d H:i:s');
    
    $stmt = $conn->prepare("
        INSERT INTO users (full_name, email, password, verification_token, created_at) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    $stmt->bind_param("sssss", $fullName, $email, $hashedPassword, $verificationToken, $createdAt);
    $result = $stmt->execute();
    $stmt->close();
    
    return $result ? $verificationToken : false;
}

/**
 * Get user by email
 */
function getUserByEmail($conn, $email) {
    $stmt = $conn->prepare("SELECT id, full_name, email, password, is_verified FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    
    return $user;
}

/**
 * Get user by ID
 */
function getUserById($conn, $id) {
    $stmt = $conn->prepare("SELECT id, full_name, email, is_verified, created_at FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    
    return $user;
}

/**
 * Start user session
 */
function startUserSession($user) {
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['login_time'] = time();
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    if (!isset($_SESSION['user_id'])) {
        return false;
    }
    
    // Check session timeout
    if (time() - $_SESSION['login_time'] > SESSION_TIMEOUT) {
        session_destroy();
        return false;
    }
    
    // Update login time
    $_SESSION['login_time'] = time();
    return true;
}

/**
 * Get current user ID
 */
function getCurrentUserId() {
    return isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
}

/**
 * Log user out
 */
function logoutUser() {
    session_start();
    session_destroy();
}

/**
 * Send verification email
 */
function sendVerificationEmail($email, $fullName, $token) {
    $verificationLink = APP_URL . '/backend/api/verify.php?token=' . $token;
    
    $subject = 'Email Verification - GCTU E-Library';
    $message = "
    <html>
    <head>
        <title>Email Verification</title>
    </head>
    <body>
        <h2>Welcome to GCTU E-Library, $fullName!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <p><a href='$verificationLink'>Verify Email</a></p>
        <p>Or copy this link: $verificationLink</p>
        <p>This link will expire in 24 hours.</p>
        <hr>
        <p>If you didn't create this account, please ignore this email.</p>
    </body>
    </html>";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: noreply@gctu.edu.gh\r\n";
    
    return mail($email, $subject, $message, $headers);
}

/**
 * Log activity
 */
function logActivity($conn, $userId, $action, $details = null) {
    $stmt = $conn->prepare("
        INSERT INTO activity_logs (user_id, action, details, ip_address, created_at) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $timestamp = date('Y-m-d H:i:s');
    
    $stmt->bind_param("issss", $userId, $action, $details, $ipAddress, $timestamp);
    $stmt->execute();
    $stmt->close();
}
?>
