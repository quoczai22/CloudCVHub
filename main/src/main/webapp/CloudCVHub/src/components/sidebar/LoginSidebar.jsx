import { ShieldCheck, Layers, Share2, Cloud, Sparkles } from 'lucide-react';

function LoginSidebar() {
  return (
    <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-b from-blue-600 to-blue-700 text-white p-12 flex-col justify-between shrink-0 relative overflow-hidden select-none">
      {/* Brand Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shadow-xs">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <span className="text-white text-xl font-bold tracking-tight block leading-tight">CloudCVHub</span>
            <span className="text-blue-100 text-xs">Nền tảng quản lý hồ sơ đám mây</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight leading-snug mb-3">
          Hồ sơ của bạn, <br />
          sẵn sàng cho mọi cơ hội.
        </h2>
        <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
          Lưu trữ tập trung các phiên bản CV, theo dõi trạng thái ứng tuyển và tạo liên kết chia sẻ an toàn chỉ với một thao tác.
        </p>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 gap-3.5">
          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-2.5 mb-1">
              <Cloud size={16} className="text-blue-200" />
              <span className="text-xs font-semibold text-white">Lưu trữ đám mây tức thì</span>
            </div>
            <p className="text-[11px] text-blue-100/90 leading-relaxed">
              Truy cập hồ sơ từ bất kỳ đâu, hỗ trợ đồng bộ phiên bản và tạo link chia sẻ có thể xem trực tuyến.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
            <div className="flex items-center gap-2.5 mb-1">
              <ShieldCheck size={16} className="text-blue-200" />
              <span className="text-xs font-semibold text-white">Bảo mật thông tin</span>
            </div>
            <p className="text-[11px] text-blue-100/90 leading-relaxed">
              Mã hóa dữ liệu theo chuẩn AES-256, kiểm soát quyền truy cập và bảo vệ quyền riêng tư cá nhân.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Items / Footer */}
      <div className="space-y-3 relative z-10 pt-8 border-t border-white/15">
        {[
          { label: 'Bảo mật dữ liệu chuẩn mã hóa AES-256', icon: ShieldCheck },
          { label: 'Quản lý lịch sử và khôi phục đa phiên bản', icon: Layers },
          { label: 'Chia sẻ bảo mật có kiểm soát', icon: Share2 },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-xs text-blue-100">
              <div className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center shrink-0 text-white">
                <Icon size={12} />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LoginSidebar;
