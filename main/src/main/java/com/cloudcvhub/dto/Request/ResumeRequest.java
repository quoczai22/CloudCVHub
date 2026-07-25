package com.cloudcvhub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
public class ResumeRequest {
    @NotBlank(message = "Tiêu đề CV không được để trống")
    private String title;

    private String targetJob;

    private String content;
}
