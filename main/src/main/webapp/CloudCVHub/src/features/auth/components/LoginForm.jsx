import { useState } from 'react'
import { loginApi, registerApi } from '../services/authService'
import Button from '../../../components/UI/Button'
import Field from '../../../components/UI/Field'
import Icon from '../../../components/UI/Icon'

export default function LoginForm({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    try {
      let data
      if (isRegister) {
        data = await registerApi({ email, password, fullName })
      } else {
        data = await loginApi({ email, password })
      }
      setMessage(isRegister ? "ĐĂNG KÝ THÀNH CÔNG! ĐANG VÀO HỆ THỐNG..." : "XÁC THỰC THÀNH CÔNG — ĐANG VÀO VAULT")
      const tok = data.result?.accessToken || "verified-token"
      const usr = data.result?.user || { fullName: fullName || "Người dùng", email, role: "PRO" }
      setTimeout(() => {
        onLoginSuccess?.(tok, usr)
      }, 500)
    } catch (err) {
      setError(err.message || "Lỗi kết nối máy chủ backend. Bạn có thể dùng nút Chế Độ Demo bên dưới để trải nghiệm ngay.")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoAccess = () => {
    setMessage("ĐANG KÍCH HOẠT QUYỀN DEMO PRO...")
    setTimeout(() => {
      onLoginSuccess?.("demo-token", {
        fullName: "Nguyễn Văn Demo",
        email: "demo@cloudcvhub.io",
        role: "ADMIN",
      })
    }, 400)
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <span className="auth-tag">// XÁC THỰC NGƯỜI DÙNG</span>
        <h2>{isRegister ? "TẠO TÀI KHOẢN MỚI" : "ĐĂNG NHẬP HỆ THỐNG"}</h2>
        <p className="auth-sub">Hệ thống lưu trữ & quản lý hồ sơ chuyên nghiệp</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <Field
            label="HỌ VÀ TÊN"
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <Field
          label="EMAIL"
          type="email"
          placeholder="user@cloudcvhub.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          label="MẬT KHẨU"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        {message && <div className="auth-alert auth-alert-success">{message}</div>}

        <Button type="submit" variant="yellow" disabled={loading} className="w-full justify-center">
          <Icon name={isRegister ? "plus" : "lock"} size={16} />
          {loading ? "ĐANG XỬ LÝ..." : isRegister ? "ĐĂNG KÝ NGAY" : "ĐĂNG NHẬP"}
        </Button>
      </form>

      <div className="auth-footer">
        <button
          type="button"
          className="auth-toggle-btn"
          onClick={() => {
            setIsRegister(!isRegister)
            setError("")
            setMessage("")
          }}
        >
          {isRegister ? "Đã có tài khoản? Đăng nhập ngay" : "Chưa có tài khoản? Tạo tài khoản mới"}
        </button>

        <div className="auth-demo-divider">
          <span>HOẶC</span>
        </div>

        <button
          type="button"
          className="btn btn-light w-full justify-center"
          onClick={handleDemoAccess}
        >
          <Icon name="shield" size={16} /> VÀO NHANH CHẾ ĐỘ DEMO
        </button>
      </div>
    </div>
  )
}
