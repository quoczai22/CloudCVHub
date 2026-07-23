package com.cloudcvhub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // API REST dùng Postman nên tạm thời tắt CSRF để test dễ hơn ( CSRF là 1 kiểu tấn công mạng).
        http.csrf(csrfConfig -> csrfConfig.disable());

        // Cho phép gọi API đăng ký/đăng nhập mà chưa cần token.
        http.authorizeHttpRequests(authConfig -> {
            authConfig.requestMatchers("/", "/index.html").permitAll();
            authConfig.requestMatchers("/api/v1/auth/**").permitAll();
            authConfig.anyRequest().authenticated();
        });

        // Không dùng form login mặc định của Spring Security.
        http.formLogin(formLoginConfig -> formLoginConfig.disable());

        // Không dùng popup Basic Auth của trình duyệt.
        http.httpBasic(httpBasicConfig -> httpBasicConfig.disable());

        return http.build();
    }
}
