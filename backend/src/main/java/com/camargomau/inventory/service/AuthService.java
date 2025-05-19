package com.camargomau.inventory.service;

import com.camargomau.inventory.dto.AuthRequest;
import com.camargomau.inventory.dto.AuthResponse;
import com.camargomau.inventory.dto.RegisterRequest;
import com.camargomau.inventory.entity.User;
import com.camargomau.inventory.repository.UserRepository;
import com.camargomau.inventory.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Service class that handles authentication operations

@Service
@RequiredArgsConstructor
public class AuthService {

	// Repository for accessing user data in the database
	private final UserRepository userRepository;
	// Password encoder for securely storing user passwords
	private final PasswordEncoder passwordEncoder;
	// Utility for generating and validating JWT tokens
	private final JwtUtils jwtUtils;
	// Spring Security authentication manager for verifying credentials
	private final AuthenticationManager authenticationManager;
	// all of the above are injected by Spring's dependency injection

	// Registers a new user
	// Receives a RegisterRequest DTO containing user details (username, email, password)
	// Returns an AuthResponse containing a JWT token
	public AuthResponse register(RegisterRequest request) {
		// Check if email is already in use
		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new RuntimeException("Email already in use");
		}

		// Create and save new user with encoded password
		User user = User.builder()
				.username(request.getUsername())
				.email(request.getEmail())
				.passwordHash(passwordEncoder.encode(request.getPassword()))
				.build();
		userRepository.save(user);

		// Generate JWT token for the new user (include username as claim)
		String token = jwtUtils.generateToken(user.getEmail(), user.getUsername());
		return new AuthResponse(token);
	}

	// Authenticates a user and returns a JWT token if successful
	public AuthResponse login(AuthRequest request) {
		try {
			// Authenticate user credentials
			authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
			);
		} catch (AuthenticationException e) {
			throw new RuntimeException("Invalid credentials");
		}

		// Fetch user to get username for claim
		User user = userRepository.findByEmail(request.getEmail())
			.orElseThrow(() -> new RuntimeException("User not found"));

		// Generate JWT token for the authenticated user (include username as claim)
		String token = jwtUtils.generateToken(user.getEmail(), user.getUsername());
		return new AuthResponse(token);
	}
}
