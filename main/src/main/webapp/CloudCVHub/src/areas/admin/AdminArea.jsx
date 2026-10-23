import AdminGuard from './AdminGuard'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminCVsPage from './pages/AdminCVsPage'
import AdminLogsPage from './pages/AdminLogsPage'

export default function AdminArea({
  activeTab = "admin-dashboard",
  onNavigate,
  drawerOpen,
  sidebarOpen = drawerOpen,
  onMenu,
  onClose,
  onSearch,
  user,
  onLogout,
  onElevateToAdmin,
}) {
  const renderAdminContent = () => {
    switch (activeTab) {
      case "admin-dashboard":
        return <AdminDashboardPage onNavigate={onNavigate} />
      case "admin-users":
        return <AdminUsersPage onNavigate={onNavigate} />
      case "admin-cvs":
        return <AdminCVsPage onNavigate={onNavigate} />
      case "admin-logs":
        return <AdminLogsPage onNavigate={onNavigate} />
      default:
        return <AdminDashboardPage onNavigate={onNavigate} />
    }
  }

  return (
    <AdminGuard
      user={user}
      onNavigate={onNavigate}
      onElevateToAdmin={onElevateToAdmin}
    >
      <AdminLayout
        activeTab={activeTab}
        onNavigate={onNavigate}
        drawerOpen={drawerOpen}
        sidebarOpen={sidebarOpen}
        onMenu={onMenu}
        onClose={onClose}
        onSearch={onSearch}
        user={user}
        onLogout={onLogout}
      >
        {renderAdminContent()}
      </AdminLayout>
    </AdminGuard>
  )
}
