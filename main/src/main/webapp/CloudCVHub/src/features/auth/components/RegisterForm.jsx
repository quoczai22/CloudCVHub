import { useState } from 'react'
import { registerApi } from '../services/authService'
import Button from '../../../components/UI/Button'
import Field from '../../../components/UI/Field'
import Icon from '../../../components/UI/Icon'

export default function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await registerApi({ email, password, fullName })
      const tok = data.result?.accessToken || "registered-token"
      const usr = data.result?.user || { fullName, email, role: "PRO" }
      onRegisterSuccess?.(tok, usr)
    } catch (err) {
      setError(err.message || "Đăng ký thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Field
        label="HỌ VÀ TÊN"
        placeholder="Nguyễn Văn A"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
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
      <Button type="submit" variant="yellow" disabled={loading} className="w-full justify-center">
        <Icon name="plus" size={16} />
        {loading ? "ĐANG TẠO TÀI KHOẢN..." : "ĐĂNG KÝ NGAY"}
      </Button>
    </form>
  )
}
