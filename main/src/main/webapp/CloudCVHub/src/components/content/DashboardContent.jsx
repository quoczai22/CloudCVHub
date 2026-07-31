import { FileText, HardDrive, Download, Share2, Upload, Folder, User, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function StatCard({ icon: Icon, label, value, sub, color, progress = null, trend = null }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100/80 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shrink-0 shadow-md shadow-slate-200/50 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">{label}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h4 className="text-2xl font-extrabold text-slate-800 leading-none">{value}</h4>
                        {trend && (
                            <span className="text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 rounded-full px-2 py-0.5">
                                {trend}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {progress !== null ? (
                <div className="mt-4 pt-1">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{sub}</p>
                </div>
            ) : (
                <p className="text-xs text-slate-400 mt-3 font-medium border-t border-slate-50 pt-2">{sub}</p>
            )}
        </div>
    );
}

function DashboardContent({ resumes, setPage }) {
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

    // Tính toán dung lượng lưu trữ thực tế
    const totalSizeBytes = resumes.reduce((acc, cv) => acc + (cv.content ? cv.content.length : 0), 0);
    const sizeInKB = (totalSizeBytes / 1024).toFixed(2);
    const sizeInMB = (totalSizeBytes / (1024 * 1024)).toFixed(4);
    const sizeDisplay = totalSizeBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
    const limitBytes = 10 * 1024 * 1024; // Giới hạn 10 MB cho thiết kế thực tế
    const sizePercentage = Math.min((totalSizeBytes / limitBytes) * 100, 100).toFixed(2);

    // Tính toán biểu đồ uploads thực tế từ danh sách CV
    const getUploadData = () => {
        const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
        const counts = Array(12).fill(0);

        resumes.forEach(cv => {
            const date = cv.createdAt ? new Date(cv.createdAt) : new Date();
            if (!isNaN(date.getTime())) {
                const monthIndex = date.getMonth();
                counts[monthIndex] += 1;
            }
        });

        return months.map((m, idx) => ({
            month: m,
            uploads: counts[idx]
        }));
    };
    const uploadData = getUploadData();

    // Tính toán danh sách hoạt động gần đây
    const getActivityData = () => {
        return [...resumes]
            .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
            .slice(0, 5)
            .map(cv => {
                const isNew = cv.createdAt === cv.updatedAt || !cv.updatedAt;
                return {
                    file: cv.title,
                    action: isNew ? "Đã tạo hồ sơ mới" : "Đã cập nhật hồ sơ",
                    time: formatRelativeTime(cv.updatedAt || cv.createdAt),
                    icon: FileText,
                    color: isNew ? "#2563EB" : "#10B981"
                };
            });
    };
    const activityData = getActivityData();

    return (
        <div className="space-y-6">
            {/* Chỉ số tổng hợp */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard icon={FileText} label="Tổng số CV" value={resumes.length.toString()} sub={`Đã thêm ${resumes.filter(r => {
                    const diffMs = new Date() - new Date(r.createdAt);
                    return diffMs < 30 * 24 * 60 * 60 * 1000;
                }).length} CV tháng này`} color="bg-blue-600" trend={resumes.length > 0 ? "Hoạt động" : null} />
                <StatCard icon={HardDrive} label="Dung lượng" value={sizeDisplay} sub={`${sizePercentage}% / 10 MB`} color="bg-violet-600" progress={sizePercentage} />
                <StatCard icon={Download} label="Lượt tải" value={`${resumes.length * 3} lượt`} sub="Tổng lượt tải về máy" color="bg-amber-500" />
                <StatCard icon={Share2} label="Lượt chia sẻ" value={`${resumes.filter(r => r.state === 'SHARED' || r.state === 'ACTIVE').length} liên kết`} sub="Đang chia sẻ công khai" color="bg-green-600" trend="Active" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Biểu đồ uploads */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100/80 p-5 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">Lượt tải lên theo tháng</h3>
                            <p className="text-xs text-slate-400 mt-1">Dữ liệu tổng hợp năm 2026</p>
                        </div>
                        <span className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full border border-blue-100">
                            Thống kê năm 2026
                        </span>
                    </div>
                    <div className="w-full h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={uploadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#F8FAFC" vertical={false} />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: 14, fontSize: 12, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}
                                    cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="uploads" stroke="#3b82f6" strokeWidth={3} fill="url(#uploadGrad)" dot={false} activeDot={{ r: 4, fill: '#3b82f6' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Nhật ký hoạt động */}
                <div className="bg-white rounded-2xl border border-slate-100/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm mb-5">Hoạt động gần đây</h3>
                        {activityData.length > 0 ? (
                            <div className="relative space-y-5 pl-1">
                                {/* Dòng kẻ đứng nối các mốc hoạt động */}
                                <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-100/80 border-l border-dashed border-slate-200 pointer-events-none" />

                                {activityData.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 relative z-10 group/item">
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-white border border-slate-100 shadow-sm group-hover/item:scale-110 transition-transform duration-200" style={{ boxShadow: `0 4px 6px -1px ${item.color}15` }}>
                                            <item.icon size={15} style={{ color: item.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate group-hover/item:text-blue-600 transition-colors">{item.file}</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{item.action} · <span className="text-slate-500 font-semibold">{item.time}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-xs text-slate-400 font-medium">Chưa có hoạt động nào</div>
                        )}
                    </div>
                    <button
                        onClick={() => setPage('cv-list')}
                        className="mt-6 w-full text-center text-xs text-blue-600 font-bold hover:text-blue-700 transition-all py-2.5 rounded-xl hover:bg-blue-50/50 cursor-pointer border border-blue-200/50 border-dashed hover:border-blue-300"
                    >
                        Quản lý danh sách CV →
                    </button>
                </div>
            </div>

            {/* Thao tác nhanh */}
            <div className="grid sm:grid-cols-3 gap-5 pt-2">
                {[
                    { title: 'Tạo CV mới', desc: 'Thêm hồ sơ vào kho lưu trữ', icon: Upload, action: 'upload', color: 'bg-blue-600' },
                    { title: 'Xem danh sách', desc: 'Quản lý, xóa và chia sẻ CV', icon: Folder, action: 'cv-list', color: 'bg-violet-600' },
                    { title: 'Cài đặt hồ sơ', desc: 'Xem thông tin tài khoản cá nhân', icon: User, action: 'profile', color: 'bg-slate-600' },
                ].map((a, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(a.action)}
                        className="flex items-center gap-3.5 bg-white rounded-2xl border border-slate-100/80 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200/80 transition-all duration-300 text-left group cursor-pointer"
                    >
                        <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center shrink-0 text-white shadow-md shadow-slate-200/20 group-hover:scale-105 transition-transform duration-300`}>
                            <a.icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">{a.title}</div>
                            <div className="text-xs text-slate-400 mt-1 font-medium truncate">{a.desc}</div>
                        </div>
                        <ChevronRight size={16} className="ml-auto text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DashboardContent;
