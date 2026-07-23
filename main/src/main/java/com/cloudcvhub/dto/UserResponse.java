package com.cloudcvhub.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserResponse {

    Long id;
    String email;
    String fullname;
    String avatarUrl;
    String role;

}
