# 📖 Giới thiệu

Web được phát triển nhằm mô phỏng quy trình xây dựng một hệ thống thực tế trong doanh nghiệp.

Dự án không chỉ tập trung vào chức năng Upload CV mà còn hướng đến việc áp dụng các công nghệ hiện đại như:

- Java Spring Boot
- React
- Docker
- AWS Cloud
- CI/CD
- DevOps

Qua đó giúp sinh viên thực hành toàn bộ quy trình từ phân tích, thiết kế, lập trình, triển khai cho đến vận hành hệ thống.

---

# 🎯 Mục tiêu dự án

- Xây dựng hệ thống quản lý CV theo kiến trúc nhiều tầng.
- Thực hành phát triển RESTful API bằng Spring Boot.
- Tìm hiểu quy trình DevOps.
- Triển khai ứng dụng trên AWS.
- Xây dựng Portfolio phục vụ học tập và xin việc.

---

# ✨ Chức năng

## Người dùng

- Đăng ký tài khoản
- Đăng nhập
- Quản lý hồ sơ cá nhân
- Upload CV (PDF/DOCX)
- Xem danh sách CV
- Tải CV
- Xóa CV
- Quản lý nhiều phiên bản CV
- Chia sẻ CV

---

## Quản trị viên

- Quản lý người dùng
- Quản lý CV
- Thống kê hệ thống
- Theo dõi nhật ký hoạt động

---

# 🏗️ Kiến trúc hệ thống

```
React
    │
    ▼
Nginx
    │
    ▼
Spring Boot REST API
    │
 ┌──┴───────────────┐
 ▼                  ▼
MySQL      	Amazon S3
    │
    ▼
CloudWatch
```

---

# 🛠️ Công nghệ sử dụng

## Frontend

- React
- TypeScript
- Tailwind CSS

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven
- JWT Authentication

## Database

- MySQL

## Cloud

- AWS EC2
- AWS S3
- AWS IAM
- AWS CloudWatch

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Nginx

---

# 🔒 Bảo mật

- Mã hóa mật khẩu bằng BCrypt
- Xác thực JWT
- Phân quyền người dùng
- Kiểm tra dữ liệu đầu vào
- Upload file an toàn
- HTTPS
- AWS IAM

---

# ☁️ Triển khai

Hệ thống được triển khai trên:

- AWS EC2
- Amazon S3
- MySQL
- Docker
- Nginx
- GitHub Actions

---

# 🔄 Quy trình CI/CD

```
Lập trình viên

↓

GitHub

↓

GitHub Actions

↓

Build Docker

↓

Kiểm thử

↓

Triển khai AWS

↓

Giám sát CloudWatch
```

---

# 📚 Những kiến thức áp dụng

- Lập trình hướng đối tượng
- RESTful API
- Spring Boot
- Quản lý cơ sở dữ liệu
- Docker
- AWS Cloud
- Git
- GitHub
- CI/CD
- DevOps
- Kiến trúc hệ thống

---

# 🚀 Hướng phát triển

- Phân tích CV bằng AI
- OCR đọc nội dung CV
- Gợi ý việc làm
- Đăng nhập Google
- Đăng nhập GitHub
- Redis Cache
- Elasticsearch
- Kubernetes
- Terraform
- Microservices

---

# 📸 Hình ảnh

Đang cập nhật...

---

# 📄 API

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

# ⚙️ Chạy dự án

## Backend

```bash
mvn clean install
mvn spring-boot:run
```

## Frontend

```bash
npm install
npm run dev
```

## Docker

```bash
docker compose up -d
```

---

# 👨‍💻 Tác giả

**Kiến Quốc**

Sinh viên ngành Công nghệ Thông tin

Định hướng Cloud & DevOps

---