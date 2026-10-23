import { useState } from "react"

import LoginPage from "../pages/Login.jsx"
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx"
import CVListPage from "../pages/CVList/CVListPage.jsx"
import UploadPage from "../pages/Upload/UploadPage.jsx"
import DetailPage from "../pages/Detail/DetailPage.jsx"
import SharesPage from "../pages/Shares/SharesPage.jsx"
import ProfilePage from "../pages/Profile/ProfilePage.jsx"
import SettingsPage from "../pages/Settings/SettingsPage.jsx"
import AppShell from "../layouts/AppShell.jsx"
import AdminDashboardPage from "../areas/admin/pages/AdminDashboardPage.jsx"
import AdminUsersPage from "../areas/admin/pages/AdminUsersPage.jsx"
import AdminCVsPage from "../areas/admin/pages/AdminCVsPage.jsx"
import AdminLogsPage from "../areas/admin/pages/AdminLogsPage.jsx"

export default function MainRouter({ onLogout: parentLogout } = {}) {
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null")
    } catch {
      return null
    }
  })
  const [page, setPage] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLoginSuccess = (newToken, newUser) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    parentLogout?.()
  }

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const commonProps = {
    onNavigate: (newPage) => {
      setPage(newPage)
      if (typeof window !== "undefined" && window.innerWidth <= 880) {
        setSidebarOpen(false)
      }
    },
    drawerOpen: sidebarOpen,
    sidebarOpen,
    onMenu: handleToggleSidebar,
    onToggleSidebar: handleToggleSidebar,
    onClose: () => setSidebarOpen(false),
    user,
    onLogout: handleLogout,
  }

  const renderActiveScreen = () => {
    if (!token) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />
    }

    // =========================================================================
    // [TỐI ƯU IMPECCABLE 02 - UNIFIED APPSHELL FOR ADMIN AREA]
    // Mục đích: Loại bỏ sidebar màu đỏ bị chèn lệch và khoảng hở 242px bên trái.
    // Tích hợp trực tiếp các trang Admin vào AppShell chuẩn của ứng dụng.
    // =========================================================================
    if (page.startsWith("admin-")) {
      return (
        <AppShell {...commonProps} page={page}>
          <div className="page content-page admin-page">
            {page === "admin-dashboard" && <AdminDashboardPage onNavigate={commonProps.onNavigate} />}
            {page === "admin-users" && <AdminUsersPage onNavigate={commonProps.onNavigate} />}
            {page === "admin-cvs" && <AdminCVsPage onNavigate={commonProps.onNavigate} />}
            {page === "admin-logs" && <AdminLogsPage onNavigate={commonProps.onNavigate} />}
          </div>
        </AppShell>
      )
    }

    switch (page) {
      case "overview":
        return <DashboardPage {...commonProps} />
      case "cvs":
        return <CVListPage {...commonProps} />
      case "upload":
        return <UploadPage {...commonProps} />
      case "detail":
        return <DetailPage {...commonProps} />
      case "shares":
        return <SharesPage {...commonProps} />
      case "profile":
        return <ProfilePage {...commonProps} />
      case "settings":
        return <SettingsPage {...commonProps} />
      default:
        return <DashboardPage {...commonProps} />
    }
  }

  return (
    <div className="product-app">
      {renderActiveScreen()}
      {sidebarOpen && (
        <button
          type="button"
          className="drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Đóng menu"
        />
      )}
    </div>
  )
}
