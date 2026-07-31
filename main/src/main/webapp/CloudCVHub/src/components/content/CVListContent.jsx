import { useState } from "react";
import { 
    RefreshCw, Folder, Plus, Edit, Link, History, Trash2, 
    X, Shield, Calendar, Copy, Check 
} from 'lucide-react';
import { apiUrl } from '../../config/api.js';

function CVListContent({
    isLoading,
    resumes,
    setPage,
    handleStartEdit,
    loadResumes,
    showToast
}) {
    // 1. States cho Share Modal
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [sharePassword, setSharePassword] = useState("");
    const [shareExpires, setShareExpires] = useState("");
    const [sharedLinkData, setSharedLinkData] = useState(null);
    const [copied, setCopied] = useState(false);

    // 2. States cho Version Modal
    const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
    const [versions, setVersions] = useState([]);
    const [newVersionName, setNewVersionName] = useState("");

    // 3. State cho CV hiện tại đang tác vụ
    const [activeResume, setActiveResume] = useState(null);

    // Hàm định dạng thời gian tự nhiên
    const formatRelativeTime = (dateString) => {
        if (!dateString) return "Chưa cập nhật";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Chưa cập nhật";
        
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return "Vừa xong";
        if (diffMin < 60) return `${diffMin} phút trước`;
        if (diffHour < 24) return `${diffHour} giờ trước`;
        if (diffDay < 7) return `${diffDay} ngày trước`;
        
        return date.toLocaleDateString("vi-VN", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Hàm xóa CV
    const handleDeleteResume = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa CV này không? Hành động này không thể hoàn tác.")) {
            return;
        }
        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${id}`), {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Đã xóa CV thành công!", "success");
                loadResumes();
            } else {
                showToast(data.message || "Không thể xóa CV này", "error");
            }
        } catch (err) {
            console.error("Lỗi xóa CV:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        }
    };

    // Sao chép Link chia sẻ
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Mở Modal cấu hình Link chia sẻ
    const handleOpenShareModal = async (cv) => {
        setActiveResume(cv);
        setSharePassword("");
        setShareExpires("");
        setSharedLinkData(null);
        setIsShareModalOpen(true);

        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${cv.id}/share`), {
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok && data.result) {
                setSharedLinkData(data.result);
            }
        } catch (err) {
            console.error("Lỗi lấy thông tin chia sẻ:", err);
        }
    };

    // Tạo Link chia sẻ
    const handleCreateShareLink = async (e) => {
        e.preventDefault();
        try {
            let formattedExpiry = null;
            if (shareExpires) {
                formattedExpiry = new Date(shareExpires).toISOString();
            }

            const res = await fetch(apiUrl(`/api/v1/resumes/${activeResume.id}/share`), {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: sharePassword || null,
                    expiresAt: formattedExpiry
                })
            });
            const data = await res.json();
            if (res.ok && data.result) {
                setSharedLinkData(data.result);
                showToast("Tạo link chia sẻ thành công!", "success");
            } else {
                showToast(data.message || "Lỗi tạo link chia sẻ", "error");
            }
        } catch (err) {
            console.error("Lỗi tạo chia sẻ:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        }
    };

    // Mở Modal lịch sử phiên bản
    const handleOpenVersionModal = async (cv) => {
        setActiveResume(cv);
        setNewVersionName("");
        setIsVersionModalOpen(true);
        loadVersions(cv.id);
    };

    // Lấy danh sách các phiên bản từ API
    const loadVersions = async (resumeId) => {
        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${resumeId}/versions`), {
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok && data.result) {
                setVersions(data.result);
            }
        } catch (err) {
            console.error("Lỗi lấy danh sách phiên bản:", err);
        }
    };

    // Tạo mới một phiên bản lưu trữ
    const handleCreateVersion = async (e) => {
        e.preventDefault();
        if (!newVersionName.trim()) return;
        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${activeResume.id}/versions`), {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    versionName: newVersionName
                })
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Tạo phiên bản lưu trữ mới thành công!", "success");
                setNewVersionName("");
                loadVersions(activeResume.id);
            } else {
                showToast(data.message || "Tạo phiên bản lỗi", "error");
            }
        } catch (err) {
            console.error("Lỗi tạo phiên bản:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        }
    };

    // Khôi phục CV về phiên bản được chọn
    const handleRestoreVersion = async (versionId) => {
        if (!window.confirm("Bạn có chắc muốn khôi phục nội dung CV về phiên bản này không?")) {
            return;
        }
        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${activeResume.id}/versions/${versionId}/restore`), {
                method: "POST",
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Khôi phục phiên bản CV thành công!", "success");
                setIsVersionModalOpen(false);
                loadResumes();
            } else {
                showToast(data.message || "Lỗi khôi phục phiên bản", "error");
            }
        } catch (err) {
            console.error("Lỗi khôi phục phiên bản:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        }
    };

    return (
        <div className="space-y-6">
            {isLoading ? (
                <div className="flex justify-center items-center py-16">
                    <RefreshCw className="animate-spin text-blue-500" size={32} />
                </div>
            ) : resumes.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <Folder size={48} className="mx-auto text-slate-300 mb-3" />
                    <h3 className="font-semibold text-slate-700">Chưa có CV nào</h3>
                    <p className="text-sm text-slate-400 mt-1">Hãy tạo một CV mới để bắt đầu quản lý hồ sơ.</p>
                    <button
                        onClick={() => setPage("upload")}
                        className="mt-5 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all text-sm inline-flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 animate-pulse"
                    >
                        <Plus size={16} /> Tạo CV đầu tiên
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800">Danh sách hồ sơ cá nhân</h3>
                        <button
                            onClick={() => setPage("upload")}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                            <Plus size={14} /> Thêm CV mới
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">Tiêu đề CV</th>
                                    <th className="px-6 py-3.5">Công việc ứng tuyển</th>
                                    <th className="px-6 py-3.5">Ngày cập nhật</th>
                                    <th className="px-6 py-3.5 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                                {resumes.map((cv) => (
                                    <tr key={cv.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">{cv.title}</td>
                                        <td className="px-6 py-4">{cv.targetJob || "Chưa xác định"}</td>
                                        <td className="px-6 py-4 text-xs text-slate-400">
                                            {formatRelativeTime(cv.updatedAt || cv.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => handleStartEdit(cv)}
                                                title="Chỉnh sửa"
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenShareModal(cv)}
                                                title="Chia sẻ link"
                                                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all cursor-pointer"
                                            >
                                                <Link size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenVersionModal(cv)}
                                                title="Xem lịch sử phiên bản"
                                                className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all cursor-pointer"
                                            >
                                                <History size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteResume(cv.id)}
                                                title="Xóa hồ sơ"
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL CHIA SẺ LIÊN KẾT */}
            {isShareModalOpen && activeResume && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsShareModalOpen(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-slide-in border border-slate-100 text-left">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Link size={18} className="text-green-600" />
                                Chia sẻ CV: {activeResume.title}
                            </h3>
                            <button onClick={() => setIsShareModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateShareLink} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Mật khẩu truy cập (Tùy chọn)</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <Shield size={16} />
                                    </span>
                                    <input
                                        type="password"
                                        value={sharePassword}
                                        onChange={(e) => setSharePassword(e.target.value)}
                                        placeholder="Nhập tối thiểu 5 ký tự bảo mật"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Thời gian hết hạn (Tùy chọn)</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <Calendar size={16} />
                                    </span>
                                    <input
                                        type="datetime-local"
                                        value={shareExpires}
                                        onChange={(e) => setShareExpires(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                            >
                                <RefreshCw size={15} /> Tạo mới hoặc Cập nhật Link
                            </button>
                        </form>

                        {sharedLinkData && (
                            <div className="mt-6 pt-5 border-t border-slate-100">
                                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">Mã liên kết chia sẻ công khai</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={apiUrl(`/api/v1/public/share/${sharedLinkData.shareCode}`)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-xs font-mono select-all focus:outline-none"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(apiUrl(`/api/v1/public/share/${sharedLinkData.shareCode}`))}
                                        className="px-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-all flex items-center justify-center cursor-pointer"
                                        title="Sao chép"
                                    >
                                        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                    </button>
                                </div>
                                {sharedLinkData.password && (
                                    <p className="text-xs text-red-500 font-semibold mt-2.5">
                                        ⚠️ Link chia sẻ được bảo vệ bằng mật khẩu bảo mật.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL LỊCH SỬ PHIÊN BẢN */}
            {isVersionModalOpen && activeResume && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsVersionModalOpen(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 animate-slide-in border border-slate-100 text-left flex flex-col max-h-[85vh]">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <History size={18} className="text-violet-600" />
                                Lịch sử phiên bản: {activeResume.title}
                            </h3>
                            <button onClick={() => setIsVersionModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form tạo phiên bản sao lưu mới */}
                        <form onSubmit={handleCreateVersion} className="flex gap-2 mb-5">
                            <input
                                type="text"
                                required
                                value={newVersionName}
                                onChange={(e) => setNewVersionName(e.target.value)}
                                placeholder="Nhập tên phiên bản sao lưu mới (ví dụ: Bản cập nhật T7)"
                                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                            >
                                Lưu phiên bản
                            </button>
                        </form>

                        <div className="flex-1 overflow-y-auto pr-1">
                            <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                {versions.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                                        Chưa có phiên bản sao lưu lịch sử nào cho CV này.
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                <th className="px-4 py-2.5">Tên phiên bản</th>
                                                <th className="px-4 py-2.5">Thời gian tạo</th>
                                                <th className="px-4 py-2.5 text-right">Khôi phục</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                                            {versions.map((ver) => (
                                                <tr key={ver.id} className="hover:bg-white transition-colors">
                                                    <td className="px-4 py-3 font-semibold text-slate-800">{ver.versionName}</td>
                                                    <td className="px-4 py-3 text-slate-400">
                                                        {new Date(ver.createdAt).toLocaleString("vi-VN")}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => handleRestoreVersion(ver.id)}
                                                            className="px-3 py-1 bg-violet-50 text-violet-600 font-semibold border border-violet-100 rounded-lg hover:bg-violet-600 hover:text-white transition-all cursor-pointer"
                                                        >
                                                            Restore
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CVListContent;
