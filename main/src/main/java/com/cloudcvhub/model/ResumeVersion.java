package com.cloudcvhub.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "resume_versions")

public class ResumeVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "version_number", nullable = false)
    Integer versionNumber;

    @Column(name = "file_name", nullable = false)
    String fileName;

    @Column(name = "file_key", nullable = false, length = 500)
    String fileKey;

    @Column(name = "file_size", nullable = false)
    Long fileSize;

    @Column(name = "file_type", nullable = false, length = 100)
    String fileType;

    @Column(name = "is_primary", nullable = false)
    Boolean isPrimary;

    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;

    public  ResumeVersion() {}

    public ResumeVersion(Long id, Integer versionNumber, String fileName, String fileKey, Long fileSize, String fileType, Boolean isPrimary, LocalDateTime createdAt) {
        this.id = id;
        this.versionNumber = versionNumber;
        this.fileName = fileName;
        this.fileKey = fileKey;
        this.fileSize = fileSize;
        this.fileType = fileType;
        this.isPrimary = isPrimary;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.isPrimary == null) {
            this.isPrimary = false;
        }
        if (this.versionNumber == null) {
            this.versionNumber = 1;
        }
    }

    public Integer getVersionNumber() {
        return versionNumber;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileKey() {
        return fileKey;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public String getFileType() {
        return fileType;
    }

    public Boolean getPrimary() {
        return isPrimary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setVersionNumber(Integer versionNumber) {
        this.versionNumber = versionNumber;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileKey(String fileKey) {
        this.fileKey = fileKey;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public void setPrimary(Boolean primary) {
        isPrimary = primary;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
