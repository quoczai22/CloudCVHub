import { useState } from 'react'
import Icon from '../components/UI/Icon'
import Kicker from '../components/UI/Kicker'
import Button from '../components/UI/Button'
import AppShell from '../layouts/AppShell'

export default function SettingsPage(props) {
  const [saved, setSaved] = useState(false)
  return (
    <AppShell {...props} page="settings">
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>SYSTEM PREFERENCES</Kicker>
            <h2>
              Cài đặt<span>.</span>
            </h2>
            <p>Tùy chỉnh bảo mật, thông báo và trải nghiệm tài khoản.</p>
          </div>
          <Button icon="check" onClick={() => setSaved(true)}>
            LƯU THAY ĐỔI
          </Button>
        </div>
        <div className="settings-grid">
          <div className="content-card">
            <div className="section-title">
              <h3>Thông báo</h3>
              <span>CHANNELS</span>
            </div>
            {[
              "Có người xem CV",
              "Liên kết sắp hết hạn",
              "Đăng nhập từ thiết bị mới",
              "Báo cáo hoạt động hàng tuần",
            ].map((item, index) => (
              <label className="toggle-row" key={item}>
                <span>
                  <b>{item}</b>
                  <small>Gửi qua email và trung tâm thông báo</small>
                </span>
                <input type="checkbox" defaultChecked={index !== 3} />
              </label>
            ))}
          </div>
          <div className="content-card">
            <div className="section-title">
              <h3>Bảo mật</h3>
              <span>MAX CLEARANCE</span>
            </div>
            <div className="setting-action">
              <span>
                <Icon name="lock" />
                <b>Xác thực hai bước</b>
              </span>
              <i className="status live">ĐANG BẬT</i>
            </div>
            <div className="setting-action">
              <span>
                <Icon name="history" />
                <b>Phiên đăng nhập</b>
              </span>
              <button>QUẢN LÝ 3 THIẾT BỊ</button>
            </div>
            <div className="setting-action danger-zone">
              <span>
                <Icon name="trash" />
                <b>Xóa tài khoản</b>
              </span>
              <button>YÊU CẦU XÓA</button>
            </div>
          </div>
        </div>
      </div>
      {saved && (
        <div className="toast">
          <Icon name="check" /> CÀI ĐẶT ĐÃ ĐƯỢC LƯU
        </div>
      )}
    </AppShell>
  )
}
