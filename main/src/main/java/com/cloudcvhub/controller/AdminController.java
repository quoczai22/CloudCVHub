package com.cloudcvhub.controller;

import com.cloudcvhub.dto.Response.ApiRespone;
import com.cloudcvhub.dto.Response.UserResponse;
import com.cloudcvhub.mapper.UserMap;
import com.cloudcvhub.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepo userRepo;
    private final UserMap userMap;

    @GetMapping({"/users", "/users/"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiRespone<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = userRepo.findAll()
                .stream()
                .map(userMap::toResponse)
                .toList();

        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Lấy danh sách user thành công.",
                users
        ));
    }
}
