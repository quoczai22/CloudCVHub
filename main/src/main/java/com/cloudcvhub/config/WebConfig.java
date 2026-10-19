package com.cloudcvhub.config;

import com.cloudcvhub.enums.Role;
import com.cloudcvhub.model.Resume;
import com.cloudcvhub.model.User;
import com.cloudcvhub.repo.ResumeRepo;
import com.cloudcvhub.repo.UserRepo;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class WebConfig {

    @Bean
    ApplicationRunner createAdminUser(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@cloudcvhub.com";

            if (userRepo.existsByEmail(adminEmail)) {
                return;
            }

            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullname("Quản trị viên");
            admin.setRole(Role.ADMIN);
            admin.setState("Đang hoạt động");

            userRepo.save(admin);
        };
    }

    @Bean
    ApplicationRunner seedData(
            UserRepo userRepo,
            ResumeRepo resumeRepo,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            User user = userRepo.findByEmail("fake@example.com")
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setEmail("fake@example.com");
                        newUser.setPassword(passwordEncoder.encode("password123"));
                        newUser.setFullname("Fake User");
                        newUser.setState("Đang hoạt động");
                        newUser.setRole(Role.USER);
                        return userRepo.save(newUser);
                    });

            if (resumeRepo.findByUserIdAndDeletedFalse(user.getId()).isEmpty()) {
                Resume resume = new Resume();
                resume.setUser(user);
                resume.setTitle("CV Fake User");
                resume.setDescription("CV dữ liệu mẫu");
                resume.setDeleted(false);
                resumeRepo.save(resume);
            }
        };
    }

}
