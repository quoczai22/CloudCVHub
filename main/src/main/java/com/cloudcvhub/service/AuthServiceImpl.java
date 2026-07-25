package com.cloudcvhub.service;

import com.cloudcvhub.dto.Response.AuthResponse;
import com.cloudcvhub.dto.Request.LoginRequest;
import com.cloudcvhub.dto.Request.RegisterRequest;
import com.cloudcvhub.dto.Response.UserResponse;
import com.cloudcvhub.exception.DuplicateEmailException;
import com.cloudcvhub.exception.WebException;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.UserRepo;
import com.cloudcvhub.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final UserRepo userRepo;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public AuthResponse login(LoginRequest request) throws WebException {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Đăng nhập thất bại: Email '{}' chưa được đăng ký.", request.getEmail());
                    return new WebException("Tài khoản chưa tồn tại. Vui lòng đăng ký trước.", HttpStatus.UNAUTHORIZED);
                });

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (AuthenticationException ex) {
            log.warn("Đăng nhập thất bại: Mật khẩu không đúng cho tài khoản '{}'.", request.getEmail());
            throw new WebException("Mật khẩu không đúng. Vui lòng thử lại.", HttpStatus.UNAUTHORIZED);
        }

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullname(user.getFullname())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .state(user.getState())
                .build();

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken(jwtTokenProvider.generateAccessToken(user.getEmail()))
                .refreshToken(jwtTokenProvider.generateRefreshToken(user.getEmail()))
                .user(userResponse)
                .build();
        return authResponse;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        boolean emailExists = userRepo.existsByEmail(request.getEmail());

        if (emailExists) {
            throw new DuplicateEmailException(request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullname(request.getFullName());

        User savedUser = userRepo.save(user);

        UserResponse userResponse = UserResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .fullname(savedUser.getFullname())
                .avatarUrl(savedUser.getAvatarUrl())
                .role(savedUser.getRole())
                .state(savedUser.getState())
                .build();

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken(jwtTokenProvider.generateAccessToken(savedUser.getEmail()))
                .refreshToken(jwtTokenProvider.generateRefreshToken(savedUser.getEmail()))
                .user(userResponse)
                .build();

        return authResponse;
    }
}
