package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ResumeVersionRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.dto.Response.ResumeVersionResponse;

import java.util.List;

public interface ResumeVersionService {

    ResumeVersionResponse createVersion(Long resumeId, ResumeVersionRequest request, String userEmail);

    List<ResumeVersionResponse> getVersions(Long resumeId, String userEmail);

    ResumeResponse restoreVersion(Long resumeId, Long versionId, String userEmail);
}
