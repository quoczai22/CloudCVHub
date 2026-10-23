import { useState } from 'react'
import Icon from '../../components/UI/Icon'
import Sidebar from '../../components/Common/Sidebar'
import Header from '../../components/Common/Header'
import DashboardSummary from './components/DashboardSummary'
import DashboardChart from './components/DashboardChart'
import QuickActions from './components/QuickActions'
import RecentEdits from './components/RecentEdits'
import VaultMonitor from './components/VaultMonitor'
import './DashboardPage.css'

export default function DashboardPage({
  onNavigate,
  drawerOpen,
  sidebarOpen = drawerOpen,
  onMenu,
  onClose,
  user,
  onLogout,
}) {
  const isSidebarVisible = sidebarOpen !== undefined ? sidebarOpen : drawerOpen
  const [toast, setToast] = useState("")
  const action = (text) => {
    setToast(text)
    window.setTimeout(() => setToast(""), 1800)
  }

  return (
    <section
      className={`artboard app-screen ${!isSidebarVisible ? "sidebar-collapsed" : ""}`}
      aria-label="Dashboard screen"
    >
      <Sidebar
        active="overview"
        onNavigate={onNavigate}
        open={isSidebarVisible}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Header section="Tổng quan" onMenu={onMenu} sidebarOpen={isSidebarVisible} />
        <div className="page dashboard-page">
          <DashboardSummary onNavigate={onNavigate} />
          <DashboardChart />

          <div className="dash-columns">
            <div>
              <QuickActions onNavigate={onNavigate} />
              <RecentEdits onNavigate={onNavigate} />
            </div>

            <aside className="dash-aside">
              <VaultMonitor onAction={action} />

              <div className="tip-card">
                <b>CHẾ ĐỘ PRO ĐANG BẬT</b>
                <p>
                  Tất cả các liên kết chia sẻ được mã hóa bằng AES-256. Bật xác
                  thực 2 yếu tố để tăng thêm lớp bảo vệ.
                </p>
                <button
                  type="button"
                  className="btn btn-yellow"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => onNavigate("settings")}
                >
                  <Icon name="shield" size={14} /> Cài đặt bảo mật
                </button>
              </div>

              <div className="system-status">
                <span className="dot pulse" />
                <span>MÁY CHỦ SẴN SÀNG • ĐỘ TRỄ 24MS</span>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {toast && <div className="toast-pop">{toast}</div>}
    </section>
  )
}
