package com.camargomau.inventory.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// User registration requires username, email, password

@Data
public class RegisterRequest {
    @NotBlank
    @Size(min = 3, max = 32)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 64)
    private String password;
}
