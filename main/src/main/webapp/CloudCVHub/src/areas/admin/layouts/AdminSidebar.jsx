import { adminNavItems } from '../adminConfig'
import Icon from '../../../components/UI/Icon'

export default function AdminSidebar({
  active = "admin-dashboard",
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
        .map((w) => w[0])
        .slice(-2)
        .join("")
        .toUpperCase()
    : "AD"

  return (
    <aside className={`sidebar admin-sidebar ${open ? "open" : ""}`}>
      {/* Brand & Area Label */}
      <div className="logo border-b-2 border-black pb-3">
        <div className="logo-mark" style={{ background: "#ff416c" }}>
          <Icon name="shield" size={24} />
        </div>
        <div>
          <span className="block font-black text-sm tracking-wider">
            CloudCV<span style={{ color: "#ff416c" }}>Hub</span>
          </span>
          <span className="inline-block px-1.5 py-0.5 text-[10px] bg-black text-[#fbca1f] font-mono font-bold tracking-widest mt-1 border border-black shadow-[1px_1px_0_#fff]">
            AREA: ADMIN ROOT
          </span>
        </div>
      </div>

      {open && (
        <button className="drawer-close" onClick={onClose} aria-label="Đóng menu">
          ×
        </button>
      )}

      {/* Admin Clearance Banner */}
      <div className="my-3 p-2 bg-[#fbca1f] border-2 border-black shadow-[2px_2px_0_#000] text-[11px] font-mono text-black">
        <div className="flex items-center gap-1.5 font-bold mb-0.5">
          <span className="w-2 h-2 rounded-full bg-[#ff416c] animate-pulse" />
          CLEARANCE LEVEL 04
        </div>
        <div className="text-[10px] text-neutral-800">Cơ chế quản trị bảo mật cao</div>
      </div>

      {/* Navigation Label */}
      <div className="nav-label admin-label" style={{ color: "#ff416c" }}>
        DANH MỤC QUẢN TRỊ
      </div>
      <nav>
        {adminNavItems.map((item, index) => (
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
        ))}
      </nav>

      {/* Return to Client Area CTA */}
      <div className="mt-4 pt-3 border-t-2 border-dashed border-black">
        <button
          type="button"
          onClick={() => {
            onNavigate?.("overview")
            onClose?.()
          }}
          className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-mono font-bold uppercase bg-white border-2 border-black shadow-[3px_3px_0_#000] hover:bg-[#fef08a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-black"
        >
          <Icon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} />
          <span>Về Khu vực User</span>
        </button>
      </div>

      {/* System Integrity Fingerprint */}
      <div className="integrity mt-auto">
        <div>
          <Icon name="shield" size={20} />
          <span>
            <b>CLUSTER SECURE</b>
            <small>NODE: AP-HN-01</small>
          </span>
        </div>
        <code>SHA-256: 8842-ROOT-AUTH</code>
      </div>

      {/* Admin User Card & Logout */}
      <button
        className="sidebar-user"
        onClick={onLogout}
        title="Bấm để đăng xuất"
      >
        <span className="avatar avatar-small" style={{ background: "#ff416c", color: "#fff" }}>
          {initials}
        </span>
        <span>
          <b>{user?.fullName || "Root Admin"}</b>
          <small>Quyền: {user?.role || "ADMIN"}</small>
        </span>
        <Icon name="logout" />
      </button>
    </aside>
  )
}
