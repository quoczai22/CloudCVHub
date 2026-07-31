import { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';

function Header({ title, subtitle, displayName, onMenuClick, activePage, onProfileClick }) {

    const [greeting, setGreeting] = useState("");

    function getLastName(fullName) {
        if (!fullName) return "U";

        const nameParts = fullName.trim().split(/ +/);
        const lastName = nameParts.pop();

        return lastName.charAt(0).toUpperCase();
    }

    const avatarText = getLastName(displayName || "Người dùng");

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            let greetingText = "";

            if (hour < 12) {
                greetingText = "Buổi sáng";
            } else if (hour < 18) {
                greetingText = "Buổi chiều";
            } else {
                greetingText = "Buổi tối";
            }
            setGreeting(greetingText);
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000); // Cập nhật mỗi phút

        return () => clearInterval(interval);
    }, []);

    const displaySubtitle = activePage === "dashboard"
        ? `Chào ${greeting}, ${displayName} 👋`
        : (subtitle || "Hệ thống quản lý và tối ưu hóa hồ sơ đám mây");

    return (
        <header className="bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                    <Menu size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">{title}</h2>
                    {displaySubtitle && <p className="text-xs text-slate-500 mt-1.5 font-medium">{displaySubtitle}</p>}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
                </button>
                <button
                    onClick={onProfileClick}
                    className="flex items-center gap-2 pl-4 cursor-pointer hover:opacity-85 transition-all select-none border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500/50 rounded-xl"
                >
                    <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/10">
                        {avatarText || "U"}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 hidden md:inline">{displayName || "Người dùng"}</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
