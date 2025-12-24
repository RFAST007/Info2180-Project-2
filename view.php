<?php

session_start();

// Check if user is logged in
if (!isset($_SESSION['user_email'])) {
    header('Location: access_denied.php');
    exit;
}

// Database connection
$host = 'localhost';
$username = 'Rfast_user';
$password = 'password123';
$database = 'dolphin_crm';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query the user's role from the database
$user_email = $conn->real_escape_string($_SESSION['user_email']);
$role_sql = "SELECT role FROM users WHERE email = '$user_email' LIMIT 1";
$role_result = $conn->query($role_sql);
$isAdmin = false;
if ($role_result && $role_result->num_rows > 0) {
    $row = $role_result->fetch_assoc();
    if ($row['role'] === 'admin') {
        $isAdmin = true;
    }
}

// If not admin, show access denied
if (!$isAdmin) {
    header('Location: access_denied.php');
    exit;
}

// ...existing code...

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch users from database
$sql = "SELECT id, firstname, lastname, email, role, created_at FROM users ORDER BY created_at DESC";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();
?>