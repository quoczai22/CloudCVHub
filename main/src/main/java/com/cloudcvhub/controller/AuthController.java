package com.cloudcvhub.controller;

import com.cloudcvhub.dto.Response.AuthResponse;
import com.cloudcvhub.dto.Response.ApiRespone;
import com.cloudcvhub.dto.Request.LoginRequest;
import com.cloudcvhub.dto.Request.RegisterRequest;
import com.cloudcvhub.security.JwtTokenProvider;
import com.cloudcvhub.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<ApiRespone<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, jwtTokenProvider.generateAccessCookie(response.getUser().getEmail()).toString())
                .header(HttpHeaders.SET_COOKIE, jwtTokenProvider.generateRefreshCookie(response.getUser().getEmail()).toString())
                .body(ApiRespone.success(
                        HttpStatus.CREATED.value(),
                        "Đăng ký thành công.",
                        response
                ));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiRespone<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtTokenProvider.generateAccessCookie(response.getUser().getEmail()).toString())
                .header(HttpHeaders.SET_COOKIE, jwtTokenProvider.generateRefreshCookie(response.getUser().getEmail()).toString())
                .body(ApiRespone.success(
                        HttpStatus.OK.value(),
                        "Đăng nhập thành công.",
                        response
                ));
    }
}
