import { useState } from "react";
import SideBar from "./SideBar.jsx";
import Header from "../header/Header.jsx";

function AppShell({ children, activePage, setPage, onLogout, title, subtitle, displayName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

    if (!displayName) {
        return (
            <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center font-mono">
                <div className="flex items-center gap-3 text-black text-sm font-bold bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000]">
                    <div className="w-4 h-4 border-2 border-black border-t-[#FF4B2B] rounded-full animate-spin" />
                    ĐANG TẢI DỮ LIỆU CLOUDCVHUB...
                </div>
            </div>
        );
    }

    return (
        <div className="app-shell min-h-screen bg-[#f5f2e9] flex text-black antialiased selection:bg-[#FFF275] selection:text-black">
            <SideBar
                activePage={activePage}
                setPage={setPage}
                onLogout={onLogout}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                desktopSidebarOpen={desktopSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                <Header
                    title={title}
                    subtitle={subtitle}
                    displayName={displayName}
                    activePage={activePage}
                    onMenuClick={() => {
                        if (window.innerWidth >= 1024) {
                            setDesktopSidebarOpen(!desktopSidebarOpen);
                        } else {
                            setMobileMenuOpen(true);
                        }
                    }}
                    onProfileClick={() => setPage("profile")}
                    onNewCVClick={() => setPage("upload")}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-none w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppShell;

