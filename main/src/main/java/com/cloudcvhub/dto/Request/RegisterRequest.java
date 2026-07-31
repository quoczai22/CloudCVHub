package com.cloudcvhub.dto.Request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter

public class RegisterRequest {

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 7, message = "Mật khẩu phải có ít nhất 7 ký tự")
    private String password;

    @NotBlank(message = "Họ và tên không được để trống")
    private String fullName;

}
