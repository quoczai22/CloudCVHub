package com.cloudcvhub.dto.Response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ErrorResponse {
     int status;
     String message;
     LocalDateTime timestamp;
}
