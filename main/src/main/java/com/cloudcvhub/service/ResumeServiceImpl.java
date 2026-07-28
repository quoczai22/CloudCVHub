package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ResumeRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.exception.ResourceNotFoundException;
import com.cloudcvhub.mapper.ResumeMap;
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
    private final ResumeMap resumeMap;

    @Override
    @Transactional
    public ResumeResponse createResume(ResumeRequest request, String userEmail) {
        User user = findUserByEmail(userEmail);

        Resume resume = resumeMap.toResume(request);
        resume.setUser(user);

        Resume savedResume = resumeRepo.save(resume);
        return resumeMap.toResponse(savedResume);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResumeResponse> getMyResumes(String userEmail) {
        User user = findUserByEmail(userEmail);

        return resumeRepo.findByUserIdAndDeletedFalse(user.getId())
                .stream()
                .map(resumeMap::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeResponse getResumeById(Long id, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(id, user.getId());

        return resumeMap.toResponse(resume);
    }

    @Override
    @Transactional
    public ResumeResponse updateResume(Long id, ResumeRequest request, String userEmail) {
        User user = findUserByEmail(userEmail);
        Resume resume = findResumeByIdAndUserId(id, user.getId());

        resumeMap.updateResume(request, resume);

        Resume savedResume = resumeRepo.save(resume);
        return resumeMap.toResponse(savedResume);
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
        return resumeRepo.findByIdAndUserIdAndDeletedFalse(resumeId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", "id", resumeId));
    }

}
