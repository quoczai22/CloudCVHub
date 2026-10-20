import Icon from '../components/UI/Icon'

export default function Topbar({
  section,
  onSearch,
  onMenu,
}) {
  return (
    <header className="topbar">
      <div>
        <button className="mobile-menu" onClick={onMenu} aria-label="Mở menu">
          <Icon name="menu" />
        </button>
        <span>KHÔNG GIAN /</span>
        <b>{section?.toUpperCase() || "TỔNG QUAN"}</b>
      </div>
      <div className="top-actions">
        <label className="search">
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="TÌM KIẾM HỒ SƠ..."
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>
        <button className="square-btn" aria-label="Thông báo">
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
