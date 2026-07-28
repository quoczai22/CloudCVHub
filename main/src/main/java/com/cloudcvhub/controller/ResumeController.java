package com.cloudcvhub.controller;

import com.cloudcvhub.dto.Request.ResumeRequest;
import com.cloudcvhub.dto.Response.ApiRespone;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.service.ResumeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping
    public ResponseEntity<ApiRespone<ResumeResponse>> createResume(
            @Valid @RequestBody ResumeRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiRespone.success(
                        HttpStatus.CREATED.value(),
                        "Tạo CV thành công.",
                        resumeService.createResume(request, userDetails.getUsername())
                ));
    }

    @GetMapping
    public ResponseEntity<ApiRespone<List<ResumeResponse>>> getMyResumes(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Lấy danh sách CV thành công.",
                resumeService.getMyResumes(userDetails.getUsername())
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiRespone<ResumeResponse>> getResumeById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Lấy CV thành công.",
                resumeService.getResumeById(id, userDetails.getUsername())
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiRespone<ResumeResponse>> updateResume(
            @PathVariable Long id,
            @Valid @RequestBody ResumeRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Cập nhật CV thành công.",
                resumeService.updateResume(id, request, userDetails.getUsername())
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiRespone<Void>> deleteResume(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        resumeService.deleteResume(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Đã xóa Resume thành công.",
                null
        ));
    }
}
