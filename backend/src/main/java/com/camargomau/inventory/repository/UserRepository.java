package com.camargomau.inventory.repository;

import com.camargomau.inventory.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repository interface for Item entity

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);
}
