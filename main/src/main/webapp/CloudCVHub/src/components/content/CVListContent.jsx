import { useState } from "react";
import { 
    RefreshCw, Folder, X, Calendar 
} from 'lucide-react';
import { 
    Icons8Plus, 
    Icons8Edit, 
    Icons8Link, 
    Icons8History, 
    Icons8Trash, 
    Icons8ShieldSecure, 
    Icons8Copy, 
    Icons8Check 
} from '../icons/Icons8.jsx';
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
                if (data.result.expiresAt) {
                    const localExp = new Date(data.result.expiresAt);
                    localExp.setMinutes(localExp.getMinutes() - localExp.getTimezoneOffset());
                    setShareExpires(localExp.toISOString().slice(0, 16));
                }
            }
        } catch (err) {
            console.error("Lỗi kiểm tra link chia sẻ:", err);
        }
    };

    // Xử lý Tạo / Cập nhật Link chia sẻ
    const handleCreateShareLink = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${activeResume.id}/share`), {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: sharePassword.trim() || null,
                    expiresAt: shareExpires ? new Date(shareExpires).toISOString() : null
                })
            });
            const data = await res.json();
            if (res.ok && data.result) {
                setSharedLinkData(data.result);
                showToast("Cập nhật liên kết chia sẻ thành công!", "success");
            } else {
                showToast(data.message || "Không thể tạo liên kết chia sẻ", "error");
            }
        } catch (err) {
            console.error("Lỗi chia sẻ:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        }
    };

    // Mở Modal Lịch sử phiên bản
    const handleOpenVersionModal = async (cv) => {
        setActiveResume(cv);
        setNewVersionName("");
        setIsVersionModalOpen(true);
        loadVersions(cv.id);
    };

    // Tải danh sách phiên bản của CV
    const loadVersions = async (resumeId) => {
        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${resumeId}/versions`), {
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok && data.result) {
                setVersions(data.result);
            } else {
                setVersions([]);
            }
        } catch (err) {
            console.error("Lỗi lấy danh sách phiên bản:", err);
            setVersions([]);
        }
    };

    // Tạo phiên bản sao lưu mới
    const handleCreateVersion = async (e) => {
        e.preventDefault();
        if (!newVersionName.trim()) return;

        try {
            const res = await fetch(apiUrl(`/api/v1/resumes/${activeResume.id}/versions`), {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ versionName: newVersionName.trim() })
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Lưu phiên bản sao lưu thành công!", "success");
                setNewVersionName("");
                loadVersions(activeResume.id);
            } else {
                showToast(data.message || "Lỗi tạo phiên bản mới", "error");
            }
        } catch (err) {
            console.error("Lỗi tạo phiên bản:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        }
    };

    // Khôi phục một phiên bản cũ
    const handleRestoreVersion = async (versionId) => {
        if (!window.confirm("Khôi phục phiên bản này sẽ ghi đè nội dung hiện tại của CV. Bạn có muốn tiếp tục?")) {
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
        <div className="space-y-6 font-mono">
            {isLoading ? (
                <div className="flex justify-center items-center py-16">
                    <div className="flex items-center gap-3 p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#000]">
                        <RefreshCw className="animate-spin text-[#FF4B2B]" size={22} />
                        <span className="text-xs font-bold uppercase">Đang tải danh sách hồ sơ...</span>
                    </div>
                </div>
            ) : resumes.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] p-8">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#FF4B2B] border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#000]">
                        <Folder size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-base font-black text-black uppercase">Chưa có hồ sơ CV nào</h3>
                    <p className="text-xs text-zinc-600 font-semibold mt-1 max-w-md mx-auto">
                        Hãy tạo hồ sơ CV đầu tiên để bắt đầu lưu trữ, mã hóa và quản lý chia sẻ bảo mật.
                    </p>
                    <button
                        onClick={() => setPage("upload")}
                        className="mt-6 px-6 py-3 bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white font-bold rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs inline-flex items-center gap-2 cursor-pointer uppercase"
                    >
                        <Icons8Plus size={16} /> Tạo CV đầu tiên
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden">
                    <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-zinc-50">
                        <div>
                            <h3 className="font-black text-black uppercase tracking-tight text-sm sm:text-base">
                                DANH SÁCH HỒ SƠ CÁ NHÂN
                            </h3>
                            <span className="text-[11px] text-zinc-500 font-bold">
                                Tổng cộng: {resumes.length} hồ sơ trên hệ thống
                            </span>
                        </div>
                        <button
                            onClick={() => setPage("upload")}
                            className="px-4 py-2 bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white text-xs font-bold rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer uppercase"
                        >
                            <Icons8Plus size={14} /> Thêm CV mới
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#FFF275] border-b-2 border-black text-xs font-black text-black uppercase tracking-wider">
                                    <th className="px-6 py-3.5 border-r border-black/15">Tiêu đề CV</th>
                                    <th className="px-6 py-3.5 border-r border-black/15">Công việc mục tiêu</th>
                                    <th className="px-6 py-3.5 border-r border-black/15">Ngày cập nhật</th>
                                    <th className="px-6 py-3.5 text-right">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/10 text-xs sm:text-sm text-black">
                                {resumes.map((cv) => (
                                    <tr key={cv.id} className="hover:bg-rose-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-black">
                                            <div className="flex items-center gap-2">
                                                <span className="truncate max-w-[220px] sm:max-w-xs">{cv.title}</span>
                                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded border border-black bg-white uppercase shrink-0">
                                                    {cv.content ? `${(cv.content.length / 1024).toFixed(1)}KB` : "0KB"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-zinc-700">
                                            {cv.targetJob || "Chưa xác định"}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-zinc-500">
                                            {formatRelativeTime(cv.updatedAt || cv.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleStartEdit(cv)}
                                                    title="Chỉnh sửa nội dung"
                                                    className="p-2 text-black bg-white hover:bg-[#FFF275] border-2 border-black rounded-lg shadow-[1px_1px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                                                >
                                                    <Icons8Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenShareModal(cv)}
                                                    title="Chia sẻ link bảo mật"
                                                    className="p-2 text-black bg-white hover:bg-emerald-200 border-2 border-black rounded-lg shadow-[1px_1px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                                                >
                                                    <Icons8Link size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenVersionModal(cv)}
                                                    title="Lịch sử phiên bản"
                                                    className="p-2 text-black bg-white hover:bg-sky-200 border-2 border-black rounded-lg shadow-[1px_1px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                                                >
                                                    <Icons8History size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteResume(cv.id)}
                                                    title="Xóa hồ sơ"
                                                    className="p-2 text-white bg-[#FF5E5B] hover:bg-[#FF4B2B] border-2 border-black rounded-lg shadow-[1px_1px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                                                >
                                                    <Icons8Trash size={16} />
                                                </button>
                                            </div>
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
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsShareModalOpen(false)} />
                    <div className="relative bg-white rounded-2xl shadow-[8px_8px_0px_#000] max-w-lg w-full p-6 border-2 border-black text-left">
                        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-5">
                            <h3 className="font-black text-black text-sm uppercase flex items-center gap-2">
                                <Icons8Link size={18} className="text-[#FF4B2B]" />
                                Chia sẻ: {activeResume.title}
                            </h3>
                            <button
                                onClick={() => setIsShareModalOpen(false)}
                                className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FFF275] transition-colors cursor-pointer"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateShareLink} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-black mb-1.5 uppercase tracking-wider">
                                    Mật khẩu truy cập (Tùy chọn)
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                        <Icons8ShieldSecure size={16} />
                                    </span>
                                    <input
                                        type="password"
                                        value={sharePassword}
                                        onChange={(e) => setSharePassword(e.target.value)}
                                        placeholder="Nhập tối thiểu 5 ký tự bảo mật"
                                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border-2 border-black rounded-xl text-black font-mono text-sm focus:bg-white focus:shadow-[3px_3px_0px_#000] focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-black mb-1.5 uppercase tracking-wider">
                                    Thời gian hết hạn (Tùy chọn)
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                        <Calendar size={16} strokeWidth={2.5} />
                                    </span>
                                    <input
                                        type="datetime-local"
                                        value={shareExpires}
                                        onChange={(e) => setShareExpires(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border-2 border-black rounded-xl text-black font-mono text-sm focus:bg-white focus:shadow-[3px_3px_0px_#000] focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white border-2 border-black rounded-xl text-xs font-bold uppercase shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={15} strokeWidth={2.5} /> Tạo mới hoặc Cập nhật Link
                            </button>
                        </form>

                        {sharedLinkData && (
                            <div className="mt-6 pt-5 border-t-2 border-black">
                                <label className="block text-xs font-black text-black mb-2 uppercase tracking-wider">
                                    Mã liên kết chia sẻ công khai
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={apiUrl(`/api/v1/public/share/${sharedLinkData.shareCode}`)}
                                        className="w-full px-3 py-2 bg-emerald-50 border-2 border-black rounded-xl text-black text-xs font-mono select-all focus:outline-none"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(apiUrl(`/api/v1/public/share/${sharedLinkData.shareCode}`))}
                                        className="px-3.5 bg-white hover:bg-[#FFF275] border-2 border-black rounded-xl text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center cursor-pointer"
                                        title="Sao chép"
                                    >
                                        {copied ? <Icons8Check size={16} className="text-emerald-700" /> : <Icons8Copy size={16} />}
                                    </button>
                                </div>
                                {sharedLinkData.password && (
                                    <p className="text-xs text-[#FF4B2B] font-bold mt-2.5">
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
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsVersionModalOpen(false)} />
                    <div className="relative bg-white rounded-2xl shadow-[8px_8px_0px_#000] max-w-2xl w-full p-6 border-2 border-black text-left flex flex-col max-h-[85vh]">
                        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-5">
                            <h3 className="font-black text-black text-sm uppercase flex items-center gap-2">
                                <Icons8History size={18} className="text-[#FF4B2B]" />
                                Lịch sử phiên bản: {activeResume.title}
                            </h3>
                            <button
                                onClick={() => setIsVersionModalOpen(false)}
                                className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FFF275] transition-colors cursor-pointer"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Form tạo phiên bản sao lưu mới */}
                        <form onSubmit={handleCreateVersion} className="flex gap-2 mb-5">
                            <input
                                type="text"
                                required
                                value={newVersionName}
                                onChange={(e) => setNewVersionName(e.target.value)}
                                placeholder="Nhập tên phiên bản sao lưu (ví dụ: Bản cập nhật T10)"
                                className="flex-1 px-4 py-2.5 bg-zinc-50 border-2 border-black rounded-xl text-black font-mono text-sm focus:bg-white focus:shadow-[3px_3px_0px_#000] focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white border-2 border-black rounded-xl text-xs font-bold uppercase shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                            >
                                Lưu phiên bản
                            </button>
                        </form>

                        <div className="flex-1 overflow-y-auto pr-1">
                            <div className="bg-white rounded-xl border-2 border-black overflow-hidden">
                                {versions.length === 0 ? (
                                    <div className="text-center py-8 text-zinc-500 text-xs font-bold">
                                        Chưa có phiên bản sao lưu lịch sử nào cho CV này.
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-black bg-[#FFF275] text-xs font-black text-black uppercase tracking-wider">
                                                <th className="px-4 py-2.5 border-r border-black/15">Tên phiên bản</th>
                                                <th className="px-4 py-2.5 border-r border-black/15">Thời gian tạo</th>
                                                <th className="px-4 py-2.5 text-right">Khôi phục</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/10 text-xs text-black">
                                            {versions.map((ver) => (
                                                <tr key={ver.id} className="hover:bg-rose-50/50 transition-colors">
                                                    <td className="px-4 py-3 font-bold text-black">{ver.versionName}</td>
                                                    <td className="px-4 py-3 font-semibold text-zinc-600">
                                                        {new Date(ver.createdAt).toLocaleString("vi-VN")}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            onClick={() => handleRestoreVersion(ver.id)}
                                                            className="px-3 py-1 bg-white hover:bg-black hover:text-white text-black font-bold border-2 border-black rounded-lg shadow-[1px_1px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer uppercase text-[11px]"
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
