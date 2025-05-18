package com.camargomau.inventory.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// User authentication (login) requires email, password

@Data
public class AuthRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
