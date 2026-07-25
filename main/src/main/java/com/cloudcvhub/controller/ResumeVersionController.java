package com.cloudcvhub.controller;

import com.cloudcvhub.dto.Request.ResumeVersionRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.dto.Response.ResumeVersionResponse;
import com.cloudcvhub.service.ResumeVersionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/resumes/{resumeId}/versions")
@RequiredArgsConstructor
public class ResumeVersionController {

    private final ResumeVersionService versionService;

    // 1. Tạo bản lưu phiên bản mới
    @PostMapping
    public ResponseEntity<ResumeVersionResponse> createVersion(
            @PathVariable Long resumeId,
            @Valid @RequestBody ResumeVersionRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(versionService.createVersion(resumeId, request, userDetails.getUsername()));
    }

    // 2. Xem lịch sử các phiên bản
    @GetMapping
    public ResponseEntity<List<ResumeVersionResponse>> getVersions(
            @PathVariable Long resumeId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(versionService.getVersions(resumeId, userDetails.getUsername()));
    }

    // 3. Khôi phục CV về phiên bản chỉ định
    @PostMapping("/{versionId}/restore")
    public ResponseEntity<ResumeResponse> restoreVersion(
            @PathVariable Long resumeId,
            @PathVariable Long versionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(versionService.restoreVersion(resumeId, versionId, userDetails.getUsername()));
    }
}
