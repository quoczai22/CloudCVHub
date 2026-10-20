import { useState } from 'react'
import Icon from '../../components/UI/Icon'
import Kicker from '../../components/UI/Kicker'
import Button from '../../components/UI/Button'
import Sidebar from '../../components/Common/Sidebar'
import Header from '../../components/Common/Header'
import StatGrid from './components/StatGrid'
import QuickActions from './components/QuickActions'
import RecentEdits from './components/RecentEdits'
import VaultMonitor from './components/VaultMonitor'

export default function DashboardPage({
  onNavigate,
  drawerOpen,
  onMenu,
  onClose,
  user,
  onLogout,
}) {
  const [toast, setToast] = useState("")
  const action = (text) => {
    setToast(text)
    window.setTimeout(() => setToast(""), 1800)
  }

  return (
    <section className="artboard app-screen" aria-label="Dashboard screen">
      <Sidebar
        active="overview"
        onNavigate={onNavigate}
        open={drawerOpen}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Header section="Tổng quan" onMenu={onMenu} />
        <div className="page dashboard-page">
          <div className="page-heading">
            <div>
              <Kicker>THỨ HAI, 12 THÁNG 5</Kicker>
              <h2>
                Trung tâm điều hành<span>.</span>
              </h2>
              <p>
                Chào Minh Anh. Kho CV của bạn đang an toàn và hoạt động ổn định.
              </p>
            </div>
            <Button icon="plus" onClick={() => onNavigate("upload")}>
              TẠO CV MỚI
            </Button>
          </div>

          <StatGrid />

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
