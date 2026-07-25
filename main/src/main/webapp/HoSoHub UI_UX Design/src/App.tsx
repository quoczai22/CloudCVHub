import { useState, useRef } from 'react'
import {
  FileText, Upload, Download, Share2, Trash2, Edit3, Search, Filter,
  ChevronDown, ChevronRight, Bell, Settings, LogOut, User, Shield,
  Cloud, Lock, Menu, X, Check, AlertCircle, Clock, Eye, Copy,
  BarChart2, HardDrive, Link2, Star, Plus, ArrowRight, GitBranch,
  LayoutDashboard, Folder, UserCircle, ChevronLeft, MoreHorizontal,
  Globe, Cpu, Database, Activity, RefreshCw, Home, Info, Zap,
  TrendingUp, Calendar, Tag, File, CheckCircle2, XCircle, ChevronUp,
  ExternalLink, Moon, Sun
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Cell
} from 'recharts'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Page =
  | 'landing' | 'login' | 'register' | 'dashboard'
  | 'cv-list' | 'upload' | 'cv-detail' | 'profile'
  | 'admin' | 'not-found'

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────
const uploadData = [
  { month: 'T1', uploads: 4 }, { month: 'T2', uploads: 7 },
  { month: 'T3', uploads: 5 }, { month: 'T4', uploads: 12 },
  { month: 'T5', uploads: 9 }, { month: 'T6', uploads: 15 },
  { month: 'T7', uploads: 11 }, { month: 'T8', uploads: 18 },
  { month: 'T9', uploads: 14 }, { month: 'T10', uploads: 22 },
  { month: 'T11', uploads: 19 }, { month: 'T12', uploads: 27 },
]

const activityData = [
  { time: '2 phút trước', action: 'Tải lên', file: 'CV_Frontend_Dev_v3.pdf', icon: Upload, color: '#2563EB' },
  { time: '1 giờ trước', action: 'Chia sẻ', file: 'CV_Fullstack_2025.pdf', icon: Share2, color: '#22C55E' },
  { time: '3 giờ trước', action: 'Chỉnh sửa', file: 'CV_ReactJS_Senior.pdf', icon: Edit3, color: '#F59E0B' },
  { time: 'Hôm qua', action: 'Tải xuống', file: 'CV_Backend_NodeJS.pdf', icon: Download, color: '#8B5CF6' },
  { time: '2 ngày trước', action: 'Xóa', file: 'CV_Draft_Old.pdf', icon: Trash2, color: '#EF4444' },
]

const cvList = [
  { id: 1, name: 'CV Frontend Developer', version: 'v3.2', updated: '22/07/2025', size: '245 KB', status: 'active', views: 128, shares: 14 },
  { id: 2, name: 'CV Fullstack Engineer 2025', version: 'v2.0', updated: '20/07/2025', size: '312 KB', status: 'active', views: 89, shares: 7 },
  { id: 3, name: 'CV React Senior', version: 'v1.5', updated: '18/07/2025', size: '198 KB', status: 'draft', views: 45, shares: 3 },
  { id: 4, name: 'CV Backend NodeJS', version: 'v4.1', updated: '15/07/2025', size: '287 KB', status: 'active', views: 203, shares: 22 },
  { id: 5, name: 'CV Data Engineer', version: 'v1.0', updated: '10/07/2025', size: '156 KB', status: 'archived', views: 12, shares: 1 },
  { id: 6, name: 'CV DevOps Specialist', version: 'v2.3', updated: '05/07/2025', size: '221 KB', status: 'active', views: 67, shares: 9 },
]

const userList = [
  { id: 1, name: 'Nguyễn Minh Khoa', email: 'khoa.nm@gmail.com', plan: 'Pro', cvCount: 12, joined: '01/06/2025', status: 'active' },
  { id: 2, name: 'Trần Thị Linh', email: 'linh.tt@outlook.com', plan: 'Free', cvCount: 3, joined: '15/06/2025', status: 'active' },
  { id: 3, name: 'Phạm Đức Anh', email: 'duc.anh@proton.me', plan: 'Pro', cvCount: 8, joined: '22/06/2025', status: 'suspended' },
  { id: 4, name: 'Lê Hoàng Nam', email: 'nam.lh@gmail.com', plan: 'Enterprise', cvCount: 34, joined: '28/06/2025', status: 'active' },
  { id: 5, name: 'Vũ Thu Trang', email: 'trang.vt@gmail.com', plan: 'Free', cvCount: 1, joined: '10/07/2025', status: 'active' },
]

const storageData = [
  { name: 'PDF', value: 68, fill: '#2563EB' },
  { name: 'DOCX', value: 21, fill: '#22C55E' },
  { name: 'Khác', value: 11, fill: '#F59E0B' },
]

const systemHealth = [
  { time: '00:00', cpu: 23, mem: 45 }, { time: '04:00', cpu: 18, mem: 42 },
  { time: '08:00', cpu: 56, mem: 61 }, { time: '12:00', cpu: 78, mem: 74 },
  { time: '16:00', cpu: 65, mem: 69 }, { time: '20:00', cpu: 42, mem: 58 },
  { time: 'Now', cpu: 38, mem: 55 },
]

const versionHistory = [
  { version: 'v3.2', date: '22/07/2025', size: '245 KB', changes: 'Cập nhật kinh nghiệm React 18, thêm dự án mới' },
  { version: 'v3.1', date: '15/07/2025', size: '238 KB', changes: 'Bổ sung kỹ năng TypeScript, Tailwind CSS' },
  { version: 'v3.0', date: '01/07/2025', size: '231 KB', changes: 'Thiết kế lại layout, cập nhật thông tin liên hệ' },
  { version: 'v2.5', date: '15/06/2025', size: '218 KB', changes: 'Thêm phần chứng chỉ AWS, dự án open-source' },
]

const auditLogs = [
  { time: '22/07 14:32', user: 'khoa.nm@gmail.com', action: 'LOGIN', detail: 'Đăng nhập thành công từ 192.168.1.1', level: 'info' },
  { time: '22/07 13:18', user: 'linh.tt@outlook.com', action: 'UPLOAD', detail: 'Tải lên CV_Fresher_2025.pdf (198 KB)', level: 'info' },
  { time: '22/07 12:05', user: 'duc.anh@proton.me', action: 'FAILED_LOGIN', detail: 'Đăng nhập thất bại - sai mật khẩu', level: 'warn' },
  { time: '22/07 10:44', user: 'admin@hosohub.vn', action: 'SUSPEND', detail: 'Tạm khóa tài khoản duc.anh@proton.me', level: 'error' },
  { time: '22/07 09:21', user: 'nam.lh@gmail.com', action: 'SHARE', detail: 'Chia sẻ CV_Senior_Engineer.pdf', level: 'info' },
]

const faqs = [
  { q: 'HoSoHub lưu trữ CV của tôi ở đâu?', a: 'Tất cả CV được mã hóa AES-256 và lưu trữ trên hạ tầng cloud đa vùng, đảm bảo an toàn và có sẵn 99.9% thời gian.' },
  { q: 'Tôi có thể lưu bao nhiêu CV miễn phí?', a: 'Gói Free cho phép lưu tối đa 3 CV với dung lượng 100MB. Nâng cấp lên Pro để lưu không giới hạn.' },
  { q: 'Làm sao để chia sẻ CV với nhà tuyển dụng?', a: 'Mỗi CV có link chia sẻ riêng, bảo vệ bằng mật khẩu hoặc giới hạn thời gian truy cập.' },
  { q: 'Dữ liệu của tôi có được bảo mật không?', a: 'Tuyệt đối. Chúng tôi tuân thủ GDPR, không bán dữ liệu cho bên thứ ba và hỗ trợ 2FA.' },
  { q: 'Có thể xuất CV sang định dạng nào?', a: 'Hỗ trợ PDF, DOCX và link preview trực tiếp. Định dạng gốc được giữ nguyên.' },
]

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'bg-green-50 text-green-700 border border-green-200',
    draft: 'bg-amber-50 text-amber-700 border border-amber-200',
    archived: 'bg-slate-100 text-slate-500 border border-slate-200',
    suspended: 'bg-red-50 text-red-700 border border-red-200',
    Pro: 'bg-blue-50 text-blue-700 border border-blue-200',
    Free: 'bg-slate-100 text-slate-600 border border-slate-200',
    Enterprise: 'bg-purple-50 text-purple-700 border border-purple-200',
    info: 'bg-blue-50 text-blue-700',
    warn: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-700',
  }
  const labels: Record<string, string> = {
    active: 'Hoạt động', draft: 'Nháp', archived: 'Lưu trữ', suspended: 'Bị khóa'
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status] || 'bg-slate-100 text-slate-600'}`}>
      {labels[status] || status}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ComponentType<{ size?: number; className?: string }>, label: string, value: string, sub: string, color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        <TrendingUp size={14} className="text-green-500 mt-1" />
      </div>
      <div className="text-2xl font-700 text-slate-900 mb-0.5">{value}</div>
      <div className="text-sm font-500 text-slate-700 mb-0.5">{label}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  )
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-sm'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-600 shrink-0`}>
      {initials}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR + TOPBAR
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar({ page, setPage, collapsed, setCollapsed }: {
  page: Page, setPage: (p: Page) => void, collapsed: boolean, setCollapsed: (v: boolean) => void
}) {
  const navItems = [
    { id: 'dashboard' as Page, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'cv-list' as Page, icon: Folder, label: 'Quản lý CV' },
    { id: 'upload' as Page, icon: Upload, label: 'Upload CV' },
    { id: 'profile' as Page, icon: UserCircle, label: 'Hồ sơ cá nhân' },
    { id: 'admin' as Page, icon: Shield, label: 'Admin' },
  ]

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-200 h-screen sticky top-0`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <FileText size={16} className="text-white" />
        </div>
        {!collapsed && <span className="font-700 text-slate-900 text-lg tracking-tight">HoSoHub</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {navItems.map(item => {
          const active = page === item.id
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-100">
        {collapsed ? (
          <button className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-2.5 p-2">
            <Avatar name="Nguyễn Minh Khoa" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-600 text-slate-800 truncate">Minh Khoa</div>
              <div className="text-xs text-slate-400">Pro Plan</div>
            </div>
            <button
              onClick={() => setPage('landing')}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

function Topbar({ title, subtitle, setPage }: { title: string; subtitle?: string; setPage: (p: Page) => void }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-10">
      <div className="flex-1">
        <h1 className="font-700 text-slate-900 text-base">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
          <Settings size={18} />
        </button>
        <button
          onClick={() => setPage('profile')}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <Avatar name="Nguyễn Minh Khoa" size="sm" />
          <span className="text-sm font-500 text-slate-700 hidden sm:block">Minh Khoa</span>
        </button>
      </div>
    </header>
  )
}

function AppShell({ page, setPage, children, title, subtitle }: {
  page: Page, setPage: (p: Page) => void, children: React.ReactNode, title: string, subtitle?: string
}) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} subtitle={subtitle} setPage={setPage} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 1 — LANDING
// ─────────────────────────────────────────────────────────────────────────────

function LandingPage({ setPage }: { setPage: (p: Page) => void }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = [
    { icon: Cloud, title: 'Lưu trữ đám mây', desc: 'CV được lưu trữ an toàn trên cloud, truy cập mọi lúc mọi nơi không giới hạn thiết bị.' },
    { icon: Lock, title: 'Bảo mật tuyệt đối', desc: 'Mã hóa AES-256, xác thực 2 lớp, kiểm soát quyền truy cập chi tiết cho từng CV.' },
    { icon: Share2, title: 'Chia sẻ thông minh', desc: 'Tạo link chia sẻ có thời hạn, bảo vệ bằng mật khẩu, theo dõi số lượt xem.' },
    { icon: FileText, title: 'Quản lý phiên bản', desc: 'Lưu nhiều phiên bản CV, so sánh thay đổi, khôi phục bất kỳ phiên bản nào.' },
    { icon: BarChart2, title: 'Phân tích chi tiết', desc: 'Theo dõi lượt xem, tải xuống, chia sẻ để hiểu được mức độ hiệu quả của CV.' },
    { icon: Zap, title: 'Nhanh & Nhẹ', desc: 'Upload, preview và tải CV trong vài giây. Hỗ trợ PDF, DOCX, và nhiều định dạng.' },
  ]

  const steps = [
    { step: '01', title: 'Tạo tài khoản', desc: 'Đăng ký miễn phí trong 30 giây với email hoặc tài khoản GitHub/Google.' },
    { step: '02', title: 'Upload CV', desc: 'Kéo thả hoặc chọn file PDF/DOCX. Đặt tên, tag và mô tả ngắn gọn.' },
    { step: '03', title: 'Quản lý & Chia sẻ', desc: 'Tổ chức CV theo phiên bản, chia sẻ link cho nhà tuyển dụng với một click.' },
  ]

  const techs = [
    { name: 'React', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { name: 'Node.js', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'PostgreSQL', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'AWS S3', color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Redis', color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Docker', color: 'text-blue-700', bg: 'bg-blue-50' },
  ]

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      {/* Navbar */}
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full flex items-center px-6 gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText size={15} className="text-white" />
            </div>
            <span className="font-700 text-slate-900 text-lg tracking-tight">HoSoHub</span>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-8">
            {['Tính năng', 'Quy trình', 'Bảng giá', 'FAQ'].map(item => (
              <a key={item} href="#" className="text-sm text-slate-600 hover:text-slate-900 font-500 transition-colors">{item}</a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setPage('login')}
              className="hidden md:block text-sm font-500 text-slate-700 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setPage('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-600 px-4 py-2 rounded-xl transition-colors"
            >
              Bắt đầu ngay
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-slate-600">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {['Tính năng', 'Quy trình', 'Bảng giá', 'FAQ'].map(item => (
              <a key={item} href="#" className="block text-sm text-slate-600 py-1 font-500">{item}</a>
            ))}
            <button onClick={() => setPage('login')} className="block w-full text-left text-sm text-slate-700 py-1 font-500">Đăng nhập</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-600 px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <Zap size={12} />
              Mới — Tích hợp AI Review CV
            </div>
            <h1 className="text-4xl lg:text-5xl font-800 text-slate-900 leading-[1.15] mb-5">
              Quản lý hồ sơ<br />
              <span className="text-blue-600">thông minh</span> trên Cloud
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md">
              Lưu trữ, phiên bản hóa và chia sẻ CV một cách an toàn. Được thiết kế cho sinh viên, lập trình viên và người tìm việc chuyên nghiệp.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setPage('register')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-600 px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-200"
              >
                Bắt đầu miễn phí <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setPage('dashboard')}
                className="border border-gray-200 hover:border-gray-300 text-slate-700 font-500 px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:bg-slate-50"
              >
                <Eye size={16} /> Xem Demo
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-100">
              <div><span className="text-2xl font-700 text-slate-900">2.4K+</span><p className="text-xs text-slate-400 mt-0.5">Người dùng</p></div>
              <div className="w-px h-8 bg-gray-100" />
              <div><span className="text-2xl font-700 text-slate-900">18K+</span><p className="text-xs text-slate-400 mt-0.5">CV đã lưu</p></div>
              <div className="w-px h-8 bg-gray-100" />
              <div><span className="text-2xl font-700 text-slate-900">99.9%</span><p className="text-xs text-slate-400 mt-0.5">Uptime</p></div>
            </div>
          </div>

          {/* Cloud Illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl p-8 border border-gray-100">
              {/* Central cloud */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <Cloud size={36} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Floating CV cards */}
              <div className="space-y-3">
                {[
                  { name: 'CV_Frontend_Dev.pdf', size: '245 KB', color: 'border-blue-200 bg-blue-50' },
                  { name: 'CV_Fullstack_2025.pdf', size: '312 KB', color: 'border-green-200 bg-green-50' },
                  { name: 'CV_Backend_NodeJS.pdf', size: '198 KB', color: 'border-purple-200 bg-purple-50' },
                ].map((file, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${file.color} bg-white shadow-sm`}>
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText size={14} className="text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-600 text-slate-800 truncate">{file.name}</div>
                      <div className="text-xs text-slate-400">{file.size}</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Download size={10} className="text-slate-500" />
                      </div>
                      <div className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Share2 size={10} className="text-slate-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[{ label: 'Tổng CV', val: '12' }, { label: 'Đã chia sẻ', val: '47' }, { label: 'Lưu trữ', val: '1.2 GB' }].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-2.5 text-center border border-gray-100">
                    <div className="text-sm font-700 text-slate-900">{s.val}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-3 -left-3 bg-white shadow-lg border border-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-600 text-slate-700">Synced to Cloud</span>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white shadow-lg border border-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
              <Lock size={12} className="text-blue-600" />
              <span className="text-xs font-600 text-slate-700">AES-256 Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-700 text-blue-600 tracking-widest uppercase mb-3">Tính năng</div>
            <h2 className="text-3xl font-700 text-slate-900 mb-4">Mọi thứ bạn cần cho hồ sơ</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Từ lưu trữ đến chia sẻ, HoSoHub cung cấp bộ công cụ hoàn chỉnh để quản lý CV chuyên nghiệp.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                  <f.icon size={18} className="text-blue-600" />
                </div>
                <h3 className="font-600 text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-700 text-blue-600 tracking-widest uppercase mb-3">Quy trình</div>
          <h2 className="text-3xl font-700 text-slate-900">Bắt đầu trong 3 bước đơn giản</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-100 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-800 text-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-200">
                  {s.step}
                </div>
                <h3 className="font-700 text-slate-900 mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-slate-50 py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm text-slate-400 font-500 mb-6">Xây dựng trên nền tảng công nghệ đáng tin cậy</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((t, i) => (
              <span key={i} className={`${t.bg} ${t.color} text-sm font-600 px-4 py-2 rounded-xl border border-current/10`}>
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-xs font-700 text-blue-600 tracking-widest uppercase mb-3">FAQ</div>
          <h2 className="text-3xl font-700 text-slate-900">Câu hỏi thường gặp</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-600 text-slate-900 text-sm">{faq.q}</span>
                {openFaq === i ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-slate-500 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-700 mb-3">Sẵn sàng quản lý CV chuyên nghiệp?</h2>
          <p className="text-blue-100 mb-6">Miễn phí mãi mãi cho 3 CV đầu tiên. Không cần thẻ tín dụng.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setPage('register')}
              className="bg-white text-blue-600 font-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Bắt đầu ngay <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setPage('login')}
              className="border border-blue-400 text-white font-500 px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <FileText size={13} className="text-white" />
                </div>
                <span className="font-700 text-slate-900">HoSoHub</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Nền tảng quản lý hồ sơ xin việc thông minh cho người Việt.</p>
            </div>
            {[
              { title: 'Sản phẩm', links: ['Tính năng', 'Bảng giá', 'Changelog', 'Roadmap'] },
              { title: 'Hỗ trợ', links: ['Tài liệu', 'Blog', 'Cộng đồng', 'Liên hệ'] },
              { title: 'Pháp lý', links: ['Điều khoản', 'Bảo mật', 'Cookie', 'GDPR'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-700 text-slate-900 uppercase tracking-wider mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">© 2025 HoSoHub. All rights reserved.</p>
            <div className="flex gap-3">
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">GitHub</a>
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Twitter</a>
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 2 — LOGIN
// ─────────────────────────────────────────────────────────────────────────────

function LoginPage({ setPage }: { setPage: (p: Page) => void }) {
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[480px] bg-blue-600 p-12 flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="font-700 text-white text-xl">HoSoHub</span>
          </div>
          <h2 className="text-3xl font-700 text-white leading-tight mb-4">
            Hồ sơ của bạn,<br />mọi lúc mọi nơi.
          </h2>
          <p className="text-blue-200 leading-relaxed text-sm">
            Lưu trữ và chia sẻ CV an toàn trên nền tảng Cloud. Tiếp cận từ bất kỳ thiết bị nào.
          </p>
        </div>
        <div className="space-y-3">
          {[
            'Mã hóa AES-256',
            'Quản lý đa phiên bản',
            'Chia sẻ có kiểm soát',
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Check size={11} className="text-white" />
              </div>
              <span className="text-sm text-blue-100">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button onClick={() => setPage('landing')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-8 transition-colors">
            <ChevronLeft size={16} /> Về trang chủ
          </button>
          <h1 className="text-2xl font-700 text-slate-900 mb-1">Chào mừng trở lại</h1>
          <p className="text-slate-500 text-sm mb-8">Đăng nhập vào tài khoản HoSoHub của bạn</p>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-2.5 text-sm font-500 text-slate-700 hover:bg-slate-50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-2.5 text-sm font-500 text-slate-700 hover:bg-slate-50 transition-colors">
              <GitBranch size={16} />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-slate-400">hoặc đăng nhập với email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${remember ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
                >
                  {remember && <Check size={10} className="text-white" />}
                </div>
                <span className="text-xs text-slate-600">Nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700 font-500">Quên mật khẩu?</a>
            </div>
            <button
              onClick={() => setPage('dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-600 py-2.5 rounded-xl transition-colors text-sm mt-2"
            >
              Đăng nhập
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Chưa có tài khoản?{' '}
            <button onClick={() => setPage('register')} className="text-blue-600 font-600 hover:text-blue-700">
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 3 — REGISTER
// ─────────────────────────────────────────────────────────────────────────────

function RegisterPage({ setPage }: { setPage: (p: Page) => void }) {
  const [show, setShow] = useState(false)
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <FileText size={15} className="text-white" />
          </div>
          <span className="font-700 text-slate-900 text-lg">HoSoHub</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h1 className="text-xl font-700 text-slate-900 mb-1">Tạo tài khoản</h1>
          <p className="text-slate-500 text-sm mb-6">Miễn phí mãi mãi cho 3 CV đầu tiên</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-500 text-slate-700 hover:bg-slate-50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-500 text-slate-700 hover:bg-slate-50 transition-colors">
              <GitBranch size={16} /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-slate-400">hoặc với email</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Họ và tên</label>
              <input placeholder="Nguyễn Văn An" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="Tối thiểu 8 ký tự" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all pr-10" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Eye size={16} />
                </button>
              </div>
              <div className="flex gap-1 mt-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-amber-400' : 'bg-gray-100'}`} />
                ))}
              </div>
              <p className="text-xs text-amber-600 mt-1">Độ mạnh: Trung bình</p>
            </div>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Xác nhận mật khẩu</label>
              <input type="password" placeholder="Nhập lại mật khẩu" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <div
                onClick={() => setAgreed(!agreed)}
                className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-colors cursor-pointer shrink-0 ${agreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
              >
                {agreed && <Check size={10} className="text-white" />}
              </div>
              <span className="text-xs text-slate-600 leading-relaxed">
                Tôi đồng ý với <a href="#" className="text-blue-600 font-500">Điều khoản dịch vụ</a> và <a href="#" className="text-blue-600 font-500">Chính sách bảo mật</a>
              </span>
            </label>
            <button
              onClick={() => setPage('dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-600 py-2.5 rounded-xl transition-colors text-sm"
            >
              Tạo tài khoản
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Đã có tài khoản?{' '}
          <button onClick={() => setPage('login')} className="text-blue-600 font-600 hover:text-blue-700">
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 4 — DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

function DashboardPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <AppShell page="dashboard" setPage={setPage} title="Dashboard" subtitle="Chào buổi sáng, Minh Khoa 👋">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileText} label="Tổng số CV" value="12" sub="+2 trong tháng này" color="bg-blue-600" />
        <StatCard icon={HardDrive} label="Dung lượng" value="847 MB" sub="84.7% / 1 GB" color="bg-violet-600" />
        <StatCard icon={Download} label="Lượt tải" value="284" sub="+38 tuần này" color="bg-amber-500" />
        <StatCard icon={Share2} label="Lượt chia sẻ" value="56" sub="+12 tuần này" color="bg-green-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-600 text-slate-900">Lượt Upload theo tháng</h3>
              <p className="text-xs text-slate-400 mt-0.5">Năm 2025</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 font-600 px-2.5 py-1 rounded-full border border-green-100">
              +34% so với 2024
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={uploadData}>
              <defs>
                <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 12 }}
                cursor={{ stroke: '#2563EB', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="uploads" stroke="#2563EB" strokeWidth={2.5} fill="url(#uploadGrad)" dot={false} activeDot={{ r: 4, fill: '#2563EB' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="font-600 text-slate-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            {activityData.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon size={13} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-600 text-slate-800 truncate">{item.file}</p>
                  <p className="text-xs text-slate-400">{item.action} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setPage('cv-list')}
            className="mt-4 w-full text-center text-xs text-blue-600 font-600 hover:text-blue-700 transition-colors py-2 rounded-xl hover:bg-blue-50"
          >
            Xem tất cả →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Upload CV mới', desc: 'Thêm hồ sơ vào thư viện', icon: Upload, action: 'upload', color: 'bg-blue-600' },
          { title: 'Xem tất cả CV', desc: 'Quản lý danh sách hồ sơ', icon: Folder, action: 'cv-list', color: 'bg-violet-600' },
          { title: 'Cài đặt hồ sơ', desc: 'Cập nhật thông tin cá nhân', icon: UserCircle, action: 'profile', color: 'bg-slate-600' },
        ].map((a, i) => (
          <button
            key={i}
            onClick={() => setPage(a.action as Page)}
            className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all text-left group"
          >
            <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center shrink-0`}>
              <a.icon size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-600 text-slate-900 group-hover:text-blue-600 transition-colors">{a.title}</div>
              <div className="text-xs text-slate-400">{a.desc}</div>
            </div>
            <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors" />
          </button>
        ))}
      </div>
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 5 — CV LIST
// ─────────────────────────────────────────────────────────────────────────────

function CvListPage({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPageNum] = useState(1)
  const perPage = 4

  const filtered = cvList.filter(cv => {
    const matchSearch = cv.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || cv.status === filter
    return matchSearch && matchFilter
  })

  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <AppShell page="cv-list" setPage={setPage} title="Quản lý CV" subtitle={`${cvList.length} hồ sơ trong thư viện`}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-52">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm CV..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Tất cả' },
              { key: 'active', label: 'Hoạt động' },
              { key: 'draft', label: 'Nháp' },
              { key: 'archived', label: 'Lưu trữ' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-500 transition-colors ${
                  filter === f.key ? 'bg-blue-600 text-white' : 'border border-gray-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage('upload')}
            className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-600 px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={15} /> Upload CV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                {['Tên CV', 'Phiên bản', 'Ngày cập nhật', 'Dung lượng', 'Trạng thái', 'Hành động'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-700 text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map(cv => (
                <tr key={cv.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                        <FileText size={14} className="text-red-500" />
                      </div>
                      <div>
                        <button
                          onClick={() => setPage('cv-detail')}
                          className="text-sm font-600 text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {cv.name}
                        </button>
                        <div className="text-xs text-slate-400">{cv.views} lượt xem</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{cv.version}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{cv.updated}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{cv.size}</td>
                  <td className="px-4 py-3"><Badge status={cv.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[
                        { icon: Eye, label: 'Xem', color: 'hover:text-blue-600 hover:bg-blue-50', action: () => setPage('cv-detail') },
                        { icon: Download, label: 'Tải', color: 'hover:text-green-600 hover:bg-green-50', action: () => {} },
                        { icon: Share2, label: 'Chia sẻ', color: 'hover:text-violet-600 hover:bg-violet-50', action: () => {} },
                        { icon: Edit3, label: 'Sửa', color: 'hover:text-amber-600 hover:bg-amber-50', action: () => {} },
                        { icon: Trash2, label: 'Xóa', color: 'hover:text-red-600 hover:bg-red-50', action: () => {} },
                      ].map((btn, i) => (
                        <button
                          key={i}
                          onClick={btn.action}
                          title={btn.label}
                          className={`p-1.5 rounded-lg text-slate-400 transition-colors ${btn.color}`}
                        >
                          <btn.icon size={14} />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Hiển thị {paginated.length} / {filtered.length} kết quả</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPageNum(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPageNum(i + 1)}
                className={`w-7 h-7 rounded-lg text-xs font-600 transition-colors ${
                  page === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPageNum(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 6 — UPLOAD
// ─────────────────────────────────────────────────────────────────────────────

function UploadPage({ setPage }: { setPage: (p: Page) => void }) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const allTags = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Data', 'Mobile', '2025', 'Fresher', 'Senior']

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const handleUpload = () => {
    if (!file) return
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setUploading(false)
          setDone(true)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 200)
  }

  const toggleTag = (t: string) => {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  return (
    <AppShell page="upload" setPage={setPage} title="Upload CV" subtitle="Thêm hồ sơ mới vào thư viện">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Dropzone */}
        <div
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
            dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-slate-50'
          } ${done ? 'border-green-400 bg-green-50' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          {done ? (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-3">
                <CheckCircle2 size={28} className="text-green-600" />
              </div>
              <p className="font-600 text-green-800 text-lg">Upload thành công!</p>
              <p className="text-sm text-green-600 mt-1">{file?.name}</p>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-3">
                <File size={26} className="text-blue-600" />
              </div>
              <p className="font-600 text-slate-900">{file.name}</p>
              <p className="text-sm text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <Upload size={24} className="text-slate-400" />
              </div>
              <p className="font-600 text-slate-700">Kéo thả file vào đây</p>
              <p className="text-sm text-slate-400 mt-1">hoặc click để chọn file</p>
              <p className="text-xs text-slate-300 mt-3">Hỗ trợ PDF, DOCX · Tối đa 10MB</p>
            </div>
          )}
        </div>

        {/* Progress */}
        {(uploading || done) && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-600 text-slate-800">{file?.name}</span>
              <span className="text-sm font-700 text-blue-600">{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-200 ${done ? 'bg-green-500' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {done
                ? <><CheckCircle2 size={13} className="text-green-500" /><span className="text-xs text-green-600 font-500">Hoàn tất</span></>
                : <><RefreshCw size={13} className="text-blue-500 animate-spin" /><span className="text-xs text-slate-500">Đang tải lên...</span></>
              }
            </div>
          </div>
        )}

        {/* Metadata form */}
        {!done && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-600 text-slate-900">Thông tin CV</h3>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Tên CV</label>
              <input placeholder="VD: CV Frontend Developer 2025" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-1.5">Mô tả ngắn</label>
              <textarea rows={2} placeholder="Mô tả về phiên bản CV này..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-xs font-600 text-slate-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-500 border transition-all ${
                      tags.includes(t)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <Tag size={10} />{t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-600 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Upload size={15} /> {uploading ? 'Đang tải lên...' : 'Upload CV'}
              </button>
              <button
                onClick={() => setPage('cv-list')}
                className="px-5 border border-gray-200 text-slate-600 font-500 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {done && (
          <div className="flex gap-3">
            <button
              onClick={() => setPage('cv-list')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-600 py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Folder size={15} /> Xem danh sách CV
            </button>
            <button
              onClick={() => { setFile(null); setDone(false); setProgress(0) }}
              className="px-5 border border-gray-200 text-slate-600 font-500 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm"
            >
              Upload thêm
            </button>
          </div>
        )}
      </div>
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 7 — CV DETAIL
// ─────────────────────────────────────────────────────────────────────────────

function CvDetailPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeVersion, setActiveVersion] = useState('v3.2')
  const [shareModal, setShareModal] = useState(false)

  return (
    <AppShell page="cv-list" setPage={setPage} title="CV Frontend Developer" subtitle="v3.2 · Cập nhật 22/07/2025">
      {shareModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-700 text-slate-900">Chia sẻ CV</h3>
              <button onClick={() => setShareModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2 mb-4">
              <Link2 size={14} className="text-slate-400 shrink-0" />
              <span className="text-sm text-slate-600 truncate flex-1">https://hosohub.vn/cv/share/abc123xyz</span>
              <button className="text-blue-600 hover:text-blue-700 shrink-0"><Copy size={14} /></button>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-600 text-slate-800">Bảo vệ bằng mật khẩu</p>
                  <p className="text-xs text-slate-400">Yêu cầu mật khẩu khi truy cập</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-blue-600 flex items-center justify-end pr-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-600 text-slate-800">Hết hạn sau 7 ngày</p>
                  <p className="text-xs text-slate-400">Link tự động vô hiệu hóa</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-gray-200 flex items-center pl-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-600 py-2.5 rounded-xl transition-colors text-sm">
              Sao chép link chia sẻ
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
        <button onClick={() => setPage('cv-list')} className="hover:text-slate-600 transition-colors">Quản lý CV</button>
        <ChevronRight size={12} />
        <span className="text-slate-700 font-500">CV Frontend Developer</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-600 text-slate-800">Preview PDF</span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"><ExternalLink size={14} /></button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"><Download size={14} /></button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-80 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg w-48 h-64 p-4">
                <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-2 bg-slate-100 rounded w-1/2 mb-4" />
                <div className="space-y-1.5">
                  {[80, 60, 70, 45, 65].map((w, i) => (
                    <div key={i} className="h-2 bg-slate-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <div className="mt-4 h-2 bg-blue-100 rounded w-2/3" />
                <div className="mt-1.5 space-y-1">
                  {[70, 55, 75].map((w, i) => (
                    <div key={i} className="h-1.5 bg-slate-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Version history */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-600 text-slate-900 mb-4">Lịch sử phiên bản</h3>
            <div className="space-y-3">
              {versionHistory.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setActiveVersion(v.version)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    activeVersion === v.version ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-700 ${
                    activeVersion === v.version ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {v.version}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-600 text-slate-800">{v.version}</span>
                      {i === 0 && <span className="text-xs bg-green-50 text-green-700 font-600 px-1.5 py-0.5 rounded-full border border-green-100">Hiện tại</span>}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{v.date} · {v.size}</p>
                    <p className="text-xs text-slate-500 mt-1">{v.changes}</p>
                  </div>
                  <button className="text-slate-400 hover:text-blue-600 transition-colors shrink-0">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-600 px-4 py-2.5 rounded-xl transition-colors text-sm">
                <Download size={15} /> Tải xuống
              </button>
              <button
                onClick={() => setShareModal(true)}
                className="w-full flex items-center gap-3 border border-gray-200 hover:bg-slate-50 text-slate-700 font-500 px-4 py-2.5 rounded-xl transition-colors text-sm"
              >
                <Share2 size={15} /> Chia sẻ
              </button>
              <button className="w-full flex items-center gap-3 border border-gray-200 hover:bg-slate-50 text-slate-700 font-500 px-4 py-2.5 rounded-xl transition-colors text-sm">
                <Edit3 size={15} /> Chỉnh sửa
              </button>
              <button className="w-full flex items-center gap-3 border border-red-200 hover:bg-red-50 text-red-600 font-500 px-4 py-2.5 rounded-xl transition-colors text-sm">
                <Trash2 size={15} /> Xóa CV
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-600 text-slate-900 mb-3">Thông tin</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Phiên bản', value: 'v3.2' },
                { label: 'Ngày tạo', value: '01/07/2025' },
                { label: 'Cập nhật lần cuối', value: '22/07/2025' },
                { label: 'Dung lượng', value: '245 KB' },
                { label: 'Định dạng', value: 'PDF' },
                { label: 'Trạng thái', value: 'active' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{m.label}</span>
                  {m.label === 'Trạng thái' ? <Badge status={m.value} /> : <span className="text-xs font-600 text-slate-700">{m.value}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-600 text-slate-900 mb-3">Thống kê</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Lượt xem', value: '128', icon: Eye, color: 'bg-blue-50 text-blue-600' },
                { label: 'Lượt tải', value: '34', icon: Download, color: 'bg-green-50 text-green-600' },
                { label: 'Chia sẻ', value: '14', icon: Share2, color: 'bg-violet-50 text-violet-600' },
                { label: 'Phiên bản', value: '4', icon: Clock, color: 'bg-amber-50 text-amber-600' },
              ].map((s, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-2.5">
                  <div className={`w-6 h-6 rounded-lg ${s.color} flex items-center justify-center mb-1.5`}>
                    <s.icon size={12} />
                  </div>
                  <div className="text-lg font-700 text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-600 text-slate-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Frontend', 'React', 'TypeScript', '2025', 'Senior'].map(t => (
                <span key={t} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full font-500 flex items-center gap-1">
                  <Tag size={9} />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 8 — PROFILE
// ─────────────────────────────────────────────────────────────────────────────

function ProfilePage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState('profile')
  const tabs = [
    { id: 'profile', label: 'Thông tin' },
    { id: 'security', label: 'Bảo mật' },
    { id: 'settings', label: 'Cài đặt' },
  ]

  return (
    <AppShell page="profile" setPage={setPage} title="Hồ sơ cá nhân">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Header card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-wrap items-start gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-700">
              MK
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
              <Edit3 size={12} className="text-slate-500" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-700 text-slate-900">Nguyễn Minh Khoa</h2>
            <p className="text-sm text-slate-500">khoa.nm@gmail.com</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge status="Pro" />
              <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-500">12 CV</span>
              <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full font-500">Tham gia 01/06/2025</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 text-sm font-600 rounded-lg transition-colors ${
                activeTab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-600 text-slate-900">Thông tin cá nhân</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-600 text-slate-700 mb-1.5">Họ và tên</label>
                <input defaultValue="Nguyễn Minh Khoa" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-600 text-slate-700 mb-1.5">Tên hiển thị</label>
                <input defaultValue="Minh Khoa" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-600 text-slate-700 mb-1.5">Email</label>
                <input defaultValue="khoa.nm@gmail.com" type="email" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-600 text-slate-700 mb-1.5">Số điện thoại</label>
                <input defaultValue="0912 345 678" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-600 text-slate-700 mb-1.5">Giới thiệu bản thân</label>
                <textarea rows={3} defaultValue="Frontend Developer với 3+ năm kinh nghiệm React, TypeScript và Next.js." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all resize-none" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-600 px-5 py-2.5 rounded-xl transition-colors text-sm">Lưu thay đổi</button>
              <button className="border border-gray-200 text-slate-600 font-500 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">Hủy</button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="font-600 text-slate-900">Đổi mật khẩu</h3>
              {['Mật khẩu hiện tại', 'Mật khẩu mới', 'Xác nhận mật khẩu mới'].map((label, i) => (
                <div key={i}>
                  <label className="block text-xs font-600 text-slate-700 mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
                </div>
              ))}
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-600 px-5 py-2.5 rounded-xl transition-colors text-sm">Cập nhật mật khẩu</button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-600 text-slate-900 mb-3">Xác thực 2 lớp (2FA)</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Tăng cường bảo mật tài khoản</p>
                  <p className="text-xs text-slate-400 mt-0.5">Sử dụng Google Authenticator hoặc SMS</p>
                </div>
                <button className="bg-green-50 text-green-700 border border-green-200 font-600 text-xs px-3 py-1.5 rounded-full">Đã bật</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-600 text-slate-900">Tùy chọn tài khoản</h3>
            {[
              { label: 'Thông báo email', desc: 'Nhận email khi CV được truy cập', on: true },
              { label: 'Thông báo đẩy', desc: 'Nhận thông báo trên trình duyệt', on: false },
              { label: 'Chế độ tối', desc: 'Giao diện nền tối', on: false },
              { label: 'Tự động lưu phiên bản', desc: 'Tạo snapshot khi cập nhật CV', on: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-600 text-slate-800">{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                </div>
                <div className={`w-10 h-6 rounded-full flex items-center cursor-pointer transition-colors ${s.on ? 'bg-blue-600 justify-end pr-1' : 'bg-gray-200 justify-start pl-1'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <button className="text-sm text-red-600 hover:text-red-700 font-500 flex items-center gap-2">
                <Trash2 size={14} /> Xóa tài khoản vĩnh viễn
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 9 — ADMIN
// ─────────────────────────────────────────────────────────────────────────────

function AdminPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState('users')
  const tabs = [
    { id: 'users', label: 'Người dùng', icon: User },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'audit', label: 'Audit Log', icon: Activity },
    { id: 'health', label: 'Hệ thống', icon: Cpu },
  ]

  return (
    <AppShell page="admin" setPage={setPage} title="Admin Dashboard" subtitle="Quản trị hệ thống HoSoHub">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard icon={User} label="Tổng người dùng" value="2,418" sub="+142 tháng này" color="bg-blue-600" />
        <StatCard icon={FileText} label="Tổng CV" value="18,234" sub="+1,892 tháng này" color="bg-violet-600" />
        <StatCard icon={HardDrive} label="Storage dùng" value="847 GB" sub="84.7% / 1 TB" color="bg-amber-500" />
        <StatCard icon={Activity} label="Uptime" value="99.97%" sub="SLA đảm bảo" color="bg-green-600" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-4 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-600 rounded-lg transition-colors ${
              activeTab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Tìm người dùng..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" />
            </div>
            <button className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-600 px-4 py-2 rounded-xl transition-colors">
              <Plus size={14} /> Thêm user
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Người dùng', 'Plan', 'Số CV', 'Tham gia', 'Trạng thái', 'Hành động'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-700 text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {userList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <div className="text-sm font-600 text-slate-900">{u.name}</div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge status={u.plan} /></td>
                    <td className="px-4 py-3 text-sm text-slate-600">{u.cvCount}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{u.joined}</td>
                    <td className="px-4 py-3"><Badge status={u.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Eye size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"><Edit3 size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-600 text-slate-900 mb-5">Phân bổ Storage theo định dạng</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={storageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {storageData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 mt-4">
              {storageData.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: s.fill }} />
                  <span className="text-xs text-slate-600 flex-1">{s.name}</span>
                  <div className="h-1.5 bg-gray-100 rounded-full flex-1 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, backgroundColor: s.fill }} />
                  </div>
                  <span className="text-xs font-600 text-slate-700 w-8 text-right">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-600 text-slate-900 mb-4">Cloud Status</h3>
            <div className="space-y-3">
              {[
                { service: 'AWS S3 Storage', status: 'operational', latency: '12ms' },
                { service: 'PostgreSQL DB', status: 'operational', latency: '3ms' },
                { service: 'Redis Cache', status: 'operational', latency: '0.8ms' },
                { service: 'CDN Edge Network', status: 'degraded', latency: '145ms' },
                { service: 'Email Service', status: 'operational', latency: '—' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${s.status === 'operational' ? 'bg-green-500' : 'bg-amber-400'}`} />
                  <span className="text-sm text-slate-700 flex-1">{s.service}</span>
                  <span className={`text-xs font-600 ${s.status === 'operational' ? 'text-green-600' : 'text-amber-600'}`}>
                    {s.status === 'operational' ? 'Hoạt động' : 'Chậm'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{s.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Activity size={14} />
              <span className="font-600 text-slate-800">Audit Log</span>
              <span>· Hôm nay</span>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {auditLogs.map((log, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50/50 transition-colors">
                <span className="text-xs text-slate-400 w-28 shrink-0 pt-0.5 font-mono">{log.time}</span>
                <Avatar name={log.user} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 truncate">{log.user}</span>
                    <Badge status={log.level} />
                    <span className={`text-xs font-700 font-mono px-1.5 py-0.5 rounded ${
                      log.level === 'error' ? 'bg-red-50 text-red-700' :
                      log.level === 'warn' ? 'bg-amber-50 text-amber-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>{log.action}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'health' && (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-600 text-slate-900 mb-5">CPU & Memory (24h)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={systemHealth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="cpu" stroke="#2563EB" strokeWidth={2} dot={false} name="CPU" />
                <Line type="monotone" dataKey="mem" stroke="#22C55E" strokeWidth={2} dot={false} name="Memory" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded bg-blue-600" /><span className="text-xs text-slate-500">CPU</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded bg-green-500" /><span className="text-xs text-slate-500">Memory</span></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-600 text-slate-900 mb-4">Tài nguyên hiện tại</h3>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', value: 38, color: 'bg-blue-600', unit: '%' },
                { label: 'Memory', value: 55, color: 'bg-green-500', unit: '%' },
                { label: 'Disk I/O', value: 23, color: 'bg-violet-500', unit: '%' },
                { label: 'Network', value: 67, color: 'bg-amber-500', unit: '%' },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-700">{r.label}</span>
                    <span className="text-sm font-700 text-slate-900">{r.value}{r.unit}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${r.color} transition-all`} style={{ width: `${r.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 10 — 404
// ─────────────────────────────────────────────────────────────────────────────

function NotFoundPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-8">
        <div className="text-[120px] font-800 text-slate-100 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-200">
            <FileText size={36} className="text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-700 text-slate-900 mb-2">Trang không tìm thấy</h1>
      <p className="text-slate-500 mb-8 max-w-sm text-sm leading-relaxed">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy kiểm tra lại đường dẫn.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setPage('dashboard')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-600 px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Home size={15} /> Về Dashboard
        </button>
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-2 border border-gray-200 text-slate-600 font-500 px-5 py-2.5 rounded-xl hover:bg-white transition-colors text-sm"
        >
          <Globe size={15} /> Trang chủ
        </button>
      </div>
      <div className="mt-10 flex flex-wrap gap-4 justify-center text-sm text-slate-400">
        {[
          { label: 'Dashboard', page: 'dashboard' as Page },
          { label: 'Quản lý CV', page: 'cv-list' as Page },
          { label: 'Upload CV', page: 'upload' as Page },
          { label: 'Hồ sơ', page: 'profile' as Page },
        ].map(l => (
          <button key={l.label} onClick={() => setPage(l.page)} className="hover:text-blue-600 transition-colors">
            {l.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV DEMO BAR
// ─────────────────────────────────────────────────────────────────────────────

function DemoNav({ current, setPage }: { current: Page; setPage: (p: Page) => void }) {
  const pages: { id: Page; label: string }[] = [
    { id: 'landing', label: 'Landing' },
    { id: 'login', label: 'Đăng nhập' },
    { id: 'register', label: 'Đăng ký' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cv-list', label: 'Quản lý CV' },
    { id: 'upload', label: 'Upload' },
    { id: 'cv-detail', label: 'Chi tiết CV' },
    { id: 'profile', label: 'Hồ sơ' },
    { id: 'admin', label: 'Admin' },
    { id: 'not-found', label: '404' },
  ]
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl px-3 py-2 flex flex-wrap gap-1 max-w-[calc(100vw-32px)] justify-center">
      {pages.map(p => (
        <button
          key={p.id}
          onClick={() => setPage(p.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-colors whitespace-nowrap ${
            current === p.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  const renderPage = () => {
    switch (page) {
      case 'landing': return <LandingPage setPage={setPage} />
      case 'login': return <LoginPage setPage={setPage} />
      case 'register': return <RegisterPage setPage={setPage} />
      case 'dashboard': return <DashboardPage setPage={setPage} />
      case 'cv-list': return <CvListPage setPage={setPage} />
      case 'upload': return <UploadPage setPage={setPage} />
      case 'cv-detail': return <CvDetailPage setPage={setPage} />
      case 'profile': return <ProfilePage setPage={setPage} />
      case 'admin': return <AdminPage setPage={setPage} />
      case 'not-found': return <NotFoundPage setPage={setPage} />
    }
  }

  return (
    <div className="font-[Inter]">
      {renderPage()}
      <DemoNav current={page} setPage={setPage} />
    </div>
  )
}
