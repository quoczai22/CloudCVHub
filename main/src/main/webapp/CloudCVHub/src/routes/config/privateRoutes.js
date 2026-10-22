export const privateRoutes = [
  {
    id: "overview",
    path: "/dashboard",
    title: "Tổng quan",
    component: "DashboardPage",
  },
  {
    id: "cvs",
    path: "/dashboard/cvs",
    title: "Quản lý CV",
    component: "CVListPage",
  },
  {
    id: "upload",
    path: "/dashboard/upload",
    title: "Tải lên CV",
    component: "UploadPage",
  },
  {
    id: "detail",
    path: "/dashboard/detail",
    title: "Chi tiết CV",
    component: "DetailPage",
  },
  {
    id: "shares",
    path: "/dashboard/shares",
    title: "Chia sẻ liên kết",
    component: "SharesPage",
  },
  {
    id: "profile",
    path: "/dashboard/profile",
    title: "Hồ sơ cá nhân",
    component: "ProfilePage",
  },
  {
    id: "settings",
    path: "/dashboard/settings",
    title: "Cài đặt tài khoản",
    component: "SettingsPage",
  },
]

export default privateRoutes
