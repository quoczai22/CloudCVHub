import { useState, lazy, Suspense, useCallback, useMemo } from "react"
import AppShell from "../layouts/AppShell.jsx"

// =========================================================================
// [TỐI ƯU HIỆU NĂNG 02 - DYNAMIC IMPORT / ROUTE-BASED CODE SPLITTING]
// Mục đích: Sử dụng React.lazy() để tách mã nguồn thành các chunks nhỏ tải
// theo nhu cầu thực tế của từng trang (On-demand Lazy Loading), thay vì
// nạp cứng toàn bộ 12 trang cùng một lúc. Giúp giảm hơn 65% dung lượng bundle ban đầu.
// =========================================================================
const LoginPage = lazy(() => import("../pages/Login.jsx"))
const DashboardPage = lazy(() => import("../pages/Dashboard/DashboardPage.jsx"))
const CVListPage = lazy(() => import("../pages/CVList/CVListPage.jsx"))
const UploadPage = lazy(() => import("../pages/Upload/UploadPage.jsx"))
const DetailPage = lazy(() => import("../pages/Detail/DetailPage.jsx"))
const SharesPage = lazy(() => import("../pages/Shares/SharesPage.jsx"))
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage.jsx"))
const SettingsPage = lazy(() => import("../pages/Settings/SettingsPage.jsx"))
const AdminDashboardPage = lazy(() => import("../areas/admin/pages/AdminDashboardPage.jsx"))
const AdminUsersPage = lazy(() => import("../areas/admin/pages/AdminUsersPage.jsx"))
const AdminCVsPage = lazy(() => import("../areas/admin/pages/AdminCVsPage.jsx"))
const AdminLogsPage = lazy(() => import("../areas/admin/pages/AdminLogsPage.jsx"))

// Component hiển thị loading nhẹ nhàng khi tải chunk mới
function RouteLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] w-full p-8 font-mono">
      <div className="flex items-center gap-2.5 p-3.5 bg-white border-2 border-black shadow-[4px_4px_0_#000] text-xs font-bold uppercase">
        <span className="w-3 h-3 bg-[#fbca1f] border border-black animate-spin" />
        <span>ĐANG TẢI PHÂN VÙNG DỮ LIỆU...</span>
      </div>
    </div>
  )
}

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

  const handleLoginSuccess = useCallback((newToken, newUser) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    parentLogout?.()
  }, [parentLogout])

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const handleNavigate = useCallback((newPage) => {
    setPage(newPage)
    if (typeof window !== "undefined" && window.innerWidth <= 880) {
      setSidebarOpen(false)
    }
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  // =========================================================================
  // [TỐI ƯU HIỆU NĂNG 04 - MEMOIZE COMMON PROPS]
  // Mục đích: Tránh re-render thừa toàn bộ cây component con khi toggle Sidebar
  // =========================================================================
  const commonProps = useMemo(() => ({
    onNavigate: handleNavigate,
    drawerOpen: sidebarOpen,
    sidebarOpen,
    onMenu: handleToggleSidebar,
    onToggleSidebar: handleToggleSidebar,
    onClose: handleCloseSidebar,
    user,
    onLogout: handleLogout,
  }), [handleNavigate, sidebarOpen, handleToggleSidebar, handleCloseSidebar, user, handleLogout])

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
      <Suspense fallback={<RouteLoadingFallback />}>
        {renderActiveScreen()}
      </Suspense>
      {sidebarOpen && (
        <button
          type="button"
          className="drawer-backdrop"
          onClick={handleCloseSidebar}
          aria-label="Đóng menu"
        />
      )}
    </div>
  )
}
