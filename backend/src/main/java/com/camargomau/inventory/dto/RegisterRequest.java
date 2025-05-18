package com.camargomau.inventory.dto;

import lombok.Data;

// User registration requires username, email, password

@Data
public class RegisterRequest {
	private String username;
	private String email;
	private String password;
}
