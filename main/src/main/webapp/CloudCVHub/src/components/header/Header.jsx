import { Menu, Bell } from 'lucide-react';
import { Icons8Plus } from '../icons/Icons8.jsx';

function Header({ title, subtitle, displayName, onMenuClick, activePage, onProfileClick, onNewCVClick }) {
    function getInitials(fullName) {
        if (!fullName) return "U";
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    const initials = getInitials(displayName || "User");

    // Breadcrumb title map
    const breadcrumbMap = {
        dashboard: "BẢNG ĐIỀU KHIỂN",
        "cv-list": "QUẢN LÝ HỒ SƠ CV",
        upload: "TẠO CV MỚI",
        "edit-cv": "CHỈNH SỬA HỒ SƠ",
        profile: "HỒ SƠ CÁ NHÂN",
    };

    const currentSection = breadcrumbMap[activePage] || title?.toUpperCase() || "CLOUDCVHUB";

    return (
        <header className="bg-white border-b-2 border-black px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 sticky top-0 z-20 font-mono shadow-[0_2px_0px_#000]">
            {/* Left: Menu trigger & Page context */}
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={onMenuClick}
                    className="p-1.5 rounded-lg border-2 border-black bg-white hover:bg-[#FFF275] hover:shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black cursor-pointer"
                    aria-label="Thu gọn hoặc mở menu"
                >
                    <Menu size={18} strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-black min-w-0">
                    <span className="hidden sm:inline px-2 py-0.5 bg-black text-white text-[11px] rounded tracking-wide">
                        CLOUDCVHUB
                    </span>
                    <span className="hidden sm:inline text-black font-extrabold">/</span>
                    <h1 className="text-xs sm:text-sm font-extrabold text-black tracking-tight truncate uppercase">
                        {currentSection}
                    </h1>
                </div>
            </div>

            {/* Right: Quick actions, notifications, user profile */}
            <div className="flex items-center gap-2 sm:gap-3">
                {activePage !== 'upload' && onNewCVClick && (
                    <button
                        onClick={onNewCVClick}
                        className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white border-2 border-black rounded-lg text-xs font-bold shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer uppercase"
                    >
                        <Icons8Plus size={15} />
                        <span>Tạo CV mới</span>
                    </button>
                )}

                <button
                    className="p-2 rounded-lg border-2 border-black bg-white hover:bg-[#FFF275] hover:shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black cursor-pointer relative"
                    aria-label="Thông báo"
                >
                    <Bell size={17} strokeWidth={2.5} />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF4B2B] border border-black rounded-full" />
                </button>

                {/* Profile Button */}
                <button
                    onClick={onProfileClick}
                    className="flex items-center gap-2 pl-2 py-1 pr-2.5 rounded-lg border-2 border-black bg-white hover:bg-[#FFF275] hover:shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer group"
                >
                    <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0 border border-black">
                        {initials}
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                        <span className="text-xs font-bold text-black leading-tight truncate max-w-[120px]">
                            {displayName || "Người dùng"}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase leading-none">Hội viên</span>
                    </div>
                </button>
            </div>
        </header>
    );
}

export default Header;

