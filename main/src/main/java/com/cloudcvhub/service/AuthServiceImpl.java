package com.cloudcvhub.service;

import com.cloudcvhub.dto.AuthResponse;
import com.cloudcvhub.dto.LoginRequest;
import com.cloudcvhub.dto.RegisterRequest;
import com.cloudcvhub.dto.UserResponse;
import com.cloudcvhub.exception.DuplicateEmailException;
import com.cloudcvhub.exception.WebException;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepo userRepo;

    @Override
    public AuthResponse login(LoginRequest request) throws WebException {
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new WebException("Email hoặc mật khẩu không đúng", HttpStatus.UNAUTHORIZED));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new WebException("Email hoặc mật khẩu không đúng", HttpStatus.UNAUTHORIZED);
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
                .accessToken("mock-access-token")
                .refreshToken("mock-refresh-token")
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
        user.setPassword(request.getPassword());
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
                .accessToken("mock-access-token")
                .refreshToken("mock-refresh-token")
                .user(userResponse)
                .build();

        return authResponse;
    }
}
