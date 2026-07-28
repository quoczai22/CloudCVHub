package com.cloudcvhub.controller;

import com.cloudcvhub.dto.Request.ResumeVersionRequest;
import com.cloudcvhub.dto.Response.ApiRespone;
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
    public ResponseEntity<ApiRespone<ResumeVersionResponse>> createVersion(
            @PathVariable Long resumeId,
            @Valid @RequestBody ResumeVersionRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiRespone.success(
                        HttpStatus.CREATED.value(),
                        "Tạo phiên bản CV thành công.",
                        versionService.createVersion(resumeId, request, userDetails.getUsername())
                ));
    }

    // 2. Xem lịch sử các phiên bản
    @GetMapping
    public ResponseEntity<ApiRespone<List<ResumeVersionResponse>>> getVersions(
            @PathVariable Long resumeId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Lấy danh sách phiên bản CV thành công.",
                versionService.getVersions(resumeId, userDetails.getUsername())
        ));
    }

    // 3. Khôi phục CV về phiên bản chỉ định
    @PostMapping("/{versionId}/restore")
    public ResponseEntity<ApiRespone<ResumeResponse>> restoreVersion(
            @PathVariable Long resumeId,
            @PathVariable Long versionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Khôi phục phiên bản CV thành công.",
                versionService.restoreVersion(resumeId, versionId, userDetails.getUsername())
        ));
    }
}
