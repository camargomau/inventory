package com.camargomau.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// After User has been authenticated, response returns JWT token

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
}
