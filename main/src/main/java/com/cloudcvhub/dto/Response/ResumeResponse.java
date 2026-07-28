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

public class ResumeResponse {
    Long id;
    String title;
    String targetJob;
    String content;
    String state;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
