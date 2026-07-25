package com.cloudcvhub.dto;

import lombok.*;

@Getter
@Setter
public class ShareLinkRequest {
    String password;
    LocalDateTime expiresAt;
}
