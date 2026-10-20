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
