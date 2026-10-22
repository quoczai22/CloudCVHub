export const adminNavItems = [
  { id: "admin-dashboard", label: "Tổng quan hệ thống", icon: "grid", description: "Số liệu, tài nguyên và lưu lượng máy chủ" },
  { id: "admin-users", label: "Quản lý Người dùng", icon: "user", description: "Danh sách tài khoản, phân quyền và khóa truy cập" },
  { id: "admin-cvs", label: "Kiểm duyệt & CV", icon: "file", description: "Giám sát tài liệu tải lên, dung lượng và an toàn" },
  { id: "admin-logs", label: "Nhật ký kiểm toán", icon: "shield", description: "Lịch sử đăng nhập, bảo mật và thay đổi dữ liệu" },
]

export const adminSystemStats = {
  version: "v2.4.0-RELEASE",
  status: "ONLINE",
  uptime: "99.98%",
  serverRegion: "ap-southeast-1 (Hanoi)",
  databaseEngine: "PostgreSQL 16.2 / Spring Boot 3.2",
}
