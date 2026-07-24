package com.cloudcvhub.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.*;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

    final JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // API REST dùng Postman nên tạm thời tắt CSRF để test dễ hơn ( CSRF là 1 kiểu tấn công mạng).
        http.csrf(csrfConfig -> csrfConfig.disable());

        // Không lưu Session
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Cho phép gọi API đăng ký/đăng nhập mà chưa cần token.
        http.authorizeHttpRequests(authConfig -> {
            authConfig.requestMatchers("/", "/index.html").permitAll();
            authConfig.requestMatchers("/api/v1/auth/**").permitAll();
            authConfig.requestMatchers("/api/admin/**").hasRole("ADMIN");
            authConfig.anyRequest().authenticated();
        });

        // Đút bộ lọc JWT vào trước bộ lọc mặc định của Spring
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Bộ mã hóa mật khẩu bắt buộc phải dùng để băm mật khẩu
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();

    }
}
