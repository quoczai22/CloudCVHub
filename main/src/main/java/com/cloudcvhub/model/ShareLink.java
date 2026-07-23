package com.cloudcvhub.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;


@Entity
@Table(name = "share_links")

public class ShareLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    Resume resume;

    @Column(nullable = false, unique = true, length = 100)
    String name;

    @Column(name = "expired_at")
    LocalDateTime expiredAt;

    @Column(name = "is_active", nullable = false)
    Boolean isActive;

    @Column(name = "view_count", nullable = false)
    Integer viewCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.isActive == null) {
            this.isActive = true;
        }
        if (this.viewCount == null) {
            this.viewCount = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public ShareLink(){}

    public ShareLink(Long id, Resume resume, String name, LocalDateTime expiredAt, Boolean isActive, Integer viewCount, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.resume = resume;
        this.name = name;
        this.expiredAt = expiredAt;
        this.isActive = isActive;
        this.viewCount = viewCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public Resume getResume() {
        return resume;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public Boolean getActive() {
        return isActive;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public void setViewCount(Integer viewCount) {
        this.viewCount = viewCount;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
