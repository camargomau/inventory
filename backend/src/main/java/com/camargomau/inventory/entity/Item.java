package com.camargomau.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// Entity class representing an entry in the items table

// // item_id INT AUTO_INCREMENT PRIMARY KEY,
// // name VARCHAR(100) NOT NULL,
// // description TEXT,
// // sku VARCHAR(50) NOT NULL UNIQUE,
// // price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
// // quantity INT NOT NULL CHECK (quantity >= 0),
// // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private Integer itemId;

	@Column(nullable = false, length = 100)
	private String name;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false, unique = true, length = 50)
	private String sku;

	@Column(nullable = false, precision = 10, scale = 2)
	@Builder.Default
	private BigDecimal price = BigDecimal.ZERO;

	@Column(nullable = false)
	private Integer quantity;

	@Column(nullable = false)
	@Builder.Default
	private Boolean available = true;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDateTime.now();
	}
}
