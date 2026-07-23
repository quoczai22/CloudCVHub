package com.cloudcvhub.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
@Getter
@Setter
public class AppException extends RuntimeException {
        private final HttpStatus status;

        public AppException(String message, HttpStatus status) {
            super(message);
            this.status = status;
        }
}
