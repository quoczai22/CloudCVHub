import { useMemo, useState, useEffect, type ReactNode } from "react"
import { apiUrl } from "../apis/apiClient"
import LoginPage from "../pages/Login.jsx"

type IconName = "grid" | "file" | "cloud" | "user" | "settings" | "search" | "plus" | "upload" | "edit" | "link" | "history" | "trash" | "shield" | "check" | "arrow" | "menu" | "bell" | "logout" | "lock"

type PageId = "overview" | "cvs" | "upload" | "detail" | "shares" | "profile" | "settings" | "admin-users" | "admin-cvs"

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
    file: (
      <>
        <path d="M6 2h8l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
      </>
    ),
    cloud: <path d="M7 19h11a4 4 0 0 0 .5-8A7 7 0 0 0 5 9.5 5 5 0 0 0 7 19Z" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 22a8 8 0 0 1 16 0" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    upload: (
      <>
        <path d="M12 16V3m0 0L7 8m5-5 5 5M4 15v6h16v-6" />
      </>
    ),
    edit: (
      <>
        <path d="m4 20 4.5-1 10-10-3.5-3.5-10 10Z" />
        <path d="m13 7.5 3.5 3.5" />
      </>
    ),
    link: (
      <>
        <path d="m10 13 4-4" />
        <path d="M8 16H6a4 4 0 0 1 0-8h4M16 8h2a4 4 0 0 1 0 8h-4" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6 7l1 15h10l1-15M10 11v7M14 11v7" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4 5v6c0 5.5 3.5 9 8 11 4.5-2 8-5.5 8-11V5Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    logout: (
      <>
        <path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" />
        <path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3" />
      </>
    ),
  }
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const logo = (
  <div className="logo">
    <div className="logo-mark">
      <Icon name="cloud" size={24} />
    </div>
    <span>
      CloudCV<span>Hub</span>
    </span>
  </div>
)

function Kicker({ children }: { children: ReactNode }) {
  return (
    <div className="kicker">
      <span>//</span> {children}
    </div>
  )
}

function Button({
  children,
  icon,
  variant = "dark",
  onClick,
  type = "button",
}: {
  children: ReactNode
  icon?: IconName
  variant?: "dark" | "light" | "yellow" | "ghost" | "danger"
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {icon && <Icon name={icon} size={17} />}
      {children}
    </button>
  )
}

function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string
  type?: string
  placeholder?: string
  defaultValue?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </label>
  )
}

function AuthScreen({
  onLoginSuccess,
}: {
  onLoginSuccess?: (token: string, user: any) => void
}) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    try {
      const endpoint = isRegister ? "/api/v1/auth/register" : "/api/v1/auth/login"
      const body = isRegister ? { email, password, fullName } : { email, password }
      const res = await fetch(apiUrl(endpoint), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || (isRegister ? "Đăng ký thất bại" : "Đăng nhập thất bại"))
      }
      setMessage(isRegister ? "ĐĂNG KÝ THÀNH CÔNG! ĐANG VÀO HỆ THỐNG..." : "XÁC THỰC THÀNH CÔNG — ĐANG VÀO VAULT")
      const tok = data.result?.accessToken || "verified-token"
      const usr = data.result?.user || { fullName: fullName || "Người dùng", email, role: "PRO" }
      setTimeout(() => {
        onLoginSuccess?.(tok, usr)
      }, 500)
    } catch (err: any) {
      setError(err.message || "Lỗi kết nối máy chủ backend. Bạn có thể dùng nút Chế Độ Demo bên dưới để trải nghiệm ngay.")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoAccess = () => {
    setMessage("ĐANG KÍCH HOẠT QUYỀN DEMO PRO...")
    setTimeout(() => {
      onLoginSuccess?.("demo-token-pro-access", {
        fullName: "Nguyễn Minh Anh",
        email: "minhanh.nguyen@cloudcv.io",
        role: "PRO",
      })
    }, 400)
  }

  return (
    <section
      className={`artboard auth-screen ${isRegister ? "register-active" : ""}`}
      aria-label="Authentication screen"
    >
      {/* Sliding Brand Panel */}
      <div className="auth-brand-panel">
        <div className="auth-top">
          {logo}
          <span className="version-tag">{isRegister ? "SYS.REGISTER" : "SYS.V2.4"}</span>
        </div>
        <div className="welcome-card">
          <Kicker>{isRegister ? "JOIN THE NETWORK" : "YOUR CAREER. ENCRYPTED."}</Kicker>
          {isRegister ? (
            <>
              <h1>
                JOIN.
                <br />
                ENCRYPT.
                <br />
                <em>STAND OUT.</em>
              </h1>
              <p>
                Khởi tạo kho lưu trữ CV bảo mật đám mây, đa phiên bản và sẵn sàng kết nối cùng nhà tuyển dụng.
              </p>
            </>
          ) : (
            <>
              <h1>
                BUILD.
                <br />
                STORE.
                <br />
                <em>STAND OUT.</em>
              </h1>
              <p>
                Your private command center for creating, versioning and sharing
                career-defining CVs.
              </p>
            </>
          )}
          <div className="terminal-card">
            <div className="terminal-bar">
              <span></span>
              <span></span>
              <span></span>
              <b>secure_terminal</b>
            </div>
            <code>
              <i>$</i> {isRegister ? "user.register --init" : "vault.status"}
              <br />
              <strong>{isRegister ? "✓ VAULT READY FOR ONBOARDING" : "✓ ALL SYSTEMS SECURE"}</strong>
              <br />
              <i>$</i> encryption
              <br />
              <strong>AES-256-GCM + SHA-256</strong>
              <span className="cursor">_</span>
            </code>
          </div>

          <div className="auth-trust-badges">
            <div className="auth-trust-item">
              <span><Icon name="shield" size={14} /></span>
              <b>Mã hóa AES-256 & Xác thực SHA-256</b>
            </div>
            <div className="auth-trust-item">
              <span><Icon name="file" size={14} /></span>
              <b>Quản lý lịch sử đa phiên bản CV</b>
            </div>
            <div className="auth-trust-item">
              <span><Icon name="lock" size={14} /></span>
              <b>Chia sẻ link bảo mật có thời hạn</b>
            </div>
          </div>
        </div>
        <div className="auth-foot">
          <span>© 2025 CLOUDCVHUB</span>
          <span>END-TO-END ENCRYPTED</span>
        </div>
      </div>

      {/* Sliding Forms Panel */}
      <div className="auth-forms-panel">
        <div className="pixel-grid" />
        <div className="login-wrap">
          <div className="login-index">{isRegister ? "02 / REGISTER" : "01 / ACCESS"}</div>
          <h2>
            {isRegister ? (
              <>
                Create
                <br />
                account<span>.</span>
              </>
            ) : (
              <>
                Welcome
                <br />
                back<span>.</span>
              </>
            )}
          </h2>
          <p className="subcopy">
            {isRegister
              ? "Tạo danh tính bảo mật để quản lý toàn bộ CV của bạn."
              : "Authenticate to enter your secure workspace."}
          </p>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <label className="field">
                <span>HỌ VÀ TÊN</span>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </label>
            )}
            <label className="field">
              <span>EMAIL_ADDRESS</span>
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>PASSWORD</span>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="form-meta">
              <label>
                <input type="checkbox" defaultChecked /> KEEP ME SIGNED IN
              </label>
              <button type="button" onClick={handleDemoAccess}>
                VÀO NHANH DEMO
              </button>
            </div>
            <Button type="submit" icon="arrow" disabled={loading}>
              {loading
                ? "AUTHENTICATING..."
                : isRegister
                  ? "TẠO TÀI KHOẢN MỚI"
                  : "ENTER SECURE VAULT"}
            </Button>
          </form>
          {error && (
            <div
              className="auth-message"
              style={{ background: "#ffe0e0", borderColor: "#c62135", color: "#c62135" }}
            >
              <Icon name="shield" size={15} /> {error}
            </div>
          )}
          {message && (
            <div className="auth-message">
              <Icon name="check" size={15} /> {message}
            </div>
          )}
          <div className="divider">
            <span>HOẶC TRẢI NGHIỆM NGAY</span>
          </div>
          <Button variant="yellow" type="button" onClick={handleDemoAccess}>
            <Icon name="shield" size={16} /> TRẢI NGHIỆM CHẾ ĐỘ DEMO (PRO VAULT)
          </Button>
          <p className="signup">
            {isRegister ? "ĐÃ CÓ TÀI KHOẢN? " : "CHƯA CÓ TÀI KHOẢN? "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister)
                setError("")
                setMessage("")
              }}
            >
              {isRegister ? "← ĐĂNG NHẬP" : "TẠO TÀI KHOẢN →"}
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

const navItems: { id: PageId label: string icon: IconName }[] = [
  { id: "overview", label: "Tổng quan", icon: "grid" },
  { id: "cvs", label: "CV của tôi", icon: "file" },
  { id: "upload", label: "Tải CV lên", icon: "upload" },
  { id: "shares", label: "Liên kết chia sẻ", icon: "link" },
  { id: "profile", label: "Hồ sơ cá nhân", icon: "user" },
  { id: "settings", label: "Cài đặt", icon: "settings" },
]

const adminNavItems: { id: PageId label: string icon: IconName }[] = [
  { id: "admin-users", label: "Quản lý người dùng", icon: "user" },
  { id: "admin-cvs", label: "Quản lý CV", icon: "shield" },
]

function Sidebar({
  active = "overview",
  onNavigate,
  open = false,
  onClose,
  user,
  onLogout,
}: {
  active?: PageId
  onNavigate?: (item: PageId) => void
  open?: boolean
  onClose?: () => void
  user?: any
  onLogout?: () => void
}) {
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .map((w: string) => w[0])
        .slice(-2)
        .join("")
        .toUpperCase()
    : "AK"

  const renderItem = (
    item: { id: PageId label: string icon: IconName },
    index: number,
  ) => (
    <button
      key={item.id}
      className={active === item.id ? "active" : ""}
      onClick={() => {
        onNavigate?.(item.id)
        onClose?.()
      }}
    >
      <span className="nav-number">{String(index + 1).padStart(2, "0")}</span>
      <Icon name={item.icon} />
      <b>{item.label}</b>
      {active === item.id && <Icon name="arrow" size={16} />}
    </button>
  )
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      {logo}
      <button className="drawer-close" onClick={onClose} aria-label="Đóng menu">
        ×
      </button>
      <div className="nav-label">KHÔNG GIAN LÀM VIỆC</div>
      <nav>{navItems.map(renderItem)}</nav>
      <div className="nav-label admin-label">QUẢN TRỊ</div>
      <nav>
        {adminNavItems.map((item, index) => renderItem(item, index + 6))}
      </nav>
      <div className="integrity">
        <div>
          <Icon name="shield" size={22} />
          <span>
            <b>SYSTEM INTEGRITY</b>
            <small>VERIFIED</small>
          </span>
        </div>
        <code>
          SHA-256
          <br />
          9f86d081884c7d65...
        </code>
      </div>
      <button
        className="sidebar-user"
        onClick={onLogout}
        title="Bấm để đăng xuất"
      >
        <span className="avatar avatar-small">{initials}</span>
        <span>
          <b>{user?.fullName || "Nguyễn Minh Anh"}</b>
          <small>TÀI KHOẢN {user?.role || "PRO"}</small>
        </span>
        <Icon name="logout" />
      </button>
    </aside>
  )
}

function Topbar({
  section,
  onSearch,
  onMenu,
}: {
  section: string
  onSearch?: (value: string) => void
  onMenu?: () => void
}) {
  return (
    <header className="topbar">
      <div>
        <button className="mobile-menu" onClick={onMenu} aria-label="Mở menu">
          <Icon name="menu" />
        </button>
        <span>KHÔNG GIAN /</span>
        <b>{section.toUpperCase()}</b>
      </div>
      <div className="top-actions">
        <label htmlFor="TopSearch" className="block relative">
          <span className="sr-only">Tìm kiếm</span>
          <div className="flex border-2 border-black shadow-[4px_4px_0_0] shadow-black focus-within:ring-2 focus-within:ring-yellow-300 bg-white">
            <input
              type="search"
              id="TopSearch"
              placeholder="TÌM KIẾM HỒ SƠ..."
              className="w-44 sm:w-60 border-none bg-white text-black px-3 py-1.5 focus:ring-0 sm:text-xs font-mono outline-none"
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <button
              type="button"
              className="bg-yellow-300 border-l-2 border-black px-3 py-1.5 text-xs/none font-bold tracking-wide uppercase hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-0 cursor-pointer font-mono"
            >
              Search
            </button>
          </div>
        </label>
        <button className="square-btn">
          <Icon name="bell" />
          <i />
        </button>
        <span className="system-online">
          <i /> HỆ THỐNG ONLINE
        </span>
      </div>
    </header>
  )
}

const Sparkline = ({ variant = 0 }: { variant?: number }) => {
  const paths = [
    "M2 38 18 29 34 34 52 14 70 22 88 9 106 18 124 5",
    "M2 31 18 35 34 20 52 26 70 13 88 22 106 8 124 12",
    "M2 36 18 22 34 30 52 11 70 18 88 5 106 14 124 3",
  ]
  return (
    <svg className="sparkline" viewBox="0 0 126 44">
      <path className="spark-grid" d="M0 42h126M0 22h126M0 2h126" />
      <path d={paths[variant]} />
    </svg>
  )
}

type ScreenProps = {
  onNavigate: (page: PageId) => void
  drawerOpen: boolean
  onMenu: () => void
  onClose: () => void
  user?: any
  onLogout?: () => void
}

function DashboardScreen({
  onNavigate,
  drawerOpen,
  onMenu,
  onClose,
  user,
  onLogout,
}: ScreenProps) {
  const [toast, setToast] = useState("")
  const action = (text: string) => {
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
                key={label as string}
              >
                <div className="stat-head">
                  <span>{label}</span>
                  <b>0{i + 1}</b>
                </div>
                <div className="stat-value">{value}</div>
                <div className="stat-foot">
                  <span className={i === 1 ? "dark-chip" : ""}>↗ {change}</span>
                  <Sparkline variant={variant as number} />
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

type CVRow = {
  title: string
  type: string
  modified: string
  views: number
  status: "LIVE" | "DRAFT" | "ARCHIVED"
  version: string
}
const cvs: CVRow[] = [
  {
    title: "Product Designer cấp cao",
    type: "SẢN PHẨM / UX",
    modified: "2 GIỜ TRƯỚC",
    views: 184,
    status: "LIVE",
    version: "v8.2",
  },
  {
    title: "Trưởng nhóm Design System",
    type: "VẬN HÀNH THIẾT KẾ",
    modified: "HÔM QUA",
    views: 92,
    status: "DRAFT",
    version: "v4.0",
  },
  {
    title: "Hồ sơ nghiên cứu người dùng",
    type: "NGHIÊN CỨU UX",
    modified: "03 THÁNG 5 2025",
    views: 56,
    status: "LIVE",
    version: "v3.1",
  },
  {
    title: "Giám đốc sáng tạo",
    type: "LÃNH ĐẠO",
    modified: "28 THÁNG 4 2025",
    views: 211,
    status: "ARCHIVED",
    version: "v6.4",
  },
  {
    title: "Product Designer tự do",
    type: "FREELANCE",
    modified: "14 THÁNG 4 2025",
    views: 38,
    status: "DRAFT",
    version: "v2.0",
  },
]

function CVTableScreen(props: ScreenProps) {
  const { onNavigate, drawerOpen, onMenu, onClose, user, onLogout } = props
  const [filter, setFilter] = useState("ALL CVS")
  const [search, setSearch] = useState("")
  const [menu, setMenu] = useState<string | null>("Product Designer cấp cao")
  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const filtered = useMemo(
    () =>
      cvs.filter(
        (cv) =>
          (filter === "ALL CVS" || cv.status === filter) &&
          cv.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [filter, search],
  )
  return (
    <section className="artboard app-screen" aria-label="CV management screen">
      <Sidebar
        active="cvs"
        onNavigate={onNavigate}
        open={drawerOpen}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Topbar
          section="CV của tôi"
          onSearch={(value) => {
            setSearch(value)
            setLoading(true)
            window.setTimeout(() => setLoading(false), 280)
          }}
          onMenu={onMenu}
        />
        <div className="page cv-page">
          <div className="page-heading">
            <div>
              <Kicker>DOCUMENT REGISTRY</Kicker>
              <h2>
                Your CVs<span>.</span>
              </h2>
              <p>Create, manage and deploy your professional identities.</p>
            </div>
            <Button icon="plus" onClick={() => onNavigate("upload")}>
              TẠO CV MỚI
            </Button>
          </div>
          <div className="toolbar">
            <div className="filter-pills">
              {["ALL CVS", "LIVE", "DRAFT", "ARCHIVED"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={filter === item ? "active" : ""}
                >
                  {item}
                  <span>
                    {item === "ALL CVS"
                      ? 12
                      : item === "LIVE"
                        ? 6
                        : item === "DRAFT"
                          ? 4
                          : 2}
                  </span>
                </button>
              ))}
            </div>
            <div className="view-tools">
              <span>{filtered.length.toString().padStart(2, "0")} RESULTS</span>
              <button className="active">
                <Icon name="menu" />
              </button>
              <button>
                <Icon name="grid" />
              </button>
            </div>
          </div>
          <div className="neo-dashed-card group relative block">
            <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
            <div className="relative border-2 border-black bg-white transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 table-shell shadow-[4px_4px_0_#000]">
              <div className="table-head">
              <span>DOCUMENT / TITLE</span>
              <span>LAST MODIFIED</span>
              <span>VIEWS</span>
              <span>STATUS</span>
              <span>VERSION</span>
              <span>ACTIONS</span>
            </div>
            <div className="table-body">
              {loading &&
                [0, 1, 2, 3].map((item) => (
                  <div className="table-row skeleton-row" key={item}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                ))}
              {!loading &&
                filtered.map((cv, i) => (
                  <div className="table-row" key={cv.title}>
                    <div className="document-cell">
                      <span className={`doc-icon doc-${i % 3}`}>
                        <Icon name="file" />
                      </span>
                      <span>
                        <b>{cv.title}</b>
                        <small>{cv.type} • PDF</small>
                      </span>
                    </div>
                    <span className="mono-cell">{cv.modified}</span>
                    <span className="view-cell">
                      ↗ <b>{cv.views}</b>
                    </span>
                    <span>
                      <i className={`status ${cv.status.toLowerCase()}`}>
                        {cv.status}
                      </i>
                    </span>
                    <span className="version">{cv.version}</span>
                    <div className="row-actions">
                      <button
                        title="Xem chi tiết"
                        onClick={() => onNavigate("detail")}
                      >
                        <Icon name="edit" />
                      </button>
                      <button
                        title="Chia sẻ"
                        onClick={() => onNavigate("shares")}
                      >
                        <Icon name="link" />
                      </button>
                      <button
                        title="More actions"
                        className={menu === cv.title ? "active" : ""}
                        onClick={() =>
                          setMenu(menu === cv.title ? null : cv.title)
                        }
                      >
                        <Icon name="menu" />
                      </button>
                      {menu === cv.title && (
                        <div className="action-menu">
                          <button onClick={() => onNavigate("detail")}>
                            <Icon name="edit" /> EDIT DOCUMENT
                          </button>
                          <button onClick={() => onNavigate("shares")}>
                            <Icon name="link" /> SHARE LINK
                          </button>
                          <button>
                            <Icon name="history" /> VERSION HISTORY
                          </button>
                          <button
                            className="danger"
                            onClick={() => setDeleteTarget(cv.title)}
                          >
                            <Icon name="trash" /> MOVE TO TRASH
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              {!loading && !filtered.length && (
                <div className="empty-state">
                  NO DOCUMENTS MATCH THIS QUERY.
                </div>
              )}
            </div>
            <div className="table-footer">
              <span>
                SHOWING 1—{filtered.length} OF {filtered.length}
              </span>
              <div>
                <button disabled>← PREV</button>
                <button className="active">01</button>
                <button>02</button>
                <button>03</button>
                <button>NEXT →</button>
              </div>
            </div>
          </div>
          </div>
          <div className="table-note">
            <Icon name="shield" size={16} /> ALL DOCUMENTS ARE ENCRYPTED AT REST
            AND IN TRANSIT <span>•</span> LAST SYNC: 12 SEC AGO
          </div>
        </div>
      </main>
      {deleteTarget && (
        <div
          className="dialog-backdrop"
          onMouseDown={() => setDeleteTarget(null)}
        >
          <div
            className="dialog danger-dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Kicker>DESTRUCTIVE ACTION</Kicker>
            <h3>Xóa CV này?</h3>
            <p>
              “{deleteTarget}” sẽ được chuyển vào thùng rác. Các liên kết chia
              sẻ liên quan sẽ ngừng hoạt động ngay lập tức.
            </p>
            <div className="dialog-actions">
              <Button variant="light" onClick={() => setDeleteTarget(null)}>
                HỦY
              </Button>
              <Button
                variant="danger"
                icon="trash"
                onClick={() => {
                  setDeleteTarget(null)
                  setMenu(null)
                }}
              >
                XÁC NHẬN XÓA
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function ProfileScreen(props: ScreenProps) {
  const { onNavigate, drawerOpen, onMenu, onClose, user, onLogout } = props
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const save = () => {
    setEditing(false)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }
  return (
    <section
      className="artboard app-screen profile-screen"
      aria-label="User profile screen"
    >
      <Sidebar
        active="profile"
        onNavigate={onNavigate}
        open={drawerOpen}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Topbar section="Hồ sơ / Danh tính" onMenu={onMenu} />
        <div className="page profile-page">
          <div className="page-heading">
            <div>
              <Kicker>IDENTITY MODULE</Kicker>
              <h2>
                Operator profile<span>.</span>
              </h2>
              <p>Manage your public identity and security clearance.</p>
            </div>
            {editing ? (
              <Button icon="check" onClick={save}>
                SAVE CHANGES
              </Button>
            ) : (
              <Button
                variant="light"
                icon="edit"
                onClick={() => setEditing(true)}
              >
                EDIT PROFILE
              </Button>
            )}
          </div>
          <div className="profile-grid">
            <div className="id-column">
              <div className="id-offset" />
              <div className="id-card">
                <div className="id-top">
                  <span>CLOUDCVHUB / ID</span>
                  <b>PRO</b>
                </div>
                <div className="avatar-large">
                  <div className="avatar-face">
                    <span className="hair" />
                    <span className="head" />
                    <span className="body" />
                  </div>
                  <i />
                </div>
                <h3>
                  MINH
                  <br />
                  <span>ANH</span>
                </h3>
                <p>SENIOR PRODUCT DESIGNER • HÀ NỘI</p>
                <div className="id-code">
                  <span>
                    <b>ID:</b> CCH-8842-MA
                  </span>
                  <span>
                    <b>LOC:</b> HAN / UTC+7
                  </span>
                </div>
                <div className="barcode">IIII II IIII I II III IIII II</div>
                <div className="id-verified">
                  <Icon name="shield" /> IDENTITY VERIFIED <span>2025</span>
                </div>
              </div>
              <div className="id-caption">
                <span>01</span>
                <p>
                  DIGITAL OPERATOR BADGE
                  <br />
                  <small>ISSUED 02.14.2024</small>
                </p>
              </div>
            </div>
            <div className="profile-content">
              {/* 1. Core Specifications Panel with Dashed Frame */}
              <div className="neo-dashed-card group relative block">
                <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
                <div className="relative border-2 border-black bg-[#fffdf8] transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 spec-panel shadow-[4px_4px_0_#000]">
                  <div className="panel-heading">
                    <span>
                      <Kicker>CORE SPECIFICATIONS</Kicker>
                      <h3>Identity data</h3>
                    </span>
                    <b>02 / PROFILE</b>
                  </div>
                  <div className="spec-grid">
                    <label>
                      <span>DISPLAY NAME</span>
                      <input defaultValue="Nguyễn Minh Anh" readOnly={!editing} />
                    </label>
                    <label>
                      <span>ROLE / TITLE</span>
                      <input
                        defaultValue="Senior Product Designer"
                        readOnly={!editing}
                      />
                    </label>
                    <label>
                      <span>PRIMARY EMAIL</span>
                      <input
                        defaultValue="minhanh@cloudcvhub.vn"
                        readOnly={!editing}
                      />
                    </label>
                    <label>
                      <span>BASE LOCATION</span>
                      <input
                        defaultValue="Hà Nội, Việt Nam"
                        readOnly={!editing}
                      />
                    </label>
                    <label className="wide">
                      <span>PUBLIC PROFILE URL</span>
                      <div>
                        <code>cloudcvhub.dev/u/</code>
                        <input
                          defaultValue="nguyen-minh-anh"
                          readOnly={!editing}
                        />
                        <button type="button" aria-label="Sao chép liên kết hồ sơ">
                          <Icon name="link" />
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* 2. Security Capabilities Panel with Dashed Frame */}
              <div className="neo-dashed-card group relative block">
                <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
                <div className="relative border-2 border-black bg-[#fffdf8] transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 security-panel shadow-[4px_4px_0_#000]">
                  <div className="panel-heading">
                    <span>
                      <Kicker>SECURITY CAPABILITIES</Kicker>
                      <h3>Access & protection</h3>
                    </span>
                    <div className="clearance">
                      <i /> CLEARANCE: MAX
                    </div>
                  </div>
                  <div className="capability-list">
                    <div>
                      <span className="cap-icon">
                        <Icon name="lock" />
                      </span>
                      <span>
                        <b>TWO-FACTOR AUTHENTICATION</b>
                        <small>Authenticator app enabled</small>
                      </span>
                      <i className="status live">ACTIVE</i>
                      <button type="button">
                        MANAGE <Icon name="arrow" size={14} />
                      </button>
                    </div>
                    <div>
                      <span className="cap-icon yellow">
                        <Icon name="shield" />
                      </span>
                      <span>
                        <b>END-TO-END ENCRYPTION</b>
                        <small>AES-256 / All vault documents</small>
                      </span>
                      <i className="status live">ENFORCED</i>
                      <button type="button">
                        DETAILS <Icon name="arrow" size={14} />
                      </button>
                    </div>
                    <div>
                      <span className="cap-icon">
                        <Icon name="history" />
                      </span>
                      <span>
                        <b>SESSION CONTROL</b>
                        <small>3 authorized devices</small>
                      </span>
                      <i className="status draft">3 DEVICES</i>
                      <button type="button">
                        REVIEW <Icon name="arrow" size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="security-foot">
                    <span>
                      <Icon name="check" /> LAST SECURITY AUDIT: 12 MAY 2025
                    </span>
                    <b>NO ANOMALIES DETECTED</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {saved && (
        <div className="toast">
          <Icon name="check" /> PROFILE SPECIFICATIONS UPDATED
        </div>
      )}
    </section>
  )
}

const pageNames: Record<PageId, string> = {
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

function AppShell({
  page,
  children,
  onNavigate,
  drawerOpen,
  onMenu,
  onClose,
  onSearch,
  user,
  onLogout,
}: ScreenProps & {
  page: PageId
  children: ReactNode
  onSearch?: (value: string) => void
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

function UploadScreen(props: ScreenProps) {
  const [uploaded, setUploaded] = useState(false)
  return (
    <AppShell {...props} page="upload">
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>DOCUMENT INTAKE</Kicker>
            <h2>
              Tải CV lên<span>.</span>
            </h2>
            <p>Đưa tài liệu vào kho bảo mật và quản lý phiên bản tự động.</p>
          </div>
        </div>
        <button className="drop-zone" onClick={() => setUploaded(true)}>
          <span className="drop-icon">
            <Icon name="upload" size={34} />
          </span>
          <b>KÉO & THẢ CV VÀO ĐÂY</b>
          <p>hoặc nhấn để chọn tệp từ thiết bị</p>
          <small>PDF, DOCX • TỐI ĐA 10MB • MÃ HÓA AES-256</small>
        </button>
        <div className="upload-grid">
          <div className="content-card">
            <Kicker>THÔNG TIN TỆP</Kicker>
            <Field
              label="TÊN HIỂN THỊ"
              defaultValue="CV Product Designer 2025"
            />
            <Field
              label="VỊ TRÍ ỨNG TUYỂN"
              defaultValue="Senior Product Designer"
            />
            <Button icon="upload" onClick={() => setUploaded(true)}>
              TẢI LÊN AN TOÀN
            </Button>
          </div>
          <div className="content-card upload-rules">
            <Kicker>KIỂM TRA TỰ ĐỘNG</Kicker>
            {[
              "Quét mã độc",
              "Nhận diện dữ liệu cá nhân",
              "Tạo ảnh xem trước",
              "Khởi tạo phiên bản v1.0",
            ].map((item) => (
              <div key={item}>
                <Icon name="check" size={17} />
                <span>{item}</span>
                <b>SẴN SÀNG</b>
              </div>
            ))}
          </div>
        </div>
      </div>
      {uploaded && (
        <div className="toast">
          <Icon name="check" /> CV ĐÃ ĐƯỢC TẢI LÊN VÀ MÃ HÓA
        </div>
      )}
    </AppShell>
  )
}

function DetailScreen(props: ScreenProps) {
  return (
    <AppShell {...props} page="detail">
      <div className="page content-page">
        <button className="back-link" onClick={() => props.onNavigate("cvs")}>
          ← QUAY LẠI DANH SÁCH CV
        </button>
        <div className="detail-heading">
          <div>
            <Kicker>DOCUMENT / CCH-2025-0842</Kicker>
            <h2>
              Product Designer cấp cao<span>.</span>
            </h2>
            <p>Cập nhật 2 giờ trước bởi Nguyễn Minh Anh</p>
          </div>
          <div className="heading-actions">
            <Button
              variant="light"
              icon="link"
              onClick={() => props.onNavigate("shares")}
            >
              CHIA SẺ
            </Button>
            <Button icon="edit">CHỈNH SỬA</Button>
          </div>
        </div>
        <div className="detail-grid">
          <div className="document-preview">
            <div className="preview-paper">
              <div className="preview-name">NGUYỄN MINH ANH</div>
              <div className="preview-role">SENIOR PRODUCT DESIGNER</div>
              <div className="preview-line wide" />
              <div className="preview-columns">
                <div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i key={i} />
                  ))}
                </div>
                <div>
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <i key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="version-panel content-card">
            <div className="section-title">
              <h3>Lịch sử phiên bản</h3>
              <span>05 PHIÊN BẢN</span>
            </div>
            {[
              ["v8.2", "Hiện tại", "Hôm nay, 09:42", "Cập nhật dự án Fintech"],
              ["v8.1", "Ổn định", "10/05/2025", "Tinh chỉnh phần kỹ năng"],
              ["v8.0", "Mốc chính", "02/05/2025", "Thiết kế lại bố cục"],
              ["v7.3", "Lưu trữ", "18/04/2025", "Bổ sung kinh nghiệm Acme"],
            ].map(([version, status, date, note], index) => (
              <div className="version-row" key={version}>
                <span className={index === 0 ? "version active" : "version"}>
                  {version}
                </span>
                <span>
                  <b>{status}</b>
                  <small>{note}</small>
                </span>
                <time>{date}</time>
                <button>KHÔI PHỤC</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function SharesScreen(props: ScreenProps) {
  const [dialog, setDialog] = useState(false)
  const [toast, setToast] = useState(false)
  const links = [
    ["Product Designer cấp cao", "cvhub.vn/s/ma-2025", "Không hết hạn", "184"],
    ["Design System Lead", "cvhub.vn/s/design-lead", "Còn 12 ngày", "92"],
    ["UX Research Portfolio", "cvhub.vn/s/research-05", "Còn 3 ngày", "56"],
  ]
  return (
    <AppShell {...props} page="shares">
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>SECURE DISTRIBUTION</Kicker>
            <h2>
              Liên kết chia sẻ<span>.</span>
            </h2>
            <p>Kiểm soát quyền truy cập và thời hạn của từng CV.</p>
          </div>
          <Button icon="plus" onClick={() => setDialog(true)}>
            TẠO LIÊN KẾT
          </Button>
        </div>
        <div className="share-stats">
          <div>
            <small>ĐANG HOẠT ĐỘNG</small>
            <b>06</b>
          </div>
          <div>
            <small>LƯỢT XEM THÁNG NÀY</small>
            <b>348</b>
          </div>
          <div>
            <small>ĐƯỢC BẢO VỆ MẬT KHẨU</small>
            <b>03</b>
          </div>
        </div>
        <div className="content-card list-card">
          <div className="list-head">
            <span>CV / LIÊN KẾT</span>
            <span>HẾT HẠN</span>
            <span>LƯỢT XEM</span>
            <span>THAO TÁC</span>
          </div>
          {links.map((link) => (
            <div className="share-row" key={link[0]}>
              <span>
                <b>{link[0]}</b>
                <code>{link[1]}</code>
              </span>
              <span className="status live">{link[2]}</span>
              <b>{link[3]}</b>
              <span className="row-actions">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(link[1])
                    setToast(true)
                  }}
                >
                  <Icon name="link" />
                </button>
                <button>
                  <Icon name="trash" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
      {dialog && (
        <div className="dialog-backdrop" onMouseDown={() => setDialog(false)}>
          <div
            className="dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Kicker>NEW SECURE LINK</Kicker>
            <h3>Tạo liên kết chia sẻ</h3>
            <Field label="CV" defaultValue="Product Designer cấp cao" />
            <Field label="NGÀY HẾT HẠN" type="date" />
            <Field
              label="MẬT KHẨU (KHÔNG BẮT BUỘC)"
              type="password"
              placeholder="Tối thiểu 8 ký tự"
            />
            <div className="dialog-actions">
              <Button variant="light" onClick={() => setDialog(false)}>
                HỦY
              </Button>
              <Button
                icon="link"
                onClick={() => {
                  setDialog(false)
                  setToast(true)
                }}
              >
                TẠO LIÊN KẾT
              </Button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Icon name="check" /> LIÊN KẾT ĐÃ SẴN SÀNG
        </div>
      )}
    </AppShell>
  )
}

function SettingsScreen(props: ScreenProps) {
  const [saved, setSaved] = useState(false)
  return (
    <AppShell {...props} page="settings">
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>SYSTEM PREFERENCES</Kicker>
            <h2>
              Cài đặt<span>.</span>
            </h2>
            <p>Tùy chỉnh bảo mật, thông báo và trải nghiệm tài khoản.</p>
          </div>
          <Button icon="check" onClick={() => setSaved(true)}>
            LƯU THAY ĐỔI
          </Button>
        </div>
        <div className="settings-grid">
          <div className="content-card">
            <div className="section-title">
              <h3>Thông báo</h3>
              <span>CHANNELS</span>
            </div>
            {[
              "Có người xem CV",
              "Liên kết sắp hết hạn",
              "Đăng nhập từ thiết bị mới",
              "Báo cáo hoạt động hàng tuần",
            ].map((item, index) => (
              <label className="toggle-row" key={item}>
                <span>
                  <b>{item}</b>
                  <small>Gửi qua email và trung tâm thông báo</small>
                </span>
                <input type="checkbox" defaultChecked={index !== 3} />
              </label>
            ))}
          </div>
          <div className="content-card">
            <div className="section-title">
              <h3>Bảo mật</h3>
              <span>MAX CLEARANCE</span>
            </div>
            <div className="setting-action">
              <span>
                <Icon name="lock" />
                <b>Xác thực hai bước</b>
              </span>
              <i className="status live">ĐANG BẬT</i>
            </div>
            <div className="setting-action">
              <span>
                <Icon name="history" />
                <b>Phiên đăng nhập</b>
              </span>
              <button>QUẢN LÝ 3 THIẾT BỊ</button>
            </div>
            <div className="setting-action danger-zone">
              <span>
                <Icon name="trash" />
                <b>Xóa tài khoản</b>
              </span>
              <button>YÊU CẦU XÓA</button>
            </div>
          </div>
        </div>
      </div>
      {saved && (
        <div className="toast">
          <Icon name="check" /> CÀI ĐẶT ĐÃ ĐƯỢC LƯU
        </div>
      )}
    </AppShell>
  )
}

function AdminScreen({
  mode,
  ...props
}: ScreenProps & { mode: "users" | "cvs" }) {
  const users = [
    ["Nguyễn Minh Anh", "minhanh@cloudcvhub.vn", "PRO", "12 CV", "HOẠT ĐỘNG"],
    ["Trần Thùy Dương", "duong.tran@pixel.vn", "TEAM", "08 CV", "HOẠT ĐỘNG"],
    ["Lê Hoàng Nam", "nam.le@freelance.vn", "FREE", "03 CV", "TẠM KHÓA"],
    ["Phạm Gia Hân", "han.pham@studio.vn", "PRO", "17 CV", "HOẠT ĐỘNG"],
  ]
  const docs = [
    [
      "CV Product Designer 2025",
      "Nguyễn Minh Anh",
      "2.8 MB",
      "184 lượt xem",
      "AN TOÀN",
    ],
    [
      "Design Lead Portfolio",
      "Trần Thùy Dương",
      "4.1 MB",
      "92 lượt xem",
      "AN TOÀN",
    ],
    [
      "CV Marketing Manager",
      "Lê Hoàng Nam",
      "1.9 MB",
      "31 lượt xem",
      "CẦN DUYỆT",
    ],
    [
      "Product Owner — Fintech",
      "Phạm Gia Hân",
      "3.4 MB",
      "126 lượt xem",
      "AN TOÀN",
    ],
  ]
  const rows = mode === "users" ? users : docs
  const page = mode === "users" ? "admin-users" : "admin-cvs"
  return (
    <AppShell {...props} page={page}>
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>ADMIN CLEARANCE / LEVEL 04</Kicker>
            <h2>
              {mode === "users" ? "Quản lý người dùng" : "Quản lý CV"}
              <span>.</span>
            </h2>
            <p>
              {mode === "users"
                ? "Quản trị tài khoản, gói dịch vụ và trạng thái truy cập."
                : "Giám sát tài liệu, dung lượng và các cảnh báo bảo mật."}
            </p>
          </div>
          <Button icon={mode === "users" ? "plus" : "shield"}>
            {mode === "users" ? "THÊM NGƯỜI DÙNG" : "QUÉT TOÀN HỆ THỐNG"}
          </Button>
        </div>
        <div className="admin-banner">
          <Icon name="shield" />
          <span>
            <b>CHẾ ĐỘ QUẢN TRỊ ĐANG BẬT</b>
            <small>Mọi thao tác được ghi vào nhật ký kiểm toán.</small>
          </span>
          <code>ADMIN_8842</code>
        </div>
        <div className="neo-dashed-card group relative block">
          <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
          <div className="relative border-2 border-black bg-white transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 content-card admin-table shadow-[4px_4px_0_#000]">
            <div className="admin-head">
              <span>{mode === "users" ? "NGƯỜI DÙNG" : "TÀI LIỆU"}</span>
              <span>{mode === "users" ? "EMAIL" : "CHỦ SỞ HỮU"}</span>
              <span>{mode === "users" ? "GÓI" : "DUNG LƯỢNG"}</span>
              <span>{mode === "users" ? "TÀI NGUYÊN" : "TRUY CẬP"}</span>
              <span>TRẠNG THÁI</span>
            </div>
            {rows.map((row) => (
              <div className="admin-row" key={row[0]}>
                {row.map((cell, index) => (
                  <span
                    key={cell}
                    className={
                      index === 4
                        ? `status ${
                            cell === "HOẠT ĐỘNG" || cell === "AN TOÀN"
                              ? "live"
                              : "draft"
                          }`
                        : ""
                    }
                  >
                    {index === 0 ? <b>{cell}</b> : cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default function App({ onLogout: parentLogout }: { onLogout?: () => void } = {}) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))
  const [user, setUser] = useState<any>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null")
    } catch {
      return null
    }
  })
  const [page, setPage] = useState<PageId>("overview")
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    parentLogout?.()
  }

  const handleLoginSuccess = (newToken: string, newUser: any) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
    setPage("overview")
  }

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  const props: ScreenProps = {
    onNavigate: setPage,
    drawerOpen,
    onMenu: () => setDrawerOpen(true),
    onClose: () => setDrawerOpen(false),
    user,
    onLogout: handleLogout,
  }
  let screen: ReactNode
  if (page === "overview") screen = <DashboardScreen {...props} />
  else if (page === "cvs") screen = <CVTableScreen {...props} />
  else if (page === "upload") screen = <UploadScreen {...props} />
  else if (page === "detail") screen = <DetailScreen {...props} />
  else if (page === "shares") screen = <SharesScreen {...props} />
  else if (page === "profile") screen = <ProfileScreen {...props} />
  else if (page === "settings") screen = <SettingsScreen {...props} />
  else if (page === "admin-users")
    screen = <AdminScreen {...props} mode="users" />
  else screen = <AdminScreen {...props} mode="cvs" />
  return (
    <div className="product-app">
      {screen}
      {drawerOpen && (
        <button
          className="drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-label="Đóng menu"
        />
      )}
    </div>
  )
}
