import { useState } from 'react'
import { registerApi } from '../services/authApi'

export function useRegisterLogic({ onRegisterSuccess } = {}) {
  const [fullName, setFullName] = useState("")
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
      const data = await registerApi({ fullName, email, password })
      setMessage("ĐĂNG KÝ THÀNH CÔNG! ĐANG VÀO HỆ THỐNG...")
      const token = data.result?.accessToken || "registered-token"
      const user = data.result?.user || { fullName: fullName || "Người dùng mới", email, role: "PRO" }
      setTimeout(() => {
        onRegisterSuccess?.(token, user)
      }, 500)
    } catch (err) {
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    message,
    handleSubmit,
  }
}

export default useRegisterLogic
