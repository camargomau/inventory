package com.camargomau.inventory.controller;

import com.camargomau.inventory.dto.AuthRequest;
import com.camargomau.inventory.dto.AuthResponse;
import com.camargomau.inventory.dto.RegisterRequest;
import com.camargomau.inventory.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

// REST controller for authentication

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	// POST /api/auth/register registers a new user
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
		return ResponseEntity.ok(authService.register(request));
	}

	// POST /api/auth/login logs in a user (i.e. returns a JWT token if it exists)
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
		return ResponseEntity.ok(authService.login(request));
	}
}
