package com.cloudcvhub.service;

import com.cloudcvhub.dto.Response.AuthResponse;
import com.cloudcvhub.dto.Request.RegisterRequest;
import com.cloudcvhub.dto.Request.LoginRequest;

public  interface  AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}


