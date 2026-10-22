import { useState } from 'react'
import Icon from '../../../components/UI/Icon'
import Kicker from '../../../components/UI/Kicker'
import Button from '../../../components/UI/Button'

import ConfirmModal from '../../../components/UI/ConfirmModal'

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("ALL")
  const [pendingUser, setPendingUser] = useState(null)
  const [users, setUsers] = useState([
    { id: "USR-001", name: "Nguyễn Minh Anh", email: "minhanh@cloudcvhub.vn", plan: "PRO", cvs: 12, role: "USER", status: "HOẠT ĐỘNG" },
    { id: "USR-002", name: "Trần Thùy Dương", email: "duong.tran@pixel.vn", plan: "TEAM", cvs: 8, role: "USER", status: "HOẠT ĐỘNG" },
    { id: "USR-003", name: "Lê Hoàng Nam", email: "nam.le@freelance.vn", plan: "FREE", cvs: 3, role: "USER", status: "TẠM KHÓA" },
    { id: "USR-004", name: "Phạm Gia Hân", email: "han.pham@studio.vn", plan: "PRO", cvs: 17, role: "USER", status: "HOẠT ĐỘNG" },
    { id: "USR-005", name: "Vũ Tuấn Kiệt", email: "kiet.vu@enterprise.com", plan: "TEAM", cvs: 24, role: "ADMIN", status: "HOẠT ĐỘNG" },
    { id: "USR-006", name: "Đặng Thu Thảo", email: "thao.dang@techcorp.vn", plan: "FREE", cvs: 1, role: "USER", status: "HOẠT ĐỘNG" },
  ])

  const confirmToggleStatus = () => {
    if (!pendingUser) return
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === pendingUser.id) {
          const nextStatus = u.status === "HOẠT ĐỘNG" ? "TẠM KHÓA" : "HOẠT ĐỘNG"
          return { ...u, status: nextStatus }
        }
        return u
      })
    )
    setPendingUser(null)
  }

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRole = filterRole === "ALL" || u.plan === filterRole || u.role === filterRole
    return matchSearch && matchRole
  })

  return (
    <div className="flex flex-col gap-6 font-mono">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <Kicker>AREA: ADMIN / USER DIRECTORY</Kicker>
          <h2 className="text-2xl md:text-3xl font-black text-black m-0 tracking-tight">
            QUẢN LÝ NGƯỜI DÙNG<span>.</span>
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Quản trị tài khoản, cấp gói dịch vụ, phân quyền vai trò và khóa truy cập.
          </p>
        </div>

        <Button variant="yellow" icon="plus">
          THÊM TÀI KHOẢN MỚI
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3 border-2 border-black shadow-[4px_4px_0_#000]">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Tìm theo Tên, Email hoặc Mã User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-mono pl-8 pr-3 py-2 border-2 border-black focus:outline-none focus:bg-[#fef08a]"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon name="search" size={14} />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-600">LỌC GÓI:</span>
          {["ALL", "FREE", "PRO", "TEAM", "ADMIN"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterRole(f)}
              className={`px-2.5 py-1 text-xs font-bold border-2 border-black transition-all ${
                filterRole === f
                  ? "bg-[#fbca1f] text-black shadow-[2px_2px_0_#000] -translate-y-0.5"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Users Table */}
      <div className="border-2 border-black bg-white shadow-[6px_6px_0_#000] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-black text-white font-bold uppercase tracking-wider border-b-2 border-black">
              <th className="p-3 border-r border-neutral-700">MÃ USER</th>
              <th className="p-3 border-r border-neutral-700">HỌ & TÊN</th>
              <th className="p-3 border-r border-neutral-700">EMAIL</th>
              <th className="p-3 border-r border-neutral-700 text-center">GÓI</th>
              <th className="p-3 border-r border-neutral-700 text-center">SỐ CV</th>
              <th className="p-3 border-r border-neutral-700 text-center">VAI TRÒ</th>
              <th className="p-3 border-r border-neutral-700 text-center">TRẠNG THÁI</th>
              <th className="p-3 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-neutral-500 font-bold">
                  Không tìm thấy người dùng phù hợp với bộ lọc!
                </td>
              </tr>
            ) : (
              filteredUsers.map((u, i) => (
                <tr
                  key={u.id}
                  className={`border-b border-black hover:bg-[#fff9db] transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                  }`}
                >
                  <td className="p-3 font-bold border-r border-neutral-200">{u.id}</td>
                  <td className="p-3 font-black text-black border-r border-neutral-200">{u.name}</td>
                  <td className="p-3 text-neutral-600 border-r border-neutral-200">{u.email}</td>
                  <td className="p-3 text-center border-r border-neutral-200">
                    <span className="px-2 py-0.5 font-bold border border-black bg-[#fef08a] shadow-[1px_1px_0_#000]">
                      {u.plan}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold border-r border-neutral-200">{u.cvs} CV</td>
                  <td className="p-3 text-center border-r border-neutral-200">
                    <span
                      className={`px-2 py-0.5 font-bold text-[10px] border border-black ${
                        u.role === "ADMIN" ? "bg-[#ff416c] text-white" : "bg-neutral-100 text-black"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center border-r border-neutral-200">
                    <span
                      className={`inline-block px-2 py-0.5 font-bold text-[10px] border border-black shadow-[1px_1px_0_#000] ${
                        u.status === "HOẠT ĐỘNG" ? "bg-[#e8fdf0] text-[#008744]" : "bg-[#ffeaea] text-[#d93025]"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => setPendingUser(u)}
                      className={`px-2 py-1 text-[11px] font-bold border border-black shadow-[1px_1px_0_#000] transition-all hover:-translate-y-0.5 ${
                        u.status === "HOẠT ĐỘNG"
                          ? "bg-[#fff0f0] text-[#d93025] hover:bg-[#ff416c] hover:text-white"
                          : "bg-[#e8fdf0] text-[#008744] hover:bg-[#00cc66] hover:text-white"
                      }`}
                    >
                      {u.status === "HOẠT ĐỘNG" ? "Khóa nick" : "Mở khóa"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Hiển thị {filteredUsers.length} trên tổng số {users.length} tài khoản</span>
        <span className="font-bold">TRANG 1 / 1</span>
      </div>

      {/* Confirm Action Modal */}
      <ConfirmModal
        isOpen={Boolean(pendingUser)}
        title={pendingUser?.status === "HOẠT ĐỘNG" ? "Xác nhận khóa tài khoản" : "Mở khóa tài khoản"}
        message={
          pendingUser?.status === "HOẠT ĐỘNG"
            ? `Bạn có chắc muốn tạm khóa tài khoản của ${pendingUser?.name} (${pendingUser?.email})? Người dùng này sẽ bị đình chỉ quyền đăng nhập và tải tài liệu lên CloudCVHub.`
            : `Mở khóa và khôi phục toàn bộ quyền truy cập cho ${pendingUser?.name} (${pendingUser?.email})?`
        }
        confirmLabel={pendingUser?.status === "HOẠT ĐỘNG" ? "KHÓA TÀI KHOẢN" : "MỞ KHÓA"}
        confirmVariant={pendingUser?.status === "HOẠT ĐỘNG" ? "danger" : "yellow"}
        onConfirm={confirmToggleStatus}
        onCancel={() => setPendingUser(null)}
      />
    </div>
  )
}
