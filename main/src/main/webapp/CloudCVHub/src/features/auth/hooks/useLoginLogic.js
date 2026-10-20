import { useState } from 'react'
import { loginApi } from '../services/authApi'

export function useLoginLogic({ onLoginSuccess } = {}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    try {
      const data = await loginApi({ email, password })
      setMessage("XÁC THỰC THÀNH CÔNG — ĐANG VÀO VAULT")
      const token = data.result?.accessToken || "verified-token"
      const user = data.result?.user || { email, fullName: "Người dùng", role: "PRO" }
      setTimeout(() => {
        onLoginSuccess?.(token, user)
      }, 500)
    } catch (err) {
      setError(err.message || "Lỗi kết nối máy chủ. Bạn có thể dùng nút Chế Độ Demo bên dưới để thử nghiệm.")
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    message,
    handleSubmit,
    handleDemoAccess,
  }
}

export default useLoginLogic
