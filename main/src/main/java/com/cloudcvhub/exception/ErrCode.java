package com.cloudcvhub.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrCode {
    UNCATEGORIZED_EXCEPTION(1001, "Lỗi sai sót trong quá trình code."),
    RUNTIME_EXCEPTION(10002, "Lỗi khi xử lý yêu cầu."),
    USER_EXISTED(10003, "Email đã tồn tại trong hệ thống."),
    USERNAME_INVALID(10004, "Tên đăng nhập không hợp lệ."),
    PASSWORD_INVALID(10005, "Mật khẩu không đúng."),
    EMAIL_BLANK(10006, "Email không được để trống."),
    EMAIL_INVALID(10007, "Email không đúng định dạng."),
    PASSWORD_BLANK(10008, "Mật khẩu không được để trống."),
    PASSWORD_SIZE_INVALID(10009, "Mật khẩu không đúng độ dài yêu cầu."),
    FULL_NAME_BLANK(10010, "Họ và tên không được để trống."),
    RESUME_TITLE_BLANK(10011, "Tiêu đề CV không được để trống."),
    RESUME_VERSION_NAME_BLANK(10012, "Tên phiên bản không được để trống."),
    SHARE_PASSWORD_SIZE_INVALID(10013, "Mật khẩu link chia sẻ không đúng độ dài."),
    SHARE_EXPIRED_AT_INVALID(10014, "Thời gian hết hạn không hợp lệ."),
    VALIDATION_EXCEPTION(10015, "Dữ liệu đầu vào không hợp lệ."),
    ID_INVALID(10016, "Id không hợp lệ."),
    METHOD_NOT_SUPPORTED(10017, "Phương thức HTTP không được hỗ trợ."),
    RESOURCE_NOT_FOUND(10018, "Không tìm thấy tài nguyên."),
    TOKEN_INVALID(10019, "Token không hợp lệ.");

    private final int code;
    private final String message;
}

