package com.camargomau.inventory.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

// JWT Authentication Filter, which replaces Spring's default non-stateless user/password filter

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Inject the JWT operations class (validation, extraction)
    private final JwtUtils jwtUtils;
    // Inject the custom user details service (which loads user details from the database)
    private final CustomUserDetailsService userDetailsService;

    // This method is called for every HTTP request to check for a valid JWT token
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // Get the Authorization header from the request
        // the Authorization header stores the JWT token in the format
        // "Bearer <token>"
        // Bearer to be comply with OAuth 2.0 standard (where Bearer is used for token-based auth)
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // If the header is missing or doesn't start with "Bearer ", skip JWT processing
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract the JWT token from the header
        jwt = authHeader.substring(7);

        // If the token is invalid, skip authentication
        if (!jwtUtils.isTokenValid(jwt)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract the username from the token
        username = jwtUtils.extractUsername(jwt);

        // If username is present and user is not already authenticated, authenticate the user
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from the database
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Create an authentication token with user details and authorities
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

            // Set additional authentication details from the request
            // used by Spring Security for logging, etc.
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // Continue with the next filter in the chain (whatever that may be)
        filterChain.doFilter(request, response);
    }
}
