package com.camargomau.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

// Entity class representing an entry in the users table

// // user_id INT AUTO_INCREMENT PRIMARY KEY,
// // username VARCHAR(50) NOT NULL UNIQUE,
// // email VARCHAR(100) NOT NULL UNIQUE,
// // password_hash VARCHAR(255) NOT NULL,
// // is_admin BOOLEAN NOT NULL DEFAULT 0,
// // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

	// The default value for isAdmin is false
	// i.e. after using User.builder().build(), isAdmin will be false unless set explicitly
    @Column(name = "is_admin", nullable = false)
    @Builder.Default
    private Boolean isAdmin = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
