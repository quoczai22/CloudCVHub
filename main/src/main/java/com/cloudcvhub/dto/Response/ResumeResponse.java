package com.cloudcvhub.dto.Response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ResumeResponse {
    Long id;
    String title;
    String targetJob;
    String content;
    String state;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
