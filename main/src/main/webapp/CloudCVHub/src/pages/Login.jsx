import '../assets/css/4-pages/login.css';
import { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Layers, Lock } from 'lucide-react';
import Alert from '../components/Alert.jsx';
import SocialAuthButtons from '../components/UI/SocialAuthButtons.jsx';
import { apiUrl } from '../config/api.js';

function BrandMark() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{
        width: '28px',
        height: '28px',
        display: 'grid',
        placeItems: 'center',
        background: '#FFF275',
        border: '2px solid #111111',
        boxShadow: '2px 2px 0 #111111',
        fontWeight: 800,
        fontSize: '14px',
        color: '#111111'
      }}>C</span>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: '18px',
        letterSpacing: '-0.04em',
        color: '#111111'
      }}>
        Cloud<span style={{ color: '#FF416C' }}>CV</span>Hub
      </span>
    </div>
  );
}


function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LoginPage({ onLoginSuccess }) {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // States Đăng nhập
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // States Đăng ký
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // Toast Alert chung
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const showAlert = (msg, type = 'error') => {
    setAlertMessage(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  // Xử lý Đăng Nhập
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setAlertOpen(false);

    fetch(apiUrl('/api/v1/auth/login'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Đăng nhập thất bại!');
        }
        return data;
      })
      .then((data) => {
        if (data.result?.accessToken) {
          localStorage.setItem('token', data.result.accessToken);
        }
        if (data.result?.user) {
          localStorage.setItem('user', JSON.stringify(data.result.user));
        }
        showAlert(data.message || 'Đăng nhập thành công!', 'success');
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(data.result?.accessToken, data.result?.user);
          } else {
            window.location.href = '/';
          }
        }, 500);
      })
      .catch((error) => {
        showAlert(error.message || 'Không thể kết nối đến máy chủ.');
      })
      .finally(() => {
        setIsLoginLoading(false);
      });
  };

  // Xử lý Đăng Ký
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      showAlert('Mật khẩu xác nhận không khớp!', 'warning');
      return;
    }

    if (registerPassword.length < 6) {
      showAlert('Mật khẩu phải có ít nhất 6 ký tự!', 'warning');
      return;
    }

    setIsRegisterLoading(true);
    setAlertOpen(false);

    fetch(apiUrl('/api/v1/auth/register'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Đăng ký thất bại!');
        }
        return data;
      })
      .then((data) => {
        showAlert(data.message || 'Đăng ký thành công! Hãy đăng nhập.', 'success');
        setTimeout(() => {
          setIsRightPanelActive(false);
          setLoginEmail(registerEmail);
        }, 1000);
      })
      .catch((error) => {
        showAlert(error.message || 'Không thể kết nối đến máy chủ.');
      })
      .finally(() => {
        setIsRegisterLoading(false);
      });
  };

  return (
    <div className="login-page-root">
      <Alert
        message={alertMessage}
        type={alertType}
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
      />

      <div className={`auth-slider-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        {/* ================= 1. FORM ĐĂNG NHẬP (TRÁI) ================= */}
        <div className="form-slide-container sign-in-slide">
          <form onSubmit={handleLoginSubmit} className="auth-form-content">
            <BrandMark />
            <h1 className="form-title">ĐĂNG NHẬP</h1>
            <p className="form-subtitle">Quản lý hồ sơ đám mây CloudCVHub</p>

            <div className="input-group">
              <label>Địa chỉ Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="email@gmail.com"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <div className="input-wrapper">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="toggle-password"
                  title={showLoginPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Ghi nhớ</span>
              </label>
              <a href="#">Quên mật khẩu?</a>
            </div>

            <button type="submit" disabled={isLoginLoading} className="neo-btn">
              {isLoginLoading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
            </button>

            <button
              type="button"
              onClick={() => {
                const demoToken = "demo-token-pro-access";
                const demoUser = { fullName: "Nguyễn Minh Anh", email: "minhanh.nguyen@cloudcv.io", role: "PRO" };
                localStorage.setItem("token", demoToken);
                localStorage.setItem("user", JSON.stringify(demoUser));
                showAlert("Đang kích hoạt chế độ Demo...", "success");
                setTimeout(() => {
                  if (onLoginSuccess) {
                    onLoginSuccess(demoToken, demoUser);
                  } else {
                    window.location.href = "/";
                  }
                }, 400);
              }}
              className="neo-btn neo-btn-demo" style={{ marginTop: "10px" }}
            >
              ⚡ TRẢI NGHIỆM CHẾ ĐỘ DEMO
            </button>

            <div className="divider">
              <span>HOẶC TIẾP TỤC VỚI</span>
            </div>

            <SocialAuthButtons />

            {/* Chuyển tab cho màn hình di động */}
            <div className="mobile-toggle-strip">
              <span>Chưa có tài khoản?</span>
              <button type="button" onClick={() => setIsRightPanelActive(true)}>
                Đăng ký ngay
              </button>
            </div>
          </form>
        </div>

        {/* ================= 2. FORM ĐĂNG KÝ (PHẢI TRƯỢT SANG) ================= */}
        <div className="form-slide-container sign-up-slide">
          <form onSubmit={handleRegisterSubmit} className="auth-form-content">
            <BrandMark />
            <h1 className="form-title">TẠO TÀI KHOẢN</h1>
            <p className="form-subtitle">Bắt đầu lưu trữ & chia sẻ CV miễn phí</p>

            <div className="input-group">
              <label>Họ và tên</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Địa chỉ Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="email@gmail.com"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <div className="input-wrapper">
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="toggle-password"
                  title={showRegisterPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showRegisterPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Xác nhận mật khẩu</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  required
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            </div>

            <button type="submit" disabled={isRegisterLoading} className="neo-btn">
              {isRegisterLoading ? 'ĐANG TẠO...' : 'ĐĂNG KÝ NGAY'}
            </button>

            {/* Chuyển tab cho màn hình di động */}
            <div className="mobile-toggle-strip">
              <span>Đã có tài khoản?</span>
              <button type="button" onClick={() => setIsRightPanelActive(false)}>
                Đăng nhập
              </button>
            </div>
          </form>
        </div>

        {/* ================= 3. OVERLAY SLIDING SIDEBAR (THANH TRƯỢT XANH DƯƠNG) ================= */}
        <div className="overlay-slide-container">
          <div className="overlay-track">
            {/* Panel Bên Trái (Hiện khi đang ở trạng thái Đăng Ký để bấm quay lại Đăng Nhập) */}
            <div className="overlay-panel-item overlay-panel-left">
              <h2>MỪNG BẠN TRỞ LẠI!</h2>
              <p>
                Đã có tài khoản CloudCVHub? Đăng nhập ngay để tiếp tục chỉnh sửa, cập nhật và chia sẻ hồ sơ ứng tuyển.
              </p>
              <button
                type="button"
                className="ghost-neo-btn"
                onClick={() => setIsRightPanelActive(false)}
              >
                ĐĂNG NHẬP
              </button>

              <div className="overlay-trust-badges">
                <div className="trust-item">
                  <ShieldCheck size={18} />
                  <span>Mã hóa AES-256 & Xác thực SHA-256</span>
                </div>
                <div className="trust-item">
                  <Layers size={18} />
                  <span>Quản lý lịch sử đa phiên bản CV</span>
                </div>
                <div className="trust-item">
                  <Lock size={18} />
                  <span>Chia sẻ link công khai có kiểm soát</span>
                </div>
              </div>
            </div>

            {/* Panel Bên Phải (Hiện khi đang ở trạng thái Đăng Nhập để bấm sang Đăng Ký) */}
            <div className="overlay-panel-item overlay-panel-right">
              <h2>CHÀO MỪNG BẠN!</h2>
              <p>
                Khởi tạo kho lưu trữ CV bảo mật đám mây, đa phiên bản và sẵn sàng kết nối cùng nhà tuyển dụng.
              </p>
              <button
                type="button"
                className="ghost-neo-btn"
                onClick={() => setIsRightPanelActive(true)}
              >
                TẠO TÀI KHOẢN
              </button>

              <div className="overlay-trust-badges">
                <div className="trust-item">
                  <ShieldCheck size={18} />
                  <span>Mã hóa AES-256 & Xác thực SHA-256</span>
                </div>
                <div className="trust-item">
                  <Layers size={18} />
                  <span>Quản lý lịch sử đa phiên bản CV</span>
                </div>
                <div className="trust-item">
                  <Lock size={18} />
                  <span>Chia sẻ link công khai có kiểm soát</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
