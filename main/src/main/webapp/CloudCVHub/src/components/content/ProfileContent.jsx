function ProfileContent({ user, displayName, resumes }) {
    const avatarText = (displayName || "Người dùng")
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    // Tính toán dung lượng lưu trữ thực tế
    const totalSizeBytes = resumes.reduce((acc, cv) => acc + (cv.content ? cv.content.length : 0), 0);
    const sizeInKB = (totalSizeBytes / 1024).toFixed(2);
    const sizeInMB = (totalSizeBytes / (1024 * 1024)).toFixed(4);
    const sizeDisplay = totalSizeBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
    const limitBytes = 10 * 1024 * 1024; // Giới hạn 10 MB cho thiết kế thực tế
    const sizePercentage = Math.min((totalSizeBytes / limitBytes) * 100, 100).toFixed(2);
    const sizeProgressDisplay = `${sizeDisplay} / 10 MB`;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div className="text-center mb-8 pb-8 border-b border-slate-100">
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    {avatarText || "U"}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{displayName}</h3>
                <p className="text-sm text-slate-400 mt-1">Hội viên cao cấp CloudCVHub</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 items-center py-2.5 border-b border-slate-50">
                    <span className="text-sm font-semibold text-slate-400">Họ và tên</span>
                    <span className="text-sm font-semibold text-slate-800 col-span-2">{displayName}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center py-2.5 border-b border-slate-50">
                    <span className="text-sm font-semibold text-slate-400">Email</span>
                    <span className="text-sm font-semibold text-slate-800 col-span-2">{user.email || "Chưa thiết lập"}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center py-2.5 border-b border-slate-50">
                    <span className="text-sm font-semibold text-slate-400">Quyền hạn</span>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-3 py-0.5 w-max text-xs">
                        {user.role || "USER"}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center py-2.5">
                    <span className="text-sm font-semibold text-slate-400">Giới hạn lưu trữ</span>
                    <div className="col-span-2">
                        <span className="text-sm font-semibold text-slate-800">{sizeProgressDisplay}</span>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${sizePercentage}%` }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileContent;
