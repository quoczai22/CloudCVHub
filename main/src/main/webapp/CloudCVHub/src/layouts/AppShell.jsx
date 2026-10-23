import Sidebar from './Sidebar'
import Topbar from './Topbar'

const pageNames = {
  overview: "Tổng quan",
  cvs: "CV của tôi",
  upload: "Tải CV lên",
  detail: "Chi tiết CV",
  shares: "Liên kết chia sẻ",
  profile: "Hồ sơ cá nhân",
  settings: "Cài đặt",
  "admin-dashboard": "Quản trị / Tổng quan máy chủ",
  "admin-users": "Quản trị / Quản lý Người dùng",
  "admin-cvs": "Quản trị / Kiểm duyệt & Quản lý CV",
  "admin-logs": "Quản trị / Nhật ký kiểm toán",
}

export default function AppShell({
  page,
  children,
  onNavigate,
  drawerOpen,
  sidebarOpen = drawerOpen,
  onMenu,
  onClose,
  onSearch,
  user,
  onLogout,
}) {
  const isSidebarVisible = sidebarOpen !== undefined ? sidebarOpen : drawerOpen

  return (
    <section
      className={`artboard app-screen ${!isSidebarVisible ? "sidebar-collapsed" : ""}`}
      aria-label={pageNames[page]}
    >
      <Sidebar
        active={page === "detail" ? "cvs" : page}
        onNavigate={onNavigate}
        open={isSidebarVisible}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Topbar
          section={pageNames[page]}
          onSearch={onSearch}
          onMenu={onMenu}
          sidebarOpen={isSidebarVisible}
        />
        {children}
      </main>
    </section>
  )
}
