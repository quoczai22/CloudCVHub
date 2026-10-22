export const adminRoutes = [
  {
    id: "admin-users",
    path: "/admin/users",
    title: "Quản trị người dùng",
    component: "AdminPage",
    role: "ADMIN",
    mode: "users",
  },
  {
    id: "admin-cvs",
    path: "/admin/cvs",
    title: "Quản trị hồ sơ",
    component: "AdminPage",
    role: "ADMIN",
    mode: "cvs",
  },
]

export default adminRoutes
