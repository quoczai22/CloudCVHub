package com.cloudcvhub.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
@Getter
@Setter
public class WebException extends RuntimeException {
        private final HttpStatus status;

        public WebException(String message, HttpStatus status) {
            super(message);
            this.status = status;
        }
}
