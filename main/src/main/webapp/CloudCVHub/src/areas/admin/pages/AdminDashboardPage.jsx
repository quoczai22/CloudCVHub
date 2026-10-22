import Icon from '../../../components/UI/Icon'
import Kicker from '../../../components/UI/Kicker'
import Button from '../../../components/UI/Button'
import { adminSystemStats } from '../adminConfig'

export default function AdminDashboardPage({ onNavigate }) {
  const metrics = [
    { label: "TỔNG NGƯỜI DÙNG", value: "1,482", diff: "+14.2%", icon: "user", color: "#fbca1f" },
    { label: "CV TRÊN HỆ THỐNG", value: "3,891", diff: "+28.5%", icon: "file", color: "#60a5fa" },
    { label: "DUNG LƯỢNG LƯU TRỮ", value: "8.42 GB", diff: "S3 Active", icon: "cloud", color: "#a78bfa" },
    { label: "CẢNH BÁO / CẦN DUYỆT", value: "07 FILE", diff: "Ưu tiên cao", icon: "shield", color: "#ff416c" },
  ]

  const recentEvents = [
    { time: "01:42", type: "SECURITY", desc: "Phát hiện đăng nhập lạ từ IP 118.69.182.44 (Đã chặn)", badge: "BLOCKED", color: "#ff416c" },
    { time: "01:28", type: "CV_UPLOAD", desc: "User 'nguyenvana' tải lên CV_TechLead_2026.pdf (3.4 MB)", badge: "SCAN_OK", color: "#00cc66" },
    { time: "00:55", type: "UPGRADE", desc: "Tài khoản 'lehoangnam' đã nâng cấp lên gói PRO", badge: "BILLING", color: "#fbca1f" },
    { time: "00:12", type: "SYSTEM", desc: "Tự động sao lưu database PostgreSQL snapshot hoàn tất", badge: "BACKUP", color: "#60a5fa" },
  ]

  return (
    <div className="flex flex-col gap-6 font-mono">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <Kicker>AREA: ADMIN / SYSTEM METRICS</Kicker>
          <h2 className="text-2xl md:text-3xl font-black text-black m-0 tracking-tight">
            TỔNG QUAN HỆ THỐNG MÁY CHỦ<span>.</span>
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Giám sát tài nguyên, lưu lượng người dùng và an toàn dữ liệu CloudCVHub.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="yellow"
            icon="shield"
            onClick={() => onNavigate?.("admin-cvs")}
          >
            KIỂM DUYỆT CV
          </Button>
          <Button
            variant="light"
            icon="user"
            onClick={() => onNavigate?.("admin-users")}
          >
            DS NGƯỜI DÙNG
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="border-2 border-black bg-white p-4 shadow-[4px_4px_0_#000] relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-neutral-600">{m.label}</span>
              <div
                className="w-8 h-8 border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]"
                style={{ backgroundColor: m.color }}
              >
                <Icon name={m.icon} size={16} />
              </div>
            </div>
            <div className="text-2xl font-black text-black tracking-tight">{m.value}</div>
            <div className="text-[11px] text-neutral-500 mt-2 font-bold flex items-center gap-1">
              <span className="text-[#008744]">●</span> {m.diff}
            </div>
          </div>
        ))}
      </div>

      {/* Cluster Health & Server Spec */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Spec Details */}
        <div className="lg:col-span-1 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
            <Icon name="grid" size={18} />
            <h3 className="text-sm font-black m-0">THÔNG TIN MÁY CHỦ</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Phiên bản:</span>
              <span className="font-bold">{adminSystemStats.version}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Trạng thái:</span>
              <span className="px-1.5 py-0.5 bg-[#e8fdf0] text-[#008744] font-bold border border-black">
                {adminSystemStats.status}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Uptime:</span>
              <span className="font-bold text-[#008744]">{adminSystemStats.uptime}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-200">
              <span className="text-neutral-500">Khu vực Server:</span>
              <span className="font-bold">{adminSystemStats.serverRegion}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-500">Database Engine:</span>
              <span className="font-bold text-[11px]">{adminSystemStats.databaseEngine}</span>
            </div>
          </div>

          <div className="mt-5 p-3 bg-[#f5f5f5] border-2 border-black text-[11px]">
            <div className="font-bold mb-1">// TẢI MÁY CHỦ HIỆN TẠI</div>
            <div className="space-y-2 mt-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span>CPU (4 Cores):</span>
                  <b>24%</b>
                </div>
                <div className="w-full bg-neutral-200 h-2 border border-black">
                  <div className="bg-[#fbca1f] h-full" style={{ width: "24%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>RAM (52% / 8GB):</span>
                  <b>4.16 GB</b>
                </div>
                <div className="w-full bg-neutral-200 h-2 border border-black">
                  <div className="bg-[#ff416c] h-full" style={{ width: "52%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Security & System Events */}
        <div className="lg:col-span-2 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#000]">
          <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="shield" size={18} />
              <h3 className="text-sm font-black m-0">SỰ KIỆN HỆ THỐNG MỚI NHẤT (AUDIT STREAM)</h3>
            </div>
            <span className="text-[10px] text-neutral-500">REALTIME</span>
          </div>

          <div className="space-y-3">
            {recentEvents.map((evt, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 p-3 border-2 border-black bg-[#fafafa] hover:bg-[#fff9db] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold border border-black bg-white shadow-[1px_1px_0_#000]">
                    {evt.time}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-black">{evt.desc}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">Loại sự kiện: {evt.type}</div>
                  </div>
                </div>

                <span
                  className="text-[10px] font-bold px-2 py-0.5 border border-black shadow-[1px_1px_0_#000]"
                  style={{ backgroundColor: evt.color, color: evt.color === "#fbca1f" ? "#000" : "#fff" }}
                >
                  {evt.badge}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-black flex justify-between items-center text-xs">
            <span className="text-neutral-500">Đang hiển thị 4 sự kiện gần nhất</span>
            <button
              onClick={() => onNavigate?.("admin-logs")}
              className="font-bold underline hover:text-[#ff416c]"
            >
              Xem toàn bộ Audit Log →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
