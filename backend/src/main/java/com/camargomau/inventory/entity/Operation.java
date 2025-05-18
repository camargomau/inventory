package com.camargomau.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

// Entity class representing an entry in the users table

// // operation_id INT AUTO_INCREMENT PRIMARY KEY,
// // user_id INT NOT NULL,
// // item_id INT NOT NULL,
// // operation_type ENUM('add', 'update', 'delete') NOT NULL,
// // quantity_before INT NOT NULL,
// // quantity_after INT NOT NULL,
// // operation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

@Entity
@Table(name = "operations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Operation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "operation_id")
	private Integer operationId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id", nullable = false)
	private Item item;

	@Enumerated(EnumType.STRING)
	@Column(name = "operation_type", nullable = false, length = 10)
	private OperationType operationType;

	@Column(name = "quantity_before", nullable = false)
	private Integer quantityBefore;

	@Column(name = "quantity_after", nullable = false)
	private Integer quantityAfter;

	@Column(name = "operation_timestamp", updatable = false)
	private LocalDateTime operationTimestamp;

	@PrePersist
	protected void onCreate() {
		this.operationTimestamp = LocalDateTime.now();
	}

	public enum OperationType {
		add, update, delete
	}
}
