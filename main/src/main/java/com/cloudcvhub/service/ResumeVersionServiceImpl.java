package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ResumeVersionRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.dto.Response.ResumeVersionResponse;
import com.cloudcvhub.exception.ResourceNotFoundException;
import com.cloudcvhub.mapper.ResumeMap;
import com.cloudcvhub.mapper.ResumeVersionMap;
import com.cloudcvhub.model.Resume;
import com.cloudcvhub.model.ResumeVersion;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.ResumeRepo;
import com.cloudcvhub.repo.ResumeVersionRepo;
import com.cloudcvhub.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeVersionServiceImpl implements ResumeVersionService {

    private final ResumeVersionRepo resumeVersionRepo;
    private final ResumeRepo resumeRepo;
    private final UserRepo userRepo;
    private final ResumeVersionMap resumeVersionMap;
    private final ResumeMap resumeMap;

    @Override
    @Transactional
    public ResumeVersionResponse createVersion(Long resumeId, ResumeVersionRequest request, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(resumeId, user.getId());

        int nextVersionNumber = resumeVersionRepo.findFirstByResumeIdOrderByVersionNumberDesc(resumeId)
                .map(latestVersion -> latestVersion.getVersionNumber() + 1)
                .orElse(1);

        String content = resume.getDescription() == null ? "" : resume.getDescription();

        ResumeVersion version = ResumeVersion.builder()
                .resume(resume)
                .versionNumber(nextVersionNumber)
                .versionName(request.getVersionName())
                .content(content)
                .fileName(request.getVersionName())
                .fileKey("resume-" + resumeId + "-version-" + nextVersionNumber)
                .fileSize((long) content.getBytes(StandardCharsets.UTF_8).length)
                .fileType("text/plain")
                .primary(nextVersionNumber == 1)
                .build();

        ResumeVersion savedVersion = resumeVersionRepo.save(version);
        return resumeVersionMap.toResponse(savedVersion);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResumeVersionResponse> getVersions(Long resumeId, String userEmail) {
        User user = findUserByEmail(userEmail);
        findResumeByIdAndUserId(resumeId, user.getId());

        return resumeVersionRepo.findByResumeIdOrderByVersionNumberDesc(resumeId)
                .stream()
                .map(resumeVersionMap::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ResumeResponse restoreVersion(Long resumeId, Long versionId, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(resumeId, user.getId());

        ResumeVersion version = resumeVersionRepo.findByIdAndResumeId(versionId, resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Phiên bản CV không tồn tại."));

        resume.setDescription(version.getContent());
        Resume savedResume = resumeRepo.save(resume);

        return resumeMap.toResponse(savedResume);
    }

    private User findUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private Resume findResumeByIdAndUserId(Long resumeId, Long userId) {
        return resumeRepo.findByIdAndUserIdAndDeletedFalse(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
    }

}
