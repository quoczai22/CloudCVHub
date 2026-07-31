import { useState } from "react";
import Button from '../Button.jsx';

function EditCVContent({ resume, onSuccess, onCancel, showToast }) {
    const [editTitle, setEditTitle] = useState(resume?.title || "");
    const [editTargetJob, setEditTargetJob] = useState(resume?.targetJob || "");
    const [editContent, setEditContent] = useState(resume?.content || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdateResume = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`http://localhost:8081/api/v1/resumes/${resume.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: editTitle,
                    targetJob: editTargetJob,
                    content: editContent
                })
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Cập nhật CV thành công!", "success");
                onSuccess();
            } else {
                showToast(data.message || "Cập nhật CV thất bại", "error");
            }
        } catch (err) {
            console.error("Lỗi cập nhật CV:", err);
            showToast("Lỗi kết nối máy chủ", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-6">Chỉnh sửa hồ sơ</h3>
            <form onSubmit={handleUpdateResume} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tiêu đề CV</label>
                    <input
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Công việc mục tiêu</label>
                    <input
                        type="text"
                        required
                        value={editTargetJob}
                        onChange={(e) => setEditTargetJob(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nội dung CV</label>
                    <textarea
                        required
                        rows={10}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm font-mono leading-relaxed"
                    />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    >
                        Quay lại
                    </button>
                    <Button type="submit" isLoading={isSubmitting} loadingText="Đang lưu..." className="w-auto px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer font-semibold">
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditCVContent;
