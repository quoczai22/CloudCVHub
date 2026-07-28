package com.cloudcvhub.dto.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@JsonInclude(JsonInclude.Include.NON_NULL) // bỏ null ra khỏi json
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter

public class ApiRespone<T> {
    int code=1000;
    String message;
    T result;

    public static <T> ApiRespone<T> success(int code, String message, T result) {
        ApiRespone<T> response = new ApiRespone<>();
        response.setCode(code);
        response.setMessage(message);
        response.setResult(result);
        return response;
    }

}
