create database CloudCVHub
use  CloudCVHub

create table users(
id bigint auto_increment ,
email varchar(50) not null unique,
password varchar(255) not null ,
full_name varchar(50)not null,
phone varchar(10),
avatar_url varchar(255),
state varchar(50) not null default 'Đang hoạt động',
role varchar(50) not null default 'USER',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
CONSTRAINT pk_users PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resumes (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL, 
    description TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_resumes PRIMARY KEY (id),
    CONSTRAINT fk_resumes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE resume_versions (
    id BIGINT AUTO_INCREMENT,
    resume_id BIGINT NOT NULL,
    version_number INT NOT NULL DEFAULT 1, 
    file_name VARCHAR(255) NOT NULL,       
    file_key VARCHAR(500) NOT NULL,        
    file_size BIGINT NOT NULL,            
    file_type VARCHAR(100) NOT NULL,     
    is_primary BOOLEAN NOT NULL DEFAULT FALSE, 
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_resume_versions PRIMARY KEY (id),
    CONSTRAINT fk_versions_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    CONSTRAINT uq_resume_version UNIQUE (resume_id, version_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE share_links (
    id BIGINT AUTO_INCREMENT,
    resume_id BIGINT NOT NULL,
    token VARCHAR(100) NOT NULL UNIQUE,
    expired_at TIMESTAMP NULL, 
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    view_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_share_links PRIMARY KEY (id), 
    CONSTRAINT fk_share_links_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    expired_at TIMESTAMP NOT NULL, 
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_refresh_tokens PRIMARY KEY (id), 
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 1. Thêm dữ liệu mẫu vào bảng users
INSERT INTO users (id, email, password, full_name, avatar_url, role, state, created_at, updated_at)
VALUES
    (1, 'admin@hosohub.com', 'admin123', 'Quản Trị Viên', 'https://avatar.iran.liara.run/public/1', 'ADMIN', 'ACTIVE', NOW(), NOW()),
    (2, 'student@hosohub.com', 'pass123', 'Nguyễn Văn A', 'https://avatar.iran.liara.run/public/2', 'USER', 'ACTIVE', NOW(), NOW())
    ON DUPLICATE KEY UPDATE id = id;

-- 2. Thêm dữ liệu mẫu vào bảng resumes
INSERT INTO resumes (id, user_id, title, description, is_deleted, created_at, updated_at)
VALUES
    (1, 2, 'CV Backend Developer', 'Java Spring Boot Developer', FALSE, NOW(), NOW()),
    (2, 2, 'CV Cloud & DevOps', 'AWS/DevOps Engineer', FALSE, NOW(), NOW())
    ON DUPLICATE KEY UPDATE id = id;

