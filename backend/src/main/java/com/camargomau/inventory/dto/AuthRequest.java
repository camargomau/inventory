package com.camargomau.inventory.dto;

import lombok.Data;

// User authentication (login) requires email, password

@Data
public class AuthRequest {
    private String email;
    private String password;
}
