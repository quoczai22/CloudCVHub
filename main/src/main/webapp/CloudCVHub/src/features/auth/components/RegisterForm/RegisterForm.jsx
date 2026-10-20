import useRegisterLogic from '../../hooks/useRegisterLogic'
import Button from '../../../../components/UI/Button'
import Field from '../../../../components/UI/Field'
import Icon from '../../../../components/UI/Icon'
import styles from './RegisterForm.module.css'

export default function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const {
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
  } = useRegisterLogic({ onRegisterSuccess })

  return (
    <div className={`auth-card ${styles.registerFormWrap || ''}`.trim()}>
      <div className="auth-header">
        <span className="auth-tag">// TẠO TÀI KHOẢN MỚI</span>
        <h2>ĐĂNG KÝ HỆ THỐNG</h2>
        <p className="auth-sub">Tạo kho lưu trữ CV cá nhân an toàn & bảo mật</p>
      </div>

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
        {message && <div className="auth-alert auth-alert-success">{message}</div>}

        <Button type="submit" variant="yellow" disabled={loading} className="w-full justify-center">
          <Icon name="plus" size={16} />
          {loading ? "ĐANG TẠO TÀI KHOẢN..." : "ĐĂNG KÝ NGAY"}
        </Button>
      </form>

      <div className="auth-footer">
        {onSwitchToLogin && (
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={onSwitchToLogin}
          >
            Đã có tài khoản? Đăng nhập ngay
          </button>
        )}
      </div>
    </div>
  )
}
