<?php
$host = 'localhost';
$username = 'Rfast_user';
$password = 'password123';
$database = 'dolphin_crm';

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
     die('Connection failed: ' . $conn->connect_error);
}
// add_user.php - Backend to handle user addition

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for JSON response
header('Content-Type: application/json');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get and sanitize input data
$firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
$lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = $_POST['password'] ?? '';
$role = filter_input(INPUT_POST, 'role', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Validate password length
if (strlen($password) < 8) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long']);
    exit;
}

// Validate role
$allowedRoles = ['member', 'admin'];
if (!in_array($role, $allowedRoles)) {
    echo json_encode(['success' => false, 'message' => 'Invalid role selected']);
    exit;
}

// Hash the password for security
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


// Save to database
$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)");
if ($stmt) {
    $stmt->bind_param("sssss", $firstName, $lastName, $email, $hashedPassword, $role);
    $success = $stmt->execute();
    $stmt->close();
} else {
    $success = false;
}

if ($success) {
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => "User $firstName $lastName added successfully as $role",
        'user' => [
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'role' => $role
        ]
    ]);
} else {
    // Return error response
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save user. Please try again.'
    ]);
}
?>