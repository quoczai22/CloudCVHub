package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ResumeRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;

import java.util.List;

public interface ResumeService {
    ResumeResponse createResume(ResumeRequest request, String userEmail);
    List<ResumeResponse> getMyResumes(String userEmail);
    ResumeResponse getResumeById(Long id, String userEmail);
    ResumeResponse updateResume(Long id, ResumeRequest request, String userEmail);
    void deleteResume(Long id, String userEmail);
}
