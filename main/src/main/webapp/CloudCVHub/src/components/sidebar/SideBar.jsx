import { LogOut, X } from 'lucide-react';
import { 
  Icons8Dashboard, 
  Icons8Resume, 
  Icons8Plus, 
  Icons8User, 
  Icons8ShieldSecure, 
  Icons8Layers, 
  Icons8Lock, 
  Icons8Database 
} from '../icons/Icons8.jsx';

function BrandLogo({ collapsed = false }) {
  return (
    <div className={`flex items-center transition-all duration-200 ${collapsed ? "justify-center" : "gap-3"}`}>
      <div className="w-10 h-10 rounded-xl bg-white text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000]">
        <Icons8Resume size={22} className="text-black" />
      </div>
      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-white text-base tracking-tight leading-none uppercase">CloudCVHub</span>
            <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-black text-white border border-white">Pro</span>
          </div>
          <span className="text-[11px] text-white/90 font-bold mt-1 truncate">Hệ thống bảo mật CV</span>
        </div>
      )}
    </div>
  );
}

function SideBar({ activePage, setPage, onLogout, mobileMenuOpen, setMobileMenuOpen, desktopSidebarOpen }) {
  const navigationSections = [
    {
      title: "Tổng quan",
      items: [
        { label: "Bảng điều khiển", icon: Icons8Dashboard, page: "dashboard" },
      ],
    },
    {
      title: "Quản lý CV",
      items: [
        { label: "Danh sách CV", icon: Icons8Resume, page: "cv-list" },
        { label: "Tạo CV mới", icon: Icons8Plus, page: "upload" },
      ],
    },
    {
      title: "Tài khoản",
      items: [
        { label: "Hồ sơ cá nhân", icon: Icons8User, page: "profile" },
      ],
    },
  ];

  const renderNavList = (isCollapsed = false, onNavigate = null) => (
    <div className="space-y-6 font-mono">
      {navigationSections.map((section, idx) => (
        <div key={idx} className="space-y-2">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-black text-white/90 uppercase tracking-wider select-none mb-2">
              {section.title}
            </p>
          )}
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => {
                  setPage(item.page);
                  if (onNavigate) onNavigate();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer group ${
                  isActive
                    ? "bg-[#FFF275] text-black font-black border-2 border-black shadow-[3px_3px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                    : "text-white border-2 border-transparent hover:border-black hover:bg-black/20 hover:text-white"
                } ${isCollapsed ? "justify-center p-2.5" : "gap-3 px-3.5 py-2.5"}`}
              >
                <Icon
                  size={19}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-black" : "text-white group-hover:text-white"
                  }`}
                />
                {!isCollapsed && <span className="truncate uppercase">{item.label}</span>}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 transition-all duration-200 bg-gradient-to-b from-[#FF416C] to-[#FF4B2B] border-r-2 border-black font-mono ${
          desktopSidebarOpen ? "w-64 p-5" : "w-20 p-3"
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="mb-8 px-1">
            <BrandLogo collapsed={!desktopSidebarOpen} />
          </div>

          <nav className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {renderNavList(!desktopSidebarOpen)}
          </nav>
        </div>

        {/* Bottom Area: Security Badges + Storage + Logout */}
        <div className="pt-3 mt-auto border-t-2 border-black/30 space-y-3">
          {/* Thông tin xác thực & bảo mật ban đầu */}
          {desktopSidebarOpen && (
            <div className="p-3 rounded-xl bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
              <div className="flex items-center gap-2">
                <Icons8ShieldSecure size={18} className="text-[#FF4B2B] shrink-0" />
                <span className="text-[11px] font-black leading-tight uppercase">Mã hóa AES-256 & SHA-256</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons8Layers size={18} className="text-[#FF4B2B] shrink-0" />
                <span className="text-[11px] font-black leading-tight uppercase">Lịch sử đa phiên bản</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons8Lock size={18} className="text-[#FF4B2B] shrink-0" />
                <span className="text-[11px] font-black leading-tight uppercase">Chia sẻ link bảo mật</span>
              </div>
            </div>
          )}

          {desktopSidebarOpen ? (
            <div className="p-2.5 rounded-xl bg-black/20 border-2 border-black text-white">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 font-bold text-white text-[11px] uppercase">
                  <Icons8Database size={15} className="text-white" />
                  Lưu trữ đám mây
                </span>
                <span className="text-[11px] text-white font-mono font-bold">10 MB</span>
              </div>
              <div className="w-full bg-black/50 border border-black h-2 rounded-full overflow-hidden">
                <div className="bg-[#FFF275] h-full rounded-full transition-all duration-300" style={{ width: "24%" }} />
              </div>
            </div>
          ) : null}

          <button
            onClick={onLogout}
            title={desktopSidebarOpen ? undefined : "Đăng xuất"}
            className={`w-full flex items-center rounded-xl text-xs font-bold text-white border-2 border-black bg-black/30 hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
              desktopSidebarOpen ? "gap-3 px-3 py-2.5 justify-start uppercase" : "p-2.5 justify-center"
            }`}
          >
            <LogOut size={16} strokeWidth={2.5} className="shrink-0" />
            {desktopSidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex font-mono">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-72 bg-gradient-to-b from-[#FF416C] to-[#FF4B2B] border-r-2 border-black flex flex-col justify-between p-5 h-full z-10 shadow-[6px_0px_0px_#000]">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black/30">
                <BrandLogo collapsed={false} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border-2 border-black bg-white text-black hover:bg-[#FFF275] cursor-pointer"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              <nav>{renderNavList(false, () => setMobileMenuOpen(false))}</nav>
            </div>

            <div className="pt-4 border-t-2 border-black/30 space-y-3">
              <div className="p-3 rounded-xl bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                <div className="flex items-center gap-2">
                  <Icons8ShieldSecure size={18} className="text-[#FF4B2B] shrink-0" />
                  <span className="text-[11px] font-black leading-tight uppercase">Mã hóa AES-256 & SHA-256</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons8Layers size={18} className="text-[#FF4B2B] shrink-0" />
                  <span className="text-[11px] font-black leading-tight uppercase">Quản lý đa phiên bản CV</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons8Lock size={18} className="text-[#FF4B2B] shrink-0" />
                  <span className="text-[11px] font-black leading-tight uppercase">Chia sẻ có kiểm soát</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-white border-2 border-black bg-black/30 hover:bg-black transition-all cursor-pointer uppercase shadow-[2px_2px_0px_#000]"
              >
                <LogOut size={16} strokeWidth={2.5} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default SideBar;
