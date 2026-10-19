import { useState } from "react";
import Button from '../Button.jsx';
import { apiUrl } from '../../config/api.js';
import { FilePlus2, Sparkles, ArrowLeft } from 'lucide-react';

function UploadCVContent({ onSuccess, onCancel, showToast }) {
    const [newTitle, setNewTitle] = useState("");
    const [newTargetJob, setNewTargetJob] = useState("");
    const [newContent, setNewContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateResume = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(apiUrl("/api/v1/resumes"), {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: newTitle,
                    targetJob: newTargetJob,
                    content: newContent
                })
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Tạo CV mới thành công!", "success");
                onSuccess();
            } else {
                showToast(data.message || "Tạo CV thất bại", "error");
            }
        } catch (err) {
            console.error("Lỗi tạo CV:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] font-mono">
            <div className="flex items-center justify-between pb-5 border-b-2 border-black mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#FF5E5B] text-white text-[10px] font-black uppercase rounded border border-black shadow-[1px_1px_0px_#000]">
                            SOẠN THẢO CV
                        </span>
                        <span className="text-[11px] font-bold text-zinc-500">Mã hóa tự động</span>
                    </div>
                    <h3 className="font-black text-black text-lg uppercase tracking-tight flex items-center gap-2">
                        <FilePlus2 size={20} strokeWidth={2.5} className="text-[#FF4B2B]" />
                        Khởi tạo hồ sơ CV mới
                    </h3>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 border-2 border-black rounded-lg bg-white hover:bg-[#FFF275] text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    title="Quay lại"
                >
                    <ArrowLeft size={16} strokeWidth={2.5} />
                </button>
            </div>

            <form onSubmit={handleCreateResume} className="space-y-5">
                <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                        Tiêu đề hồ sơ CV <span className="text-[#FF4B2B]">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ví dụ: CV Software Engineer - Nguyễn Văn A"
                        className="w-full px-4 py-3 bg-zinc-50 border-2 border-black rounded-xl focus:bg-white focus:shadow-[3px_3px_0px_#000] focus:outline-none transition-all text-black text-sm font-mono"
                    />
                </div>

                <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                        Vị trí / Công việc ứng tuyển mục tiêu <span className="text-[#FF4B2B]">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={newTargetJob}
                        onChange={(e) => setNewTargetJob(e.target.value)}
                        placeholder="Ví dụ: Backend Developer, Data Engineer..."
                        className="w-full px-4 py-3 bg-zinc-50 border-2 border-black rounded-xl focus:bg-white focus:shadow-[3px_3px_0px_#000] focus:outline-none transition-all text-black text-sm font-mono"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-black text-black uppercase tracking-wider">
                            Nội dung chi tiết CV <span className="text-[#FF4B2B]">*</span>
                        </label>
                        <span className="text-[10px] text-zinc-500 font-bold">
                            Hỗ trợ Markdown & Text thuần
                        </span>
                    </div>
                    <textarea
                        required
                        rows={11}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Nhập thông tin tóm tắt kinh nghiệm làm việc, kỹ năng, các dự án nổi bật, học vấn của bạn..."
                        className="w-full px-4 py-3 bg-zinc-50 border-2 border-black rounded-xl focus:bg-white focus:shadow-[3px_3px_0px_#000] focus:outline-none transition-all text-black text-sm font-mono leading-relaxed"
                    />
                </div>

                <div className="flex gap-3 justify-end pt-3 border-t-2 border-black">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 border-2 border-black bg-white hover:bg-[#FFF275] text-black rounded-xl text-xs font-bold uppercase shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                    >
                        Hủy bỏ
                    </button>
                    <Button 
                        type="submit" 
                        isLoading={isSubmitting} 
                        loadingText="Đang lưu..." 
                        className="w-auto px-6 py-2.5 text-xs bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white rounded-xl shadow-[3px_3px_0px_#000] font-bold uppercase"
                    >
                        Tạo CV mới
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UploadCVContent;
