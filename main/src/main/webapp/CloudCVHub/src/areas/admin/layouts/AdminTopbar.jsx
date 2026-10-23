import Icon from '../../../components/UI/Icon'
import ComicBrutalMenuButton from '../../../components/UI/ComicBrutalMenuButton'

export default function AdminTopbar({ section, onSearch, onMenu, sidebarOpen = true }) {
  return (
    <header className="topbar border-b-2 border-black bg-white">
      <div className="topbar-left flex items-center gap-3">
        <ComicBrutalMenuButton
          isOpen={sidebarOpen}
          onClick={onMenu}
        />

        <div className="breadcrumb flex items-center gap-2 font-mono text-xs font-bold">
          <span className="px-2 py-0.5 bg-black text-[#fbca1f] border border-black shadow-[1px_1px_0_#000]">
            ADMIN_AREA
          </span>
          <span className="text-neutral-400">/</span>
          <span className="text-black uppercase">{section || "DASHBOARD"}</span>
        </div>
      </div>

      <div className="topbar-right flex items-center gap-3">
        {/* Live cluster status badge */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#e8fdf0] border-2 border-black shadow-[2px_2px_0_#000] text-xs font-mono font-bold text-[#008744]">
          <span className="w-2 h-2 rounded-full bg-[#00cc66] animate-pulse" />
          <span>SERVER: ONLINE</span>
        </div>

        <div className="search-wrap relative">
          <input
            type="search"
            placeholder="Tra cứu UID / CV / Audit Log..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="font-mono text-xs pl-8 pr-3 py-1.5 border-2 border-black shadow-[2px_2px_0_#000] focus:outline-none focus:bg-[#fef08a]"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
            <Icon name="search" size={14} />
          </span>
        </div>
      </div>
    </header>
  )
}
