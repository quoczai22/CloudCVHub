import useLoginLogic from '../../hooks/useLoginLogic'
import Button from '../../../../components/UI/Button'
import Field from '../../../../components/UI/Field'
import Icon from '../../../../components/UI/Icon'
import styles from './LoginForm.module.css'

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    message,
    handleSubmit,
    handleDemoAccess,
  } = useLoginLogic({ onLoginSuccess })

  return (
    <div className={`auth-card ${styles.loginFormWrap || ''}`.trim()}>
      <div className="auth-header">
        <span className="auth-tag">// XÁC THỰC NGƯỜI DÙNG</span>
        <h2>ĐĂNG NHẬP HỆ THỐNG</h2>
        <p className="auth-sub">Hệ thống lưu trữ & quản lý hồ sơ chuyên nghiệp</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
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
          <Icon name="lock" size={16} />
          {loading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP NGAY"}
        </Button>
      </form>

      <div className="auth-footer">
        {onSwitchToRegister && (
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={onSwitchToRegister}
          >
            Chưa có tài khoản? Tạo tài khoản mới
          </button>
        )}

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
