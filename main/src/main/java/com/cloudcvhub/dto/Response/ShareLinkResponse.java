package com.cloudcvhub.dto.Response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShareLinkResponse {
    Long id;
    String shareCode;
    String shareUrl; // Đường dẫn hoàn chỉnh để gửi cho HR
    boolean hasPassword; // Link có cài mật khẩu hay không
    LocalDateTime expiresAt;
    long viewCount;
    String state;
}
