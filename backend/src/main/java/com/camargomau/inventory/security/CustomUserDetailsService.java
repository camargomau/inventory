package com.camargomau.inventory.security;

import com.camargomau.inventory.entity.User;
import com.camargomau.inventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

// Service for loading user details from the database for authentication
// It is "custom" because it loads user details from our database, using our UserRepository (User entities)
// By default, Spring Security loads user details from an in-memory store

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	// Repository for accessing user data
	private final UserRepository userRepository;

	// Loads user details by email (which is used for authentication)
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// Look up the user by email, throw exception if not found
		User user = userRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		// Build a Spring Security UserDetails object with username, password, and roles
		// Spring Security uses this object to authenticate the user and check their roles
		return org.springframework.security.core.userdetails.User
			.withUsername(user.getEmail())
			.password(user.getPasswordHash())
			.authorities(user.getIsAdmin() ? "ROLE_ADMIN" : "ROLE_USER")
			.build();
	}
}
