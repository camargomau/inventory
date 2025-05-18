package com.camargomau.inventory.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// Utility class for handling JWT (JSON Web Token) operations such as creation, validation, and extraction

@Component
public class JwtUtils {

    // Secret key for signing JWTs, injected from application properties
    // which is base64 encoded according to io.jsonwebtoken recommendations
    @Value("${jwt.secret}")
    private String secret;

    // Token expiration time in milliseconds, injected from application properties
    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    // Generates the cryptographic key used to sign and verify JWTs
    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generates a new JWT token for the given subject (username)
    // Uses the data we've recopilated/defined so far
    public String generateToken(String subject) {
        // No custom claims
        Map<String, Object> claims = new HashMap<>();
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(now))
                .expiration(new Date(now + expirationMs))
                .signWith(getKey())
                .compact();
    }

    // Extracts the username (subject) from the given JWT token
    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(getKey()).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Validates the given JWT token (checks signature and expiration)
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
