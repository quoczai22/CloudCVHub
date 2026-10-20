import { useState } from "react"
import LoginPage from "../pages/Login.jsx"
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx"
import CVListPage from "../pages/CVList/CVListPage.jsx"
import UploadPage from "../pages/Upload/UploadPage.jsx"
import DetailPage from "../pages/Detail/DetailPage.jsx"
import SharesPage from "../pages/Shares/SharesPage.jsx"
import ProfilePage from "../pages/Profile/ProfilePage.jsx"
import SettingsPage from "../pages/Settings/SettingsPage.jsx"
import AdminPage from "../pages/Admin/AdminPage.jsx"

export default function AppRoutes({ onLogout: parentLogout } = {}) {
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

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  const props = {
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

  let screen
  if (page === "overview") screen = <DashboardPage {...props} />
  else if (page === "cvs") screen = <CVListPage {...props} />
  else if (page === "upload") screen = <UploadPage {...props} />
  else if (page === "detail") screen = <DetailPage {...props} />
  else if (page === "shares") screen = <SharesPage {...props} />
  else if (page === "profile") screen = <ProfilePage {...props} />
  else if (page === "settings") screen = <SettingsPage {...props} />
  else if (page === "admin-users") screen = <AdminPage {...props} mode="users" />
  else screen = <AdminPage {...props} mode="cvs" />

  return (
    <div className="product-app">
      {screen}
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
