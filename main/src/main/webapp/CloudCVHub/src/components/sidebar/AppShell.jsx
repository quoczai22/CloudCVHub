import { useState } from "react";
import SideBar from "./SideBar.jsx";
import Header from "../header/Header.jsx";

function AppShell({ children, activePage, setPage, onLogout, title, subtitle, displayName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

    if (!displayName) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500 font-medium">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <SideBar
                activePage={activePage}
                setPage={setPage}
                onLogout={onLogout}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                desktopSidebarOpen={desktopSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
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
                />

                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppShell;
