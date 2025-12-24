<?php
session_start();
header('Content-Type: application/json');

$response = ["success" => false, "users" => []];

// TEMPORARY: Bypass admin/session check for demo
$host = 'localhost';
$username = 'Rfast_user';
$password = 'password123';
$database = 'dolphin_crm';
$conn = new mysqli($host, $username, $password, $database);
if (!$conn->connect_error) {
    $users_sql = "SELECT id, firstname, lastname, email, role, created_at FROM users ORDER BY created_at DESC";
    $users_result = $conn->query($users_sql);
    if ($users_result && $users_result->num_rows > 0) {
        while($user = $users_result->fetch_assoc()) {
            $response["users"][] = $user;
        }
    }
    $response["success"] = true;
}
$conn->close();

echo json_encode($response);