import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

const pageTitles = {
  "admin-dashboard": "Tổng quan máy chủ",
  "admin-users": "Quản lý Người dùng",
  "admin-cvs": "Kiểm duyệt & Quản lý CV",
  "admin-logs": "Nhật ký kiểm toán hệ thống",
}

export default function AdminLayout({
  activeTab = "admin-dashboard",
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
  const currentTitle = pageTitles[activeTab] || "Quản trị hệ thống"

  return (
    <section
      className={`artboard app-screen admin-area-screen ${!isSidebarVisible ? "sidebar-collapsed" : ""}`}
      aria-label={`Admin Area - ${currentTitle}`}
    >
      {/* Top Hazard Warning Stripe */}
      <div
        className="w-full h-1.5 border-b border-black"
        style={{
          background: "repeating-linear-gradient(45deg, #fbca1f, #fbca1f 12px, #000 12px, #000 24px)",
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          active={activeTab}
          onNavigate={onNavigate}
          open={isSidebarVisible}
          onClose={onClose}
          user={user}
          onLogout={onLogout}
        />

        <main className="app-main flex-1 flex flex-col overflow-y-auto">
          <AdminTopbar
            section={currentTitle}
            onSearch={onSearch}
            onMenu={onMenu}
            sidebarOpen={isSidebarVisible}
          />
          <div className="p-4 md:p-6 flex-1">
            {children}
          </div>
        </main>
      </div>
    </section>
  )
}
