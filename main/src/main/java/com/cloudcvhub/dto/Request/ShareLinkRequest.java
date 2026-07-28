package com.cloudcvhub.dto.Request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShareLinkRequest {
    @Size(min = 5, max = 50, message = "Mật khẩu link chia sẻ phải từ 5 đến 50 ký tự")
    String password;
    @Future(message = "Thời gian hết hạn phải lớn hơn ngày hiện tại")
    LocalDateTime expiresAt;
}
