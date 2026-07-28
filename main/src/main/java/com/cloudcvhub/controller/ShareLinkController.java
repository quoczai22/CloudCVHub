package com.cloudcvhub.controller;

import com.cloudcvhub.dto.Request.ShareLinkRequest;
import com.cloudcvhub.dto.Response.ApiRespone;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.dto.Response.ShareLinkResponse;
import com.cloudcvhub.service.ShareLinkService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ShareLinkController {

    private final ShareLinkService shareLinkService;

    // 1. Tạo hoặc cập nhật Link Chia Sẻ cho CV
    @PostMapping("/resumes/{resumeId}/share")
    public ResponseEntity<ApiRespone<ShareLinkResponse>> createShareLink(
            @PathVariable Long resumeId,
            @Valid @RequestBody(required = false) ShareLinkRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (request == null) {
            request = new ShareLinkRequest();
        }
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Tạo hoặc cập nhật link chia sẻ thành công.",
                shareLinkService.createOrUpdateShareLink(resumeId, request, userDetails.getUsername())
        ));
    }

    // 2. Lấy thông tin Share Link của 1 CV
    @GetMapping("/resumes/{resumeId}/share")
    public ResponseEntity<ApiRespone<ShareLinkResponse>> getShareLinkInfo(
            @PathVariable Long resumeId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Lấy thông tin link chia sẻ thành công.",
                shareLinkService.getShareLinkInfo(resumeId, userDetails.getUsername())
        ));
    }

    //  Nhà tuyển dụng xem CV qua mã code
    @GetMapping("/public/share/{shareCode}")
    public ResponseEntity<ApiRespone<ResumeResponse>> viewSharedResume(
            @PathVariable String shareCode,
            @RequestParam(required = false) String password) {
        return ResponseEntity.ok(ApiRespone.success(
                HttpStatus.OK.value(),
                "Lấy CV chia sẻ thành công.",
                shareLinkService.getResumeByShareCode(shareCode, password)
        ));
    }
}
