package com.cloudcvhub.dto.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShareLinkResponse {
    Long id;
    String shareCode;
    String shareUrl; // Đường dẫn hoàn chỉnh để gửi cho HR
    boolean hasPassword; // Link có cài mật khẩu hay không
    LocalDateTime expiresAt;
    long viewCount;
    String state;
}
