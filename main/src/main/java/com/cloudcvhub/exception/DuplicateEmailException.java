package com.cloudcvhub.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateEmailException extends  RuntimeException{
    public DuplicateEmailException(String email) {
        super(String.format("Email '%s' đã được đăng ký trong hệ thống. Vui lòng sử dụng email khác.", email));
    }

    public DuplicateEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}
