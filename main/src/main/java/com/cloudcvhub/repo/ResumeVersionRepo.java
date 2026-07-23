package com.cloudcvhub.repo;

import com.cloudcvhub.model.ResumeVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ResumeVersionRepo extends JpaRepository<ResumeVersion, Long> {
    List<ResumeVersion> findByResumeIdOrderByVersionNumberDesc(Long resumeId); //sap xep giam dan cua CV
    Optional<ResumeVersion> findByResumeIdAndIsPrimaryTrue(Long resumeId);
    Optional<ResumeVersion> findFirstByResumeIdOrderByVersionNumberDesc(Long resumeId); // lay CV gan nhat
}
