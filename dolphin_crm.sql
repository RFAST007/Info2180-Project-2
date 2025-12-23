DROP DATABASE IF EXISTS dolphin_crm;
CREATE DATABASE dolphin_crm;
USE dolphin_crm;



CREATE TABLE Users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(20),
	lastname VARCHAR(20),
	password VARCHAR(40),
	email VARCHAR(40),
	role VARCHAR(20),
	created_at DATETIME
);

CREATE TABLE Contacts (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(80),
	firstname VARCHAR(20),
	lastname VARCHAR(20),
	email VARCHAR(40),
	telephone VARCHAR(20),
	company VARCHAR(40),
	type VARCHAR(20),
	assigned_to INT,
	created_by INT,
	created_at DATETIME,
	updated_at DATETIME,
    
    FOREIGN KEY (assigned_to)
    REFERENCES Users(ID)
    ON DELETE CASCADE,
    
    FOREIGN KEY (created_by)
    REFERENCES Users(ID)
    ON DELETE CASCADE
);

CREATE TABLE Notes (
	id INT PRIMARY KEY AUTO_INCREMENT,
	contact_id INT,
	comment TEXT,
	created_by INT,
	created_at DATETIME,
    
    FOREIGN KEY (contact_id)
    REFERENCES contacts(ID)
    ON DELETE CASCADE,
    
    FOREIGN KEY (created_by)
    REFERENCES Users(ID)
    ON DELETE CASCADE
);

INSERT INTO Users(email, password) VALUES ('admin@project2.com', 'password123')