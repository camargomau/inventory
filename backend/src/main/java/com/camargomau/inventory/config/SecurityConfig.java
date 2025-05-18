package com.camargomau.inventory.config;

import com.camargomau.inventory.security.JwtAuthenticationFilter;
import com.camargomau.inventory.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Configuration for Spring Security
// Enables JWT-based authentication

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    // Inject the JWT authentication filter (which replaces Spring's default non-stateless user/password one)
    private final JwtAuthenticationFilter jwtAuthFilter;
    // Inject the custom user details service (which loads user details from the database)
    private final CustomUserDetailsService userDetailsService;

    // Configures the main security filter chain for HTTP requests
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disables CSRF protection (not needed for stateless APIs; this is a RESTful API so it's stateless)
            .csrf(csrf -> csrf.disable())
            // Sets session management to stateless (no HTTP session, uses JWT)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Allows unauthenticated access to /api/auth/** endpoints (how are users going to register or log in otherwise?)
            // Requires authentication for all other endpoints
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .authenticationProvider(daoAuthenticationProvider())
            // Adds the JWT filter before the Spring Security's default username/password filter which is not stateless
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configures the authentication provider with the custom user details service and password encoder (defined below)
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // Password encoder bean for proper security (which uses BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Exposes the authentication manager bean for use elsewhere
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
