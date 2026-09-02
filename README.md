# CloudCVHub

CloudCVHub là ứng dụng quản lý CV fullstack, cho phép người dùng tạo tài khoản, quản lý hồ sơ, tải lên nhiều phiên bản CV và chia sẻ CV qua liên kết.

## Demo trực quan

**[Mở CloudCVHub Demo](https://cloudcvhub.eu.cc)**

Frontend React và backend Spring Boot được phục vụ chung qua Nginx. Domain được public bằng Cloudflare Tunnel.

## Chức năng

### Người dùng

- Đăng ký và đăng nhập
- Quản lý thông tin cá nhân
- Tải lên CV PDF/DOCX
- Xem, tải xuống và xóa CV
- Quản lý nhiều phiên bản CV
- Tạo liên kết chia sẻ CV

### Quản trị viên

- Quản lý người dùng
- Quản lý CV
- Theo dõi dữ liệu hệ thống
- Kiểm soát quyền truy cập theo vai trò

## Kiến trúc hệ thống

```text
Client browser
     |
     | HTTPS
     v
Cloudflare Tunnel
     |
     v
Nginx :80
     |
     v
Spring Boot :8081
     |
     +--> MySQL :3306
     +--> Amazon S3 (file CV)
```

Môi trường triển khai hiện tại:

```text
Dell Precision 5510
  └── Proxmox
       └── Ubuntu Server VM 103
            ├── Docker + MySQL
            ├── Spring Boot chạy bằng systemd
            ├── Nginx reverse proxy
            ├── Cloudflare Tunnel
            └── Tailscale cho quản trị từ xa
```

## Công nghệ sử dụng

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React build được đóng gói vào `src/main/resources/static` để chạy chung với backend.

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA và Hibernate
- Maven
- JWT access token và refresh token
- MapStruct

### Dữ liệu và lưu trữ

- MySQL 8.4
- Docker volume để giữ dữ liệu database
- Amazon S3 để lưu trữ file CV

### Hạ tầng và vận hành

- Proxmox và Ubuntu Server
- Docker
- Nginx
- Cloudflare Tunnel
- Tailscale
- Git và GitHub
- systemd

## Các lớp bảo mật

### Ứng dụng

- Mật khẩu được băm bằng BCrypt, không lưu dạng văn bản.
- JWT dùng để xác thực các request API.
- Access token có thời gian sống ngắn; refresh token dùng để cấp lại access token.
- Spring Security phân quyền theo vai trò, ví dụ `USER` và `ADMIN`.
- CSRF và session được cấu hình phù hợp với API stateless.
- Dữ liệu đầu vào được kiểm tra trước khi ghi vào database.
- Các API quản trị yêu cầu quyền `ADMIN`.

### Database

- MySQL chỉ chạy trong Ubuntu VM và Docker, không public trực tiếp ra Internet.
- Tài khoản ứng dụng được tách khỏi tài khoản root.
- Không đưa mật khẩu database vào GitHub.
- Database nên được backup trước các thay đổi lớn.

### Mạng

- Chỉ Nginx nhận truy cập web từ bên ngoài.
- Spring Boot chỉ được proxy nội bộ qua `127.0.0.1:8081`.
- Cloudflare Tunnel tạo kết nối outbound, không cần mở cổng inbound trên router.
- Tailscale chỉ dùng cho quản trị và kết nối riêng giữa các thiết bị.
- Không mở port `3306` public.
- Không dùng IP Tailscale làm DNS public.

### Secret và cấu hình

Các giá trị sau phải được đặt bằng biến môi trường hoặc file cấu hình local, không commit lên GitHub:

- Mật khẩu database
- JWT secret
- AWS access key và secret key
- Cloudflare Tunnel credentials
- Tailscale authentication key

Khi phát hiện secret bị lộ, cần thu hồi và tạo secret mới ngay.

## Chạy local

### Yêu cầu

- Java 21
- Maven hoặc Maven Wrapper
- Node.js và npm nếu cần build frontend
- Docker và Docker Compose
- MySQL 8.4 nếu không dùng Docker

### Chạy MySQL bằng Docker

```bash
docker compose up -d
docker ps
```

### Build backend

Linux:

```bash
chmod +x mvnw
./mvnw clean package -DskipTests
```

Windows PowerShell:

```powershell
.\mvnw.cmd clean package -DskipTests
```

Chạy ứng dụng:

```bash
java -jar target/main-0.0.1-SNAPSHOT.jar
```

Backend mặc định chạy ở:

```text
http://localhost:8081
```

### Build frontend

```bash
cd src/main/webapp/CloudCVHub
npm install
npm run build
```

Copy nội dung thư mục `dist` vào:

```text
src/main/resources/static
```

Sau đó build lại backend để frontend được đóng gói vào JAR.

## Triển khai Ubuntu/Proxmox

1. Khởi động VM 103 trong Proxmox.
2. Docker tự khởi động và chạy container MySQL với `restart: unless-stopped`.
3. systemd tự khởi động Spring Boot service `hosohub-api.service`.
4. Nginx nhận request web ở port 80 và proxy tới Spring Boot port 8081.
5. Cloudflare Tunnel public domain `cloudcvhub.eu.cc`.

Kiểm tra dịch vụ:

```bash
sudo systemctl status hosohub-api.service
sudo systemctl status nginx
sudo systemctl status cloudflared
docker ps
```

Kiểm tra local:

```bash
curl -I http://127.0.0.1:8081/
curl -I http://127.0.0.1/
```

Xem log backend:

```bash
sudo journalctl -u hosohub-api.service -f
```

## Quản lý VM và dịch vụ

VM 103 nên bật tùy chọn `Start at boot` trong Proxmox. Khi Ubuntu khởi động, các dịch vụ được bật bằng:

```bash
sudo systemctl enable docker
sudo systemctl enable hosohub-api.service
sudo systemctl enable cloudflared
```

Khi không test, có thể dừng VM để tiết kiệm điện. Khi mở lại Proxmox, VM sẽ tự bật nếu đã cấu hình `Start at boot`.

## Git workflow

```bash
git pull --rebase origin main
git status
git add .
git commit -m "mo-ta-thay-doi"
git push origin main
```

Không commit các file chứa mật khẩu, token, private key hoặc credentials.

## Hướng phát triển

- HTTPS trực tiếp trên Nginx nếu không dùng Tunnel
- Backup tự động cho MySQL
- Phân tích CV bằng AI và OCR
- Gợi ý việc làm
- Redis cache
- CI/CD hoàn chỉnh
- Monitoring và cảnh báo dịch vụ

## Tác giả

**Kiến Quốc**  
Sinh viên ngành Công nghệ Thông tin  
Định hướng Cloud và DevOps

