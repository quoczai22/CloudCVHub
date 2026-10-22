import { useState } from 'react'
import Icon from '../../../components/UI/Icon'
import Kicker from '../../../components/UI/Kicker'
import Button from '../../../components/UI/Button'

export default function AdminLogsPage() {
  const [filterType, setFilterType] = useState("ALL")
  const logs = [
    { id: "LOG-9921", time: "2026-10-23 01:42:10", ip: "118.69.182.44", user: "GUEST_UNKNOWN", action: "AUTH_LOGIN_FAILED", status: "BLOCKED", detail: "Nhập sai mật khẩu 5 lần liên tiếp" },
    { id: "LOG-9920", time: "2026-10-23 01:28:44", ip: "14.232.208.19", user: "nguyenvana", action: "CV_UPLOAD", status: "SUCCESS", detail: "Upload file CV_TechLead_2026.pdf (3.4 MB)" },
    { id: "LOG-9919", time: "2026-10-23 00:55:12", ip: "125.235.239.8", user: "lehoangnam", action: "SUBSCRIPTION_CHANGE", status: "SUCCESS", detail: "Nâng cấp gói tài khoản sang PRO (VNPAY)" },
    { id: "LOG-9918", time: "2026-10-23 00:12:00", ip: "127.0.0.1 (INTERNAL)", user: "CRON_DAEMON", action: "DB_BACKUP", status: "SUCCESS", detail: "Sao lưu snapshot cơ sở dữ liệu hàng ngày (PostgreSQL)" },
    { id: "LOG-9917", time: "2026-10-22 23:30:15", ip: "27.72.102.88", user: "admin_root", action: "ADMIN_UPDATE_ROLE", status: "SUCCESS", detail: "Cấp quyền ROLE_ADMIN cho người dùng kiet.vu" },
    { id: "LOG-9916", time: "2026-10-22 22:15:02", ip: "113.161.72.90", user: "duong.tran", action: "SHARE_LINK_CREATE", status: "SUCCESS", detail: "Tạo link chia sẻ công khai có mật khẩu bảo vệ" },
  ]

  const filteredLogs = logs.filter((l) => filterType === "ALL" || l.action.includes(filterType) || l.status === filterType)

  return (
    <div className="flex flex-col gap-6 font-mono">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <Kicker>AREA: ADMIN / AUDIT & SECURITY TRAIL</Kicker>
          <h2 className="text-2xl md:text-3xl font-black text-black m-0 tracking-tight">
            NHẬT KÝ KIỂM TOÁN HỆ THỐNG<span>.</span>
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Ghi nhận toàn bộ thao tác nhạy cảm, truy cập đăng nhập và biến động dữ liệu.
          </p>
        </div>

        <Button variant="yellow" icon="upload">
          XUẤT FILE LOG (CSV)
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-3 border-2 border-black shadow-[4px_4px_0_#000] text-xs">
        <span className="font-bold text-neutral-600">LỌC NHẬT KÝ:</span>
        {["ALL", "SUCCESS", "BLOCKED", "AUTH", "CV"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3 py-1 font-bold border-2 border-black transition-all ${
              filterType === f
                ? "bg-[#fbca1f] text-black shadow-[2px_2px_0_#000] -translate-y-0.5"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <div className="border-2 border-black bg-white shadow-[6px_6px_0_#000] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-black text-white font-bold uppercase tracking-wider border-b-2 border-black">
              <th className="p-3 border-r border-neutral-700">MÃ LOG</th>
              <th className="p-3 border-r border-neutral-700">THỜI GIAN</th>
              <th className="p-3 border-r border-neutral-700">IP ADDRESS</th>
              <th className="p-3 border-r border-neutral-700">TÀI KHOẢN</th>
              <th className="p-3 border-r border-neutral-700">HÀNH ĐỘNG</th>
              <th className="p-3 border-r border-neutral-700 text-center">KẾT QUẢ</th>
              <th className="p-3">CHI TIẾT THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((l, i) => (
              <tr
                key={l.id}
                className={`border-b border-black hover:bg-[#fff9db] transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                }`}
              >
                <td className="p-3 font-bold border-r border-neutral-200">{l.id}</td>
                <td className="p-3 text-neutral-600 border-r border-neutral-200">{l.time}</td>
                <td className="p-3 border-r border-neutral-200"><code>{l.ip}</code></td>
                <td className="p-3 font-bold text-black border-r border-neutral-200">{l.user}</td>
                <td className="p-3 border-r border-neutral-200">
                  <span className="px-1.5 py-0.5 border border-black bg-neutral-100 font-bold text-[10px]">
                    {l.action}
                  </span>
                </td>
                <td className="p-3 text-center border-r border-neutral-200">
                  <span
                    className={`inline-block px-2 py-0.5 font-bold text-[10px] border border-black shadow-[1px_1px_0_#000] ${
                      l.status === "SUCCESS"
                        ? "bg-[#e8fdf0] text-[#008744]"
                        : "bg-[#ffeaea] text-[#d93025]"
                    }`}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="p-3 text-neutral-700">{l.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
