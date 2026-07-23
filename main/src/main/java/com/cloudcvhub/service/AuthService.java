package com.cloudcvhub.service;

import com.cloudcvhub.dto.AuthResponse;
import com.cloudcvhub.dto.RegisterRequest;
import com.cloudcvhub.dto.LoginRequest;

public  interface  AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}


