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
  "admin-users": "Quản lý người dùng",
  "admin-cvs": "Quản lý CV",
}

export default function AppShell({
  page,
  children,
  onNavigate,
  drawerOpen,
  onMenu,
  onClose,
  onSearch,
  user,
  onLogout,
}) {
  return (
    <section className="artboard app-screen" aria-label={pageNames[page]}>
      <Sidebar
        active={page === "detail" ? "cvs" : page}
        onNavigate={onNavigate}
        open={drawerOpen}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Topbar section={pageNames[page]} onSearch={onSearch} onMenu={onMenu} />
        {children}
      </main>
    </section>
  )
}
