export default function RenderConfig({
  token,
  user,
  requiredRole,
  children,
  fallback,
}) {
  if (!token) {
    return fallback || null
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== "ADMIN") {
    return (
      <div className="artboard app-screen p-8 font-mono text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="border-3 border-black bg-white p-6 shadow-[4px_4px_0_0] shadow-black max-w-md">
          <span className="text-red-500 font-bold block mb-2">// 403 TRUY CẬP BỊ TỪ CHỐI</span>
          <p className="text-sm mb-4">Bạn không có quyền truy cập vào khu vực quản trị này.</p>
        </div>
      </div>
    )
  }

  return children
}
