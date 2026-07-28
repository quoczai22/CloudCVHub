package com.cloudcvhub.security;

import com.cloudcvhub.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct; // Dùng để khởi tạo key sau khi đọc được chuỗi bí mật
import org.springframework.web.util.WebUtils;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import java.util.Date;
@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    String jwtSecret;

    @Value("${jwt.access-token-expiration}")
    long accessToken;

    @Value("${jwt.refresh-token-expiration}")
    long refreshToken;

    // Tạo access cookies
    public static final String accessCookie="access_token";
    public static final String refreshTokenCookie="refresh_token";

    private SecretKey key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessToken);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshToken);

        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public  ResponseCookie generateAccessCookie(String email) {
        String jwt = generateAccessToken(email);
        return ResponseCookie.from(accessCookie,jwt)
                .path("/api")
                .maxAge(accessToken/1000) //Tính theo ms
                .httpOnly(true)  // Chống hack XSS
                .secure(false)
                .sameSite("Lax") // Chống CSRF cơ bản
                .build();
    }

    public ResponseCookie  generateRefreshCookie(String email) {
        String jwt = generateRefreshToken(email);
        return  ResponseCookie.from(refreshTokenCookie,jwt)
                .path("/api")
                .maxAge(refreshToken/1000)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .build();
    }

    public ResponseCookie getCleanAccessCookie() {
        return ResponseCookie.from(accessCookie, "").path("/api").maxAge(0).httpOnly(true).build();
    }

    public ResponseCookie getCleanRefreshCookie() {
        return ResponseCookie.from(refreshTokenCookie, "").path("/api/auth/refresh").maxAge(0).httpOnly(true).build();
    }

    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, accessCookie);
        if (cookie != null) {
            return cookie.getValue();
        }
        return null;
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            throw new InvalidTokenException("JWT Token không hợp lệ hoặc đã hết hạn.");
        }
    }

}


