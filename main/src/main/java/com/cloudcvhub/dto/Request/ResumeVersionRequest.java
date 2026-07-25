package com.cloudcvhub.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeVersionRequest {
    @NotBlank(message = "Tên phiên bản không được để trống")
    String versionName;
}
