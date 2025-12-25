<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in JSON response

// Start session
session_start();

// Set header for JSON response
header('Content-Type: application/json');

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'success' => true,
        'loggedIn' => true,
        'user' => [
            'userId' => $_SESSION['user_id'],
            'email' => $_SESSION['email'],
            'firstname' => $_SESSION['firstname'],
            'lastname' => $_SESSION['lastname'],
            'role' => $_SESSION['role'],
            'loginTime' => $_SESSION['login_time']
        ]
    ]);
} else {
    echo json_encode([
        'success' => true,
        'loggedIn' => false
    ]);
}
?>