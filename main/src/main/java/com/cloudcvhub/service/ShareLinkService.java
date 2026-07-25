package com.cloudcvhub.service;

import com.cloudcvhub.dto.Request.ShareLinkRequest;
import com.cloudcvhub.dto.Response.ResumeResponse;
import com.cloudcvhub.dto.Response.ShareLinkResponse;

public interface ShareLinkService {
    ShareLinkResponse createOrUpdateShareLink(Long resumeId, ShareLinkRequest request, String userEmail);
    ShareLinkResponse getShareLinkInfo(Long resumeId, String userEmail);
    ResumeResponse getResumeByShareCode(String shareCode, String password);
}
