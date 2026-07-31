import { useState, useEffect, useCallback } from "react";
import Alert from '../components/Alert.jsx';
import AppShell from '../components/sidebar/AppShell.jsx';
import DashboardContent from '../components/content/DashboardContent.jsx';
import CVListContent from '../components/content/CVListContent.jsx';
import UploadCVContent from '../components/content/UploadCVContent.jsx';
import EditCVContent from '../components/content/EditCVContent.jsx';
import ProfileContent from '../components/content/ProfileContent.jsx';



// Component chính DashboardPage
function DashboardPage() {
    const [page, setPage] = useState("dashboard");
    const [token] = useState(localStorage.getItem("token"));
    const [user] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));
    const displayName = user?.fullName || user?.fullname || "Người dùng";


    // States quản lý dữ liệu CV
    const [resumes, setResumes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // States Toast/Alert thông báo
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("success");

    // States chỉnh sửa CV
    const [editingResume, setEditingResume] = useState(null);

    // Trình helper hiển thị thông báo
    const showToast = (message, type = "success") => {
        setSnackBarMessage(message);
        setSnackBarType(type);
        setSnackBarOpen(true);
    };

    // Hàm logout người dùng
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    // Tải danh sách CV của người dùng từ API
    const loadResumes = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8081/api/v1/resumes", {
                method: "GET",
                credentials: "include"
            });
            if (res.status === 401 || res.status === 403) {
                handleLogout();
                return;
            }
            const data = await res.json();
            if (res.ok && data.result) {
                setResumes(data.result);
            } else {
                showToast(data.message || "Không thể tải danh sách CV", "error");
            }
        } catch (err) {
            console.error("Lỗi kết nối máy chủ:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadResumes();
    }, [loadResumes]);

    // Chuẩn bị cập nhật CV
    const handleStartEdit = (cv) => {
        setEditingResume(cv);
        setPage("edit-cv");
    };

    return (
        <AppShell
            activePage={page}
            setPage={setPage}
            displayName={displayName}
            onLogout={handleLogout}
            title={page === "dashboard" ? "Dashboard" : page === "cv-list" ? "Quản lý CV" : page === "upload" ? "Tạo CV mới" : page === "profile" ? "Hồ sơ cá nhân" : "Chỉnh sửa CV"}
            subtitle="Hệ thống quản lý và tối ưu hóa hồ sơ đám mây"
        >
            <Alert
                message={snackBarMessage}
                type={snackBarType}
                isOpen={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
            />

            {/* MÀN HÌNH CHÍNH DASHBOARD */}
            {page === "dashboard" && (
                <DashboardContent
                    resumes={resumes}
                    setPage={setPage}
                />
            )}

            {page === "cv-list" && (
                <CVListContent
                    isLoading={isLoading}
                    resumes={resumes}
                    setPage={setPage}
                    handleStartEdit={handleStartEdit}
                    loadResumes={loadResumes}
                    showToast={showToast}
                />
            )}

            {page === "upload" && (
                <UploadCVContent
                    onSuccess={() => {
                        loadResumes();
                        setPage("cv-list");
                    }}
                    onCancel={() => setPage("dashboard")}
                    showToast={showToast}
                />
            )}

            {page === "edit-cv" && (
                <EditCVContent
                    resume={editingResume}
                    onSuccess={() => {
                        loadResumes();
                        setPage("cv-list");
                    }}
                    onCancel={() => setPage("cv-list")}
                    showToast={showToast}
                />
            )}

            {page === "profile" && (
                <ProfileContent
                    user={user}
                    displayName={displayName}
                    resumes={resumes}
                />
            )}
        </AppShell>
    );
}

export default DashboardPage;
