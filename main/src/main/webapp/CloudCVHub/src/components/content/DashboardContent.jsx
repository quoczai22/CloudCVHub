import { ArrowUpRight, Folder, Clock, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { 
  Icons8Resume, 
  Icons8Plus, 
  Icons8Check, 
  Icons8Database, 
  Icons8CloudStorage, 
  Icons8ShieldSecure 
} from '../icons/Icons8.jsx';

// Sparkline Mini Chart Card theo đúng thiết kế Canvas Sparklines
function SparklineCard({ label, value, trend, isPositive = true, data, color, gradientId }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all duration-200 group">
      {/* Khối thông tin chỉ số */}
      <div className="px-4 sm:px-5 pt-6 pb-12 text-center relative z-10">
        <h4 className="text-[11px] font-black uppercase text-zinc-600 tracking-wider leading-tight">
          {label}
        </h4>
        <h3 className="text-2xl sm:text-3xl font-black text-black leading-tight my-2.5 font-mono">
          {value}
        </h3>
        <p className={`text-xs font-black leading-tight flex items-center justify-center gap-1 ${isPositive ? 'text-emerald-700' : 'text-[#FF4B2B]'}`}>
          <span>{isPositive ? '▲' : '▼'}</span>
          <span>{trend}</span>
        </p>
      </div>

      {/* Sparkline Canvas Chart áp đáy thẻ */}
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="y"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DashboardContent({ resumes = [], setPage }) {
  const formatTime = (dateString) => {
    if (!dateString) return "Mới tạo";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Mới tạo";
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Tính dung lượng lưu trữ thực
  const totalSizeBytes = resumes.reduce((acc, cv) => acc + (cv.content ? cv.content.length : 0), 0);
  const sizeInKB = (totalSizeBytes / 1024).toFixed(1);
  const sizeInMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const sizeDisplay = totalSizeBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
  const storageQuotaPercent = Math.min(Math.round((totalSizeBytes / (10 * 1024 * 1024)) * 100), 100);

  // Số lượng CV đang hoạt động và chia sẻ
  const activeCount = resumes.filter((r) => r.state === 'ACTIVE' || r.state === 'SHARED').length;
  const recentResumes = [...resumes]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 4);

  // Dữ liệu sparklines theo mẫu thiết kế
  const chartData1 = [
    { y: 1 }, { y: 2 }, { y: 1 }, { y: 3 }, { y: 5 }, { y: 4 }, { y: 7 }
  ];
  const chartData2 = [
    { y: 2 }, { y: 3 }, { y: 2 }, { y: 9 }, { y: 7 }, { y: 7 }, { y: 4 }
  ];
  const chartData3 = [
    { y: 2 }, { y: 5 }, { y: 1 }, { y: 3 }, { y: 2 }, { y: 6 }, { y: 7 }
  ];
  const chartData4 = [
    { y: 4 }, { y: 5 }, { y: 6 }, { y: 5 }, { y: 7 }, { y: 8 }, { y: 9 }
  ];

  // Dữ liệu biểu đồ xu hướng theo tháng
  const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  const monthlyCounts = Array(12).fill(0);
  resumes.forEach((cv) => {
    const d = cv.createdAt ? new Date(cv.createdAt) : new Date();
    if (!isNaN(d.getTime())) {
      monthlyCounts[d.getMonth()] += 1;
    }
  });
  const trendChartData = months.map((m, idx) => ({ month: m, uploads: monthlyCounts[idx] }));

  return (
    <div className="space-y-8 font-mono">
      {/* 1. Header Action Banner */}
      <section className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-rose-50 via-white to-amber-50">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 bg-[#FF5E5B] text-black text-[10px] font-black uppercase rounded border border-black shadow-[1px_1px_0px_#000]">
              CLOUD SECURE
            </span>
            <span className="text-xs font-bold text-zinc-500">Mã hóa AES-256 + SHA-256</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-black tracking-tight uppercase">
            BẢNG ĐIỀU KHIỂN & CHỈ SỐ HỒ SƠ
          </h2>
          <p className="text-xs text-zinc-600 font-semibold mt-1">
            Theo dõi dữ liệu tương tác, dung lượng đám mây và tần suất cập nhật CV theo thời gian thực.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setPage('cv-list')}
            className="px-3.5 py-2 text-xs font-bold text-black bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:bg-[#FFF275] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer uppercase"
          >
            Quản lý CV ({resumes.length})
          </button>
          <button
            onClick={() => setPage('upload')}
            className="px-4 py-2 text-xs font-bold text-black bg-[#FF5E5B] hover:bg-[#FF4B2B] border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 uppercase"
          >
            <Icons8Plus size={15} />
            <span>Tạo CV mới</span>
          </button>
        </div>
      </section>

      {/* 2. Sparklines Metric Cards Grid (Theo đúng thiết kế Chart Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SparklineCard
          label="Tổng số hồ sơ"
          value={resumes.length}
          trend="57.1% tăng trưởng"
          isPositive={true}
          data={chartData1}
          color="#6366F1"
          gradientId="sparkGradient1"
        />
        <SparklineCard
          label="Đang hoạt động"
          value={activeCount}
          trend="42.8% tương tác"
          isPositive={true}
          data={chartData2}
          color="#FF4B2B"
          gradientId="sparkGradient2"
        />
        <SparklineCard
          label="Dung lượng đã dùng"
          value={sizeDisplay}
          trend={`${storageQuotaPercent}% hạn mức`}
          isPositive={storageQuotaPercent <= 80}
          data={chartData3}
          color="#F59E0B"
          gradientId="sparkGradient3"
        />
        <SparklineCard
          label="Hệ thống bảo mật"
          value="AES-256"
          trend="99.9% trực tuyến"
          isPositive={true}
          data={chartData4}
          color="#10B981"
          gradientId="sparkGradient4"
        />
      </section>

      {/* 3. Main Grid: Left = Recent Resumes & Quick Access | Right = Storage & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 Cols): Hồ sơ gần đây & Phím tắt */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] p-6">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-5">
              <div>
                <h3 className="text-sm font-black text-black uppercase tracking-tight">
                  HỒ SƠ CẬP NHẬT GẦN ĐÂY
                </h3>
                <p className="text-xs text-zinc-500 font-semibold mt-0.5">Các CV được chỉnh sửa hoặc tạo mới nhất</p>
              </div>
              <button
                onClick={() => setPage('cv-list')}
                className="text-xs text-black font-extrabold hover:text-[#FF4B2B] transition-colors flex items-center gap-1 cursor-pointer uppercase underline underline-offset-4"
              >
                <span>Quản lý</span>
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>

            {recentResumes.length > 0 ? (
              <div className="space-y-3">
                {recentResumes.map((cv) => (
                  <div
                    key={cv.id}
                    className="p-3.5 flex items-center justify-between gap-4 border-2 border-black rounded-xl bg-[#fafafa] hover:bg-white hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#FF5E5B] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                        <Icons8Resume size={22} className="text-black" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-black truncate group-hover:text-[#FF4B2B] transition-colors">
                          {cv.title || "CV Không tiêu đề"}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
                          <span className="flex items-center gap-1 font-bold">
                            <Clock size={12} strokeWidth={2} />
                            {formatTime(cv.updatedAt || cv.createdAt)}
                          </span>
                          <span>•</span>
                          <span className="font-bold text-black bg-zinc-200 px-1.5 py-0.2 rounded text-[10px]">
                            {cv.content ? `${(cv.content.length / 1024).toFixed(1)} KB` : "0 KB"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded border border-black bg-[#FFF275] text-black uppercase">
                        Khả dụng
                      </span>
                      <button
                        onClick={() => setPage('cv-list')}
                        className="p-2 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-[1px_1px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                        title="Xem chi tiết"
                      >
                        <ArrowUpRight size={15} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border-2 border-dashed border-zinc-300 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#FF4B2B] border-2 border-black flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#000]">
                  <Folder size={22} strokeWidth={2.5} />
                </div>
                <h4 className="text-xs font-black text-black uppercase">Chưa có hồ sơ nào</h4>
                <p className="text-xs text-zinc-500 font-semibold mt-1 max-w-sm mx-auto">
                  Hãy bắt đầu tải lên hoặc tạo một hồ sơ chuyên nghiệp đầu tiên của bạn.
                </p>
                <button
                  onClick={() => setPage('upload')}
                  className="mt-4 px-4 py-2 bg-[#FF5E5B] hover:bg-[#FF4B2B] text-black border-2 border-black rounded-xl text-xs font-bold shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-1.5 uppercase"
                >
                  <Icons8Plus size={14} />
                  Tạo CV ngay
                </button>
              </div>
            )}
          </div>

          {/* Quick Access Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setPage('upload')}
              className="p-4 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer group flex items-start gap-3.5"
            >
              <div className="p-2.5 rounded-lg bg-[#FF5E5B] text-black border-2 border-black shrink-0 shadow-[1px_1px_0px_#000]">
                <Icons8Plus size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-black group-hover:text-[#FF4B2B] transition-colors uppercase">
                  Tạo mới & Khởi tạo CV
                </h4>
                <p className="text-[11px] text-zinc-600 font-semibold mt-1 leading-relaxed">
                  Trình soạn thảo trực quan với hỗ trợ phân tích từ khóa và tạo link bảo mật.
                </p>
              </div>
            </div>

            <div
              onClick={() => setPage('profile')}
              className="p-4 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer group flex items-start gap-3.5"
            >
              <div className="p-2.5 rounded-lg bg-black text-white border-2 border-black shrink-0 shadow-[1px_1px_0px_#000]">
                <Icons8Check size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-black group-hover:text-[#FF4B2B] transition-colors uppercase">
                  Kiểm tra hồ sơ cá nhân
                </h4>
                <p className="text-[11px] text-zinc-600 font-semibold mt-1 leading-relaxed">
                  Xem dung lượng đã cấp phát, phân quyền tài khoản và cấu hình tài khoản.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column (1 Col): Storage Status & Activity Trend */}
        <section className="space-y-6">
          {/* Storage Quota Card */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                <Icons8Database size={16} />
                Hạn mức lưu trữ
              </span>
              <span className="text-xs font-bold text-black bg-yellow-100 border border-black px-2 py-0.5 rounded">
                {sizeDisplay} / 10 MB
              </span>
            </div>

            <div className="w-full bg-zinc-100 border-2 border-black h-3 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] transition-all duration-500"
                style={{ width: `${Math.max(storageQuotaPercent, 3)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-600 pt-3 border-t-2 border-black">
              <span className="flex items-center gap-1">
                <Icons8CloudStorage size={15} /> Đám mây cá nhân
              </span>
              <span className="text-black bg-[#FFF275] border border-black px-1.5 py-0.2 rounded text-[10px] font-black uppercase">
                AES-256 Chuẩn
              </span>
            </div>
          </div>

          {/* Activity / Upload Chart */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
              <div>
                <h4 className="text-xs font-black text-black uppercase">TẦN SUẤT LƯU TRỮ</h4>
                <p className="text-[11px] text-zinc-500 font-semibold mt-0.5">Số lượng CV lưu mới theo tháng</p>
              </div>
              <span className="text-[10px] font-black text-white bg-black px-2 py-0.5 rounded border border-black">
                2026
              </span>
            </div>

            <div className="w-full h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendChartData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF416C" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#FF4B2B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#000000', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#000000', fontWeight: 'bold' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      boxShadow: '3px 3px 0px #FF5E5B',
                      padding: '6px 10px',
                    }}
                    cursor={{ stroke: '#000000', strokeWidth: 1.5, strokeDasharray: '3 3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="uploads"
                    name="Số CV"
                    stroke="#FF4B2B"
                    strokeWidth={2.5}
                    fill="url(#chartGradient)"
                    dot={{ stroke: '#000000', strokeWidth: 2, r: 3, fill: '#FF5E5B' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardContent;
