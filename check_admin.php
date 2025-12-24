<?php
session_start();
header('Content-Type: application/json');

$response = ["isAdmin" => false, "loggedIn" => false];

if (isset($_SESSION['user_email'])) {
    $host = 'localhost';
    $username = 'Rfast_user';
    $password = 'password123';
    $database = 'dolphin_crm';
    $conn = new mysqli($host, $username, $password, $database);
    if (!$conn->connect_error) {
        $user_email = $conn->real_escape_string($_SESSION['user_email']);
        $sql = "SELECT role FROM users WHERE email = '$user_email' LIMIT 1";
        $result = $conn->query($sql);
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $response["loggedIn"] = true;
            if ($row['role'] === 'admin') {
                $response["isAdmin"] = true;
            }
        }
    }
    $conn->close();
}
echo json_encode($response);
