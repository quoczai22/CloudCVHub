package com.cloudcvhub.dto.Response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) // bỏ null ra khỏi json

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

    public void setCode(int code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public T getResult() {
        return result;
    }
}
