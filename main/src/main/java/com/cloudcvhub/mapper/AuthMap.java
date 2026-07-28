package com.cloudcvhub.mapper;

import com.cloudcvhub.dto.Response.AuthResponse;
import com.cloudcvhub.dto.Response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMap {

    default AuthResponse toResponse(String accessToken, String refreshToken, UserResponse user) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(user)
                .build();
    }
}
