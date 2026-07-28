package com.cloudcvhub.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
@Getter
@Setter
public class WebException extends RuntimeException {
        private final HttpStatus status;
        private final ErrCode errCode;

        public WebException(String message, HttpStatus status) {
            super(message);
            this.status = status;
            this.errCode = null;
        }

        public WebException(ErrCode errCode, HttpStatus status) {
            super(errCode.getMessage());
            this.status = status;
            this.errCode = errCode;
        }

}
