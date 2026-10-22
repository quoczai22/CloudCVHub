import { useState } from "react"
import { adminRoutes } from "./config/adminRoutes"
import RenderConfig from "./RenderConfig"

import LoginPage from "../pages/Login.jsx"
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx"
import CVListPage from "../pages/CVList/CVListPage.jsx"
import UploadPage from "../pages/Upload/UploadPage.jsx"
import DetailPage from "../pages/Detail/DetailPage.jsx"
import SharesPage from "../pages/Shares/SharesPage.jsx"
import ProfilePage from "../pages/Profile/ProfilePage.jsx"
import SettingsPage from "../pages/Settings/SettingsPage.jsx"
import AdminPage from "../pages/Admin/AdminPage.jsx"

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
  const [drawerOpen, setDrawerOpen] = useState(false)

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

  const commonProps = {
    onNavigate: (newPage) => {
      setPage(newPage)
      setDrawerOpen(false)
    },
    drawerOpen,
    onMenu: () => setDrawerOpen(true),
    onClose: () => setDrawerOpen(false),
    user,
    onLogout: handleLogout,
  }

  // Helper check admin route
  const currentAdminRoute = adminRoutes.find(r => r.id === page)

  const renderActiveScreen = () => {
    if (!token) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />
    }

    if (currentAdminRoute) {
      return (
        <RenderConfig token={token} user={user} requiredRole={currentAdminRoute.role}>
          <AdminPage {...commonProps} mode={currentAdminRoute.mode || "users"} />
        </RenderConfig>
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
      {drawerOpen && (
        <button
          type="button"
          className="drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-label="Đóng menu"
        />
      )}
    </div>
  )
}
