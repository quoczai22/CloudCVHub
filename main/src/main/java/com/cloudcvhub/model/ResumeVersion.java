package com.cloudcvhub.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "resume_versions")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ResumeVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    Resume resume;

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

    @Column(name = "version_name", nullable = false)
    String versionName;

    @Column(columnDefinition = "TEXT")
    String content;

    @Column(name = "is_primary", nullable = false)
    Boolean primary;

    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.primary == null) {
            this.primary = false;
        }
        if (this.versionNumber == null) {
            this.versionNumber = 1;
        }
    }
}
