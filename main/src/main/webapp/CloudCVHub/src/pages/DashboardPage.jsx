import { useState } from 'react'
import Icon from '../components/UI/Icon'
import Kicker from '../components/UI/Kicker'
import Button from '../components/UI/Button'
import Sparkline from '../components/UI/Sparkline'
import Sidebar from '../layouts/Sidebar'
import Topbar from '../layouts/Topbar'

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
        <Topbar section="Tổng quan" onMenu={onMenu} />
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
          <div className="stat-grid">
            {[
              ["TỔNG CV", "12", "+2 THÁNG NÀY", 0],
              ["LƯỢT XEM", "348", "+18.4%", 1],
              ["LIÊN KẾT", "08", "6 ĐANG BẬT", 2],
              ["ĐIỂM TRUNG BÌNH", "92", "TOP 8%", 0],
            ].map(([label, value, change, variant], i) => (
              <div
                className={`stat-card ${i === 1 ? "stat-yellow" : ""}`}
                key={label}
              >
                <div className="stat-head">
                  <span>{label}</span>
                  <b>0{i + 1}</b>
                </div>
                <div className="stat-value">{value}</div>
                <div className="stat-foot">
                  <span className={i === 1 ? "dark-chip" : ""}>↗ {change}</span>
                  <Sparkline variant={variant} />
                </div>
              </div>
            ))}
          </div>
          <div className="dash-columns">
            <div>
              <div className="section-title">
                <h3>Thao tác nhanh</h3>
                <span>THỰC THI / KHỞI TẠO</span>
              </div>
              <div className="quick-grid">
                <button onClick={() => onNavigate("upload")}>
                  <span className="action-icon coral">
                    <Icon name="plus" size={28} />
                  </span>
                  <b>Tạo CV mới</b>
                  <small>Bắt đầu từ một không gian trống</small>
                  <Icon name="arrow" />
                </button>
                <button onClick={() => onNavigate("upload")}>
                  <span className="action-icon yellow">
                    <Icon name="upload" size={28} />
                  </span>
                  <b>Nhập CV hiện có</b>
                  <small>PDF, DOCX tối đa 10MB</small>
                  <Icon name="arrow" />
                </button>
                <button onClick={() => onNavigate("cvs")}>
                  <span className="action-icon white">
                    <Icon name="file" size={28} />
                  </span>
                  <b>Duyệt mẫu CV</b>
                  <small>24 bố cục đã được kiểm chứng</small>
                  <Icon name="arrow" />
                </button>
              </div>
              <div className="section-title recent-title">
                <h3>Chỉnh sửa gần đây</h3>
                <button onClick={() => onNavigate("cvs")}>
                  XEM TẤT CẢ <Icon name="arrow" size={14} />
                </button>
              </div>
              <div className="recent-list">
                <div>
                  <span className="file-block">CV</span>
                  <span>
                    <b>Product Designer cấp cao</b>
                    <small>Chỉnh sửa 2 giờ trước • v8.2</small>
                  </span>
                  <span className="status live">LIVE</span>
                  <button>
                    <Icon name="menu" />
                  </button>
                </div>
                <div>
                  <span className="file-block yellow">CV</span>
                  <span>
                    <b>Trưởng nhóm Design System</b>
                    <small>Chỉnh sửa hôm qua • v4.0</small>
                  </span>
                  <span className="status draft">DRAFT</span>
                  <button>
                    <Icon name="menu" />
                  </button>
                </div>
              </div>
            </div>
            <div className="storage-panel">
              <div className="storage-head">
                <span>
                  <Icon name="cloud" size={26} />
                </span>
                <div>
                  <Kicker>VAULT MONITOR</Kicker>
                  <h3>Cloud storage</h3>
                </div>
              </div>
              <div className="storage-ring">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" />
                  <circle className="progress" cx="60" cy="60" r="50" />
                </svg>
                <div>
                  <b>62%</b>
                  <span>USED</span>
                </div>
              </div>
              <div className="storage-numbers">
                <span>
                  <b>6.2 GB</b>
                  <small>USED SPACE</small>
                </span>
                <span>
                  <b>10 GB</b>
                  <small>TOTAL SPACE</small>
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={62}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress"
                className="my-3 w-full"
              >
                <div className="w-full border-2 border-white bg-black p-1 shadow-[2px_2px_0_0] shadow-white">
                  <div
                    className="h-3 bg-[repeating-linear-gradient(45deg,#facc15_0,#facc15_10px,#eab308_10px,#eab308_20px)] transition-all duration-300"
                    style={{ width: "62%" }}
                  />
                </div>
              </div>
              <div className="file-breakdown">
                <div>
                  <i className="coral-dot" />
                  <span>DOCUMENTS</span>
                  <b>4.8 GB</b>
                </div>
                <div>
                  <i className="yellow-dot" />
                  <span>MEDIA</span>
                  <b>1.1 GB</b>
                </div>
                <div>
                  <i className="black-dot" />
                  <span>OTHER</span>
                  <b>0.3 GB</b>
                </div>
              </div>
              <Button
                variant="light"
                icon="cloud"
                onClick={() => action("STORAGE MANAGER OPENED")}
              >
                MANAGE STORAGE
              </Button>
            </div>
          </div>
        </div>
      </main>
      {toast && (
        <div className="toast">
          <Icon name="check" /> {toast}
        </div>
      )}
    </section>
  )
}
