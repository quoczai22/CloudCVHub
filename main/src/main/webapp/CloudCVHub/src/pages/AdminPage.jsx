import Icon from '../components/UI/Icon'
import Kicker from '../components/UI/Kicker'
import Button from '../components/UI/Button'
import AppShell from '../layouts/AppShell'

export default function AdminPage({
  mode,
  ...props
}) {
  const users = [
    ["Nguyễn Minh Anh", "minhanh@cloudcvhub.vn", "PRO", "12 CV", "HOẠT ĐỘNG"],
    ["Trần Thùy Dương", "duong.tran@pixel.vn", "TEAM", "08 CV", "HOẠT ĐỘNG"],
    ["Lê Hoàng Nam", "nam.le@freelance.vn", "FREE", "03 CV", "TẠM KHÓA"],
    ["Phạm Gia Hân", "han.pham@studio.vn", "PRO", "17 CV", "HOẠT ĐỘNG"],
  ]
  const docs = [
    [
      "CV Product Designer 2025",
      "Nguyễn Minh Anh",
      "2.8 MB",
      "184 lượt xem",
      "AN TOÀN",
    ],
    [
      "Design Lead Portfolio",
      "Trần Thùy Dương",
      "4.1 MB",
      "92 lượt xem",
      "AN TOÀN",
    ],
    [
      "CV Marketing Manager",
      "Lê Hoàng Nam",
      "1.9 MB",
      "31 lượt xem",
      "CẦN DUYỆT",
    ],
    [
      "Product Owner — Fintech",
      "Phạm Gia Hân",
      "3.4 MB",
      "126 lượt xem",
      "AN TOÀN",
    ],
  ]
  const rows = mode === "users" ? users : docs
  const page = mode === "users" ? "admin-users" : "admin-cvs"
  return (
    <AppShell {...props} page={page}>
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>ADMIN CLEARANCE / LEVEL 04</Kicker>
            <h2>
              {mode === "users" ? "Quản lý người dùng" : "Quản lý CV"}
              <span>.</span>
            </h2>
            <p>
              {mode === "users"
                ? "Quản trị tài khoản, gói dịch vụ và trạng thái truy cập."
                : "Giám sát tài liệu, dung lượng và các cảnh báo bảo mật."}
            </p>
          </div>
          <Button icon={mode === "users" ? "plus" : "shield"}>
            {mode === "users" ? "THÊM NGƯỜI DÙNG" : "QUÉT TOÀN HỆ THỐNG"}
          </Button>
        </div>
        <div className="admin-banner">
          <Icon name="shield" />
          <span>
            <b>CHẾ ĐỘ QUẢN TRỊ ĐANG BẬT</b>
            <small>Mọi thao tác được ghi vào nhật ký kiểm toán.</small>
          </span>
          <code>ADMIN_8842</code>
        </div>
        <div className="neo-dashed-card group relative block">
          <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
          <div className="relative border-2 border-black bg-white transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 content-card admin-table shadow-[4px_4px_0_#000]">
            <div className="admin-head">
              <span>{mode === "users" ? "NGƯỜI DÙNG" : "TÀI LIỆU"}</span>
              <span>{mode === "users" ? "EMAIL" : "CHỦ SỞ HỮU"}</span>
              <span>{mode === "users" ? "GÓI" : "DUNG LƯỢNG"}</span>
              <span>{mode === "users" ? "TÀI NGUYÊN" : "TRUY CẬP"}</span>
              <span>TRẠNG THÁI</span>
            </div>
            {rows.map((row) => (
              <div className="admin-row" key={row[0]}>
                {row.map((cell, index) => (
                  <span
                    key={cell}
                    className={
                      index === 4
                        ? `status ${
                            cell === "HOẠT ĐỘNG" || cell === "AN TOÀN"
                              ? "live"
                              : "draft"
                          }`
                        : ""
                    }
                  >
                    {index === 0 ? <b>{cell}</b> : cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
