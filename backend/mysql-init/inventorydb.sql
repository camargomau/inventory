CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	is_admin BOOLEAN NOT NULL DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
	item_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	sku VARCHAR(50) NOT NULL UNIQUE,
	price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantity INT NOT NULL CHECK (quantity >= 0),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE operations (
	operation_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	item_id INT NOT NULL,
	operation_type ENUM('add', 'update', 'delete') NOT NULL,
	quantity_before INT NOT NULL,
	quantity_after INT NOT NULL,
	operation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_operations_item FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
	CONSTRAINT fk_operations_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
