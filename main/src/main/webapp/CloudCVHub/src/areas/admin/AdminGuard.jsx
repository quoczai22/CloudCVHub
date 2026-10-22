import Icon from "../../components/UI/Icon"
import Button from "../../components/UI/Button"

export default function AdminGuard({ user, onNavigate, onElevateToAdmin, children }) {
  const isAdmin = user?.role === "ADMIN"

  if (!isAdmin) {
    return (
      <div className="artboard app-screen p-8 font-mono text-center flex flex-col items-center justify-center min-h-[500px] bg-[#fbf6ea]">
        <div className="border-3 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] max-w-lg w-full text-left">
          <div className="flex items-center gap-3 border-b-2 border-black pb-4 mb-5">
            <div className="w-10 h-10 bg-[#ff416c] text-white flex items-center justify-center font-bold text-xl border-2 border-black shadow-[2px_2px_0_#000]">
              !
            </div>
            <div>
              <div className="text-xs font-bold text-[#ff416c] uppercase tracking-wider">// 403 ACCESS DENIED</div>
              <h3 className="text-lg font-bold text-black m-0">KHU VỰC GIỚI HẠN: ADMIN AREA</h3>
            </div>
          </div>

          <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
            Tài khoản hiện tại của bạn (<b>{user?.fullName || "Người dùng"}</b> — Quyền: <code>{user?.role || "GUEST"}</code>) không có quyền <b>ADMIN</b> để truy cập vào Phân vùng quản trị hệ thống.
          </p>

          <div className="bg-[#f5f5f5] border-2 border-black p-3 mb-6 text-xs text-neutral-600">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="shield" size={14} />
              <b>CHÍNH SÁCH BẢO MẬT:</b>
            </div>
            Yêu cầu Token xác thực với đặc quyền <code>ROLE_ADMIN</code>. Mọi cố gắng truy cập trái phép đều được ghi nhận vào Audit Log.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="yellow"
              onClick={() => onNavigate?.("overview")}
              className="flex-1"
            >
              ← VỀ KHÔNG GIAN CV
            </Button>
            {onElevateToAdmin && (
              <Button
                variant="light"
                onClick={onElevateToAdmin}
                className="flex-1 text-xs"
                title="Dành cho kiểm thử giao diện trong môi trường phát triển"
              >
                CẤP QUYỀN ADMIN (DEMO)
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return children
}
