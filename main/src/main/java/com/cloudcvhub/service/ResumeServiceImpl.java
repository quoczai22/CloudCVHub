package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ResumeRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.exception.ResourceNotFoundException;
import com.cloudcvhub.model.Resume;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.ResumeRepo;
import com.cloudcvhub.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepo resumeRepo;
    private final UserRepo userRepo;

    @Override
    @Transactional
    public ResumeResponse createResume(ResumeRequest request, String userEmail) {
        User user = findUserByEmail(userEmail);

        Resume resume = new Resume();

        resume.setUser(user);
        resume.setTitle(request.getTitle());
        resume.setDescription(request.getContent());

        Resume savedResume = resumeRepo.save(resume);
        return mapToResponse(savedResume);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResumeResponse> getMyResumes(String userEmail) {


        User user = findUserByEmail(userEmail);

        return resumeRepo.findByUserIdAndIsDeletedFalse(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeResponse getResumeById(Long id, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(id, user.getId());


        return mapToResponse(resume);
    }

    @Override
    @Transactional
    public ResumeResponse updateResume(Long id, ResumeRequest request, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(id, user.getId());

        resume.setTitle(request.getTitle());
        resume.setDescription(request.getContent());

        Resume savedResume = resumeRepo.save(resume);
        return mapToResponse(savedResume);
    }

    @Override
    @Transactional
    public void deleteResume(Long id, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(id, user.getId());

        resume.setDeleted(true);
        resumeRepo.save(resume);
    }

    private User findUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private Resume findResumeByIdAndUserId(Long resumeId, Long userId) {
        return resumeRepo.findByIdAndUserIdAndIsDeletedFalse(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
    }

    private ResumeResponse mapToResponse(Resume resume) {
        return ResumeResponse.builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .content(resume.getDescription())
                .state(resume.getDeleted() ? "DELETED" : "ACTIVE")
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}
