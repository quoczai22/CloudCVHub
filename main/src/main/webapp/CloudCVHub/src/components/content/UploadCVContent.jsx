import { useState } from "react";
import Button from '../Button.jsx';

function UploadCVContent({ onSuccess, onCancel, showToast }) {
    const [newTitle, setNewTitle] = useState("");
    const [newTargetJob, setNewTargetJob] = useState("");
    const [newContent, setNewContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateResume = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("http://localhost:8081/api/v1/resumes", {
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
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-6">Tạo hồ sơ CV mới</h3>
            <form onSubmit={handleCreateResume} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tiêu đề CV</label>
                    <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Ví dụ: CV Software Engineer - Nguyễn Văn A"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Công việc mục tiêu</label>
                    <input
                        type="text"
                        required
                        value={newTargetJob}
                        onChange={(e) => setNewTargetJob(e.target.value)}
                        placeholder="Ví dụ: Node.js Developer, Web Designer..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nội dung CV (Kinh nghiệm, Kỹ năng, Học văn...)</label>
                    <textarea
                        required
                        rows={10}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Nhập đầy đủ thông tin hoặc dán nội dung văn bản CV của bạn vào đây..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm font-mono leading-relaxed"
                    />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    >
                        Hủy bỏ
                    </button>
                    <Button type="submit" isLoading={isSubmitting} loadingText="Đang tạo..." className="w-auto px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer font-semibold">
                        Tạo CV mới
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UploadCVContent;
