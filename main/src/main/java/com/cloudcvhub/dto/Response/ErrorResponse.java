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

public class ErrorResponse {
     int status;
     int code;
     String message;
     LocalDateTime timestamp;
}
