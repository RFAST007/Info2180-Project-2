<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'dolphin_crm');
define('DB_USER', 'root');
define('DB_PASS', '');

// Create database connection
function getDatabaseConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        // Log error (in production, log to file instead of displaying)
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}
?>