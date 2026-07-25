package com.cloudcvhub.dto.Response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class AuthResponse {

     String accessToken;
     String refreshToken;
    @Builder.Default
     String tokenType = "Bearer";
     UserResponse user;
}
