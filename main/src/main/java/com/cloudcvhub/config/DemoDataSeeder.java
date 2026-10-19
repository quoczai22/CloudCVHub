package com.cloudcvhub.config;

import com.cloudcvhub.enums.Role;
import com.cloudcvhub.model.Resume;
import com.cloudcvhub.model.ResumeVersion;
import com.cloudcvhub.model.ShareLink;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.ResumeRepo;
import com.cloudcvhub.repo.ResumeVersionRepo;
import com.cloudcvhub.repo.ShareLinkRepo;
import com.cloudcvhub.repo.UserRepo;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Profile("dev")
public class DemoDataSeeder implements ApplicationRunner {

    private static final String DEMO_PASSWORD = "Demo123!";

    private final UserRepo userRepo;
    private final ResumeRepo resumeRepo;
    private final ResumeVersionRepo resumeVersionRepo;
    private final ShareLinkRepo shareLinkRepo;
    private final PasswordEncoder passwordEncoder;

    public DemoDataSeeder(
            UserRepo userRepo,
            ResumeRepo resumeRepo,
            ResumeVersionRepo resumeVersionRepo,
            ShareLinkRepo shareLinkRepo,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepo = userRepo;
        this.resumeRepo = resumeRepo;
        this.resumeVersionRepo = resumeVersionRepo;
        this.shareLinkRepo = shareLinkRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedUser(
                "demo.nguyen@example.test",
                "Nguyễn Minh Anh",
                "0901000001",
                "CV Java Backend Developer",
                "Ứng viên Java/Spring Boot với kinh nghiệm xây dựng REST API.",
                "demo-nguyen-java-cv"
        );
        seedUser(
                "demo.tran@example.test",
                "Trần Gia Huy",
                "0901000002",
                "CV Frontend Developer",
                "Ứng viên React, TypeScript và thiết kế giao diện web.",
                "demo-tran-frontend-cv"
        );
        seedUser(
                "demo.le@example.test",
                "Lê Khánh Linh",
                "0901000003",
                "CV Cloud Engineer",
                "Ứng viên cloud và DevOps, có kinh nghiệm Linux, Docker và CI/CD.",
                "demo-le-cloud-cv"
        );
    }

    private void seedUser(
            String email,
            String fullName,
            String phone,
            String resumeTitle,
            String description,
            String shareToken
    ) {
        User user = userRepo.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
            newUser.setFullname(fullName);
            newUser.setPhone(phone);
            newUser.setState("Đang hoạt động");
            newUser.setRole(Role.USER);
            return userRepo.save(newUser);
        });

        Resume resume = resumeRepo.findByUserIdAndDeletedFalse(user.getId()).stream()
                .filter(existing -> resumeTitle.equals(existing.getTitle()))
                .findFirst()
                .orElseGet(() -> {
                    Resume newResume = new Resume();
                    newResume.setUser(user);
                    newResume.setTitle(resumeTitle);
                    newResume.setDescription(description);
                    newResume.setDeleted(false);
                    return resumeRepo.save(newResume);
                });

        if (resumeVersionRepo.findByResumeIdOrderByVersionNumberDesc(resume.getId()).isEmpty()) {
            ResumeVersion version = ResumeVersion.builder()
                    .resume(resume)
                    .versionNumber(1)
                    .fileName(resumeTitle.replace(' ', '-') + ".pdf")
                    .fileKey("demo/" + shareToken + "/version-1.pdf")
                    .fileSize(245_760L)
                    .fileType("application/pdf")
                    .versionName("Bản đầu tiên")
                    .content(description)
                    .primary(true)
                    .build();
            resumeVersionRepo.save(version);
        }

        if (shareLinkRepo.findByToken(shareToken).isEmpty()) {
            ShareLink shareLink = ShareLink.builder()
                    .resume(resume)
                    .token(shareToken)
                    .active(true)
                    .viewCount(0)
                    .build();
            shareLinkRepo.save(shareLink);
        }
    }
}
