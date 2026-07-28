package com.cloudcvhub.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResumeVersionRequest {
    @NotBlank(message = "Tên phiên bản không được để trống")
    String versionName;
}
