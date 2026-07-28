package com.cloudcvhub.exception;

import com.cloudcvhub.dto.Response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Hứng lỗi nghiệp vụ
    @ExceptionHandler(WebException.class)
    public ResponseEntity<ErrorResponse> handleAppException(WebException ex) {
        int code = ex.getErrCode() != null
                ? ex.getErrCode().getCode()
                : ErrCode.RUNTIME_EXCEPTION.getCode();

        ErrorResponse error = ErrorResponse.builder()
                .status(ex.getStatus().value())
                .code(code)
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, ex.getStatus());
    }

    // 2. Hứng lỗi Không tìm thấy tài nguyên
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .code(ErrCode.RESOURCE_NOT_FOUND.getCode())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // 3. Hứng lỗi Trùng lặp Email khi đăng ký
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateEmailException(DuplicateEmailException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.CONFLICT.value())
                .code(ErrCode.USER_EXISTED.getCode())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    // 4. Hứng lỗi JWT Token hỏng / hết hạn
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErrorResponse> handleInvalidTokenException(InvalidTokenException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .code(ErrCode.TOKEN_INVALID.getCode())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    // 5. Hứng lỗi Validation dữ liệu đầu vào
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldError().getDefaultMessage();
        String fieldName = ex.getBindingResult().getFieldError().getField();
        int code = getValidationCode(fieldName, errorMessage);

        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .code(code)
                .message(errorMessage)
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // 6. Hứng lỗi gọi sai method, ví dụ mở API POST bằng browser GET
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.METHOD_NOT_ALLOWED.value())
                .code(ErrCode.METHOD_NOT_SUPPORTED.getCode())
                .message("Phương thức HTTP không được hỗ trợ cho API này.")
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.METHOD_NOT_ALLOWED);
    }

    // 7. Hứng lỗi không tìm thấy đường dẫn
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(NoResourceFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .code(ErrCode.RESOURCE_NOT_FOUND.getCode())
                .message("Không tìm thấy API hoặc tài nguyên được yêu cầu.")
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // 8. Hứng lỗi truyền sai kiểu dữ liệu trên URL, ví dụ id phải là số nhưng nhập chữ
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .code(ErrCode.ID_INVALID.getCode())
                .message("Giá trị '" + ex.getName() + "' không hợp lệ. Vui lòng truyền đúng kiểu dữ liệu.")
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // 9. Hứng lỗi sai sót trong quá trình code
    @ExceptionHandler({
            NullPointerException.class,
            IllegalStateException.class
    })
    public ResponseEntity<ErrorResponse> handleCodeException(RuntimeException ex) {
        ex.printStackTrace();
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .code(ErrCode.UNCATEGORIZED_EXCEPTION.getCode())
                .message(ErrCode.UNCATEGORIZED_EXCEPTION.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 10. Hứng các lỗi runtime còn lại
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .code(ErrCode.RUNTIME_EXCEPTION.getCode())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // 11. Hứng tất cả các lỗi không lường trước khác
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ex.printStackTrace();
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .code(ErrCode.UNCATEGORIZED_EXCEPTION.getCode())
                .message(ErrCode.UNCATEGORIZED_EXCEPTION.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private int getValidationCode(String fieldName, String errorMessage) {
        if ("username".equals(fieldName)) {
            return ErrCode.USERNAME_INVALID.getCode();
        }
        if ("email".equals(fieldName) && errorMessage.contains("trống")) {
            return ErrCode.EMAIL_BLANK.getCode();
        }
        if ("email".equals(fieldName)) {
            return ErrCode.EMAIL_INVALID.getCode();
        }
        if ("password".equals(fieldName) && errorMessage.contains("trống")) {
            return ErrCode.PASSWORD_BLANK.getCode();
        }
        if ("password".equals(fieldName) && errorMessage.contains("link chia sẻ")) {
            return ErrCode.SHARE_PASSWORD_SIZE_INVALID.getCode();
        }
        if ("password".equals(fieldName)) {
            return ErrCode.PASSWORD_SIZE_INVALID.getCode();
        }
        if ("fullName".equals(fieldName)) {
            return ErrCode.FULL_NAME_BLANK.getCode();
        }
        if ("title".equals(fieldName)) {
            return ErrCode.RESUME_TITLE_BLANK.getCode();
        }
        if ("versionName".equals(fieldName)) {
            return ErrCode.RESUME_VERSION_NAME_BLANK.getCode();
        }
        if ("expiresAt".equals(fieldName)) {
            return ErrCode.SHARE_EXPIRED_AT_INVALID.getCode();
        }
        return ErrCode.VALIDATION_EXCEPTION.getCode();
    }

}
