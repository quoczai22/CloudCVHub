package com.cloudcvhub.dto.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class UserResponse {

    Long id;
    String email;
    String fullname;
    String avatarUrl;
    String state;
    String role;

}
