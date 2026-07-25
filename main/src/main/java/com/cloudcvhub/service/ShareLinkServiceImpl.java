package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ShareLinkRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.dto.Response.ShareLinkResponse;
import com.cloudcvhub.exception.ResourceNotFoundException;
import com.cloudcvhub.exception.WebException;
import com.cloudcvhub.model.Resume;
import com.cloudcvhub.model.ShareLink;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.ResumeRepo;
import com.cloudcvhub.repo.ShareLinkRepo;
import com.cloudcvhub.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShareLinkServiceImpl implements ShareLinkService {

    private final ShareLinkRepo shareLinkRepo;
    private final UserRepo userRepo;
    private final ResumeRepo resumeRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ShareLinkResponse createOrUpdateShareLink(Long resumeId, ShareLinkRequest request, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(resumeId, user.getId());

        ShareLink shareLink = shareLinkRepo.findByResumeId(resume.getId())
                .stream()
                .findFirst()
                .orElse(new ShareLink());

        if (shareLink.getId() == null) {
            shareLink.setResume(resume);
            shareLink.setToken(UUID.randomUUID().toString());
            shareLink.setViewCount(0);
        }

        shareLink.setExpiredAt(request.getExpiresAt());
        shareLink.setPasswordHash(createPasswordHash(request.getPassword()));
        shareLink.setActive(true);

        ShareLink savedShareLink = shareLinkRepo.save(shareLink);
        return mapToResponse(savedShareLink);
    }

    @Override
    @Transactional(readOnly = true)
    public ShareLinkResponse getShareLinkInfo(Long resumeId, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(resumeId, user.getId());

        ShareLink shareLink = shareLinkRepo.findByResumeId(resume.getId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("ShareLink", "resumeId", resumeId));

        return mapToResponse(shareLink);
    }

    @Override
    @Transactional
    public ResumeResponse getResumeByShareCode(String shareCode, String password) {
        ShareLink shareLink = shareLinkRepo.findByToken(shareCode)
                .orElseThrow(() -> new ResourceNotFoundException("Đường dẫn chia sẻ không tồn tại."));

        if (!shareLink.getActive()) {
            throw new WebException("Đường dẫn chia sẻ này đã bị vô hiệu hóa.", HttpStatus.GONE);
        }

        if (shareLink.getExpiredAt() != null && shareLink.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new WebException("Đường dẫn chia sẻ đã hết hạn.", HttpStatus.GONE);
        }

        if (shareLink.getPasswordHash() != null && !shareLink.getPasswordHash().isBlank()) {
            if (password == null || !passwordEncoder.matches(password, shareLink.getPasswordHash())) {
                throw new WebException("Mật khẩu truy cập CV không chính xác.", HttpStatus.UNAUTHORIZED);
            }
        }

        shareLink.setViewCount(shareLink.getViewCount() + 1);
        shareLinkRepo.save(shareLink);

        Resume resume = shareLink.getResume();

        return ResumeResponse.builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .content(resume.getDescription())
                .state(resume.getDeleted() ? "DELETED" : "ACTIVE")
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }

    private String createPasswordHash(String password) {
        if (password == null || password.isBlank()) {
            return null;
        }
        return passwordEncoder.encode(password);
    }

    private User findUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private Resume findResumeByIdAndUserId(Long resumeId, Long userId) {
        return resumeRepo.findByIdAndUserIdAndIsDeletedFalse(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
    }

    private ShareLinkResponse mapToResponse(ShareLink shareLink) {
        return ShareLinkResponse.builder()
                .id(shareLink.getId())
                .shareCode(shareLink.getToken())
                .shareUrl("/share/" + shareLink.getToken())
                .hasPassword(shareLink.getPasswordHash() != null && !shareLink.getPasswordHash().isBlank())
                .expiresAt(shareLink.getExpiredAt())
                .viewCount(shareLink.getViewCount())
                .state(shareLink.getActive() ? "ACTIVE" : "INACTIVE")
                .build();
    }
}
