<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in JSON response

// Start session
session_start();

// Include database configuration
require_once 'config.php';

// Set header for JSON response
header('Content-Type: application/json');

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    // Optionally verify session is still valid in database
    try {
        $pdo = getDatabaseConnection();
        
        if ($pdo !== null) {
            $stmt = $pdo->prepare("SELECT id, firstname, lastname, email, role FROM Users WHERE id = :id");
            $stmt->execute(['id' => $_SESSION['user_id']]);
            $user = $stmt->fetch();
            
            // If user not found in DB, destroy session
            if (!$user) {
                session_destroy();
                echo json_encode([
                    'success' => true,
                    'loggedIn' => false
                ]);
                exit;
            }
        }
    } catch (PDOException $e) {
        error_log("Session check error: " . $e->getMessage());
    }
    
    // Return session data
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