package com.cloudcvhub.repo;

import com.cloudcvhub.model.ShareLink;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShareLinkRepo {
    Optional<ShareLink> findByToken(String token);
    List<ShareLink> findByResumeId(Long resumeId); // lay danh sach theo resume
}
