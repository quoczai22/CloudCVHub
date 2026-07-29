package com.cloudcvhub.config;

import com.cloudcvhub.enums.Role;
import com.cloudcvhub.model.User;
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
}
