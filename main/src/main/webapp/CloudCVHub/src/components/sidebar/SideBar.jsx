import { LayoutDashboard, Folder, Upload, User, LogOut, X } from 'lucide-react';

function SideBar({ activePage, setPage, onLogout, mobileMenuOpen, setMobileMenuOpen, desktopSidebarOpen }) {
    const menuItems = [
        { label: "Trang chủ", icon: LayoutDashboard, page: "dashboard" },
        { label: "Quản lý CV", icon: Folder, page: "cv-list" },
        { label: "Tạo CV mới", icon: Upload, page: "upload" },
        { label: "Hồ sơ cá nhân", icon: User, page: "profile" }
    ];

    return (
        <>
            {/* Desktop SideBar */}
            <aside className={`hidden lg:flex flex-col justify-between shrink-0 py-6 z-20 relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 border-r border-indigo-500/10 ${desktopSidebarOpen ? "w-64 px-6" : "w-20 px-3"}`}>
                {/* Decorative background blobs (Hiệu ứng bóng bóng phát sáng) */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className={`flex items-center mb-8 px-2 transition-all duration-300 ${desktopSidebarOpen ? "gap-2.5 justify-start" : "justify-center"}`}>
                        <span className="text-blue-600 text-3xl font-bold shrink-0 select-none">📝</span>
                        {desktopSidebarOpen && <span className="text-xl font-bold text-white tracking-tight">CloudCVHub</span>}
                    </div>

                    <nav className="space-y-1.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activePage === item.page;
                            return (
                                <button
                                    key={item.page}
                                    onClick={() => setPage(item.page)}
                                    title={desktopSidebarOpen ? undefined : item.label}
                                    className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                                        ? "bg-white text-blue-600 shadow-md shadow-blue-900/20"
                                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                                        } ${desktopSidebarOpen ? "gap-3 px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
                                >
                                    <Icon size={20} className="shrink-0" />
                                    {desktopSidebarOpen && <span className="truncate">{item.label}</span>}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <button
                    onClick={onLogout}
                    title={desktopSidebarOpen ? undefined : "Đăng xuất"}
                    className={`w-full flex items-center rounded-xl text-sm font-semibold text-red-200 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer mt-auto relative z-10 ${desktopSidebarOpen ? "gap-3 px-4 py-3 justify-start" : "px-3 py-3 justify-center"}`}
                >
                    <LogOut size={20} className="shrink-0" />
                    {desktopSidebarOpen && <span className="truncate">Đăng xuất</span>}
                </button>
            </aside>

            {/* Mobile SideBar Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                    <aside className="relative w-64 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex flex-col justify-between p-6 h-full animate-slide-in overflow-hidden">
                        {/* Decorative background blobs for mobile */}
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute bottom-10 right-10 w-56 h-56 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600 text-2xl">📝</span>
                                    <span className="text-lg font-bold text-white">CloudCVHub</span>
                                </div>
                                <button onClick={() => setMobileMenuOpen(false)} className="text-blue-100 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-all">
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="space-y-1.5">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activePage === item.page;
                                    return (
                                        <button
                                            key={item.page}
                                            onClick={() => {
                                                setPage(item.page);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                                                ? "bg-white text-blue-600 shadow-md shadow-blue-900/20"
                                                : "text-blue-100 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-200 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer relative z-10"
                        >
                            <LogOut size={18} />
                            Đăng xuất
                        </button>
                    </aside>
                </div>
            )}
        </>
    );
}

export default SideBar;
