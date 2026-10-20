import Icon from '../components/UI/Icon'

const navItems = [
  { id: "overview", label: "Tổng quan", icon: "grid" },
  { id: "cvs", label: "CV của tôi", icon: "file" },
  { id: "upload", label: "Tải CV lên", icon: "upload" },
  { id: "shares", label: "Liên kết chia sẻ", icon: "link" },
  { id: "profile", label: "Hồ sơ cá nhân", icon: "user" },
  { id: "settings", label: "Cài đặt", icon: "settings" },
]

const adminNavItems = [
  { id: "admin-users", label: "Quản lý người dùng", icon: "user" },
  { id: "admin-cvs", label: "Quản lý CV", icon: "shield" },
]

export default function Sidebar({
  active = "overview",
  onNavigate,
  open,
  onClose,
  user,
  onLogout,
}) {
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .filter(Boolean)
        .map(w => w[0])
        .slice(-2)
        .join("")
        .toUpperCase()
    : "AK"

  const renderItem = (
    item, index,
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
