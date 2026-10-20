import { useState } from 'react'
import Icon from '../components/UI/Icon'
import Kicker from '../components/UI/Kicker'
import Button from '../components/UI/Button'
import Field from '../components/UI/Field'
import AppShell from '../layouts/AppShell'

export default function SharesPage(props) {
  const [dialog, setDialog] = useState(false)
  const [toast, setToast] = useState(false)
  const links = [
    ["Product Designer cấp cao", "cvhub.vn/s/ma-2025", "Không hết hạn", "184"],
    ["Design System Lead", "cvhub.vn/s/design-lead", "Còn 12 ngày", "92"],
    ["UX Research Portfolio", "cvhub.vn/s/research-05", "Còn 3 ngày", "56"],
  ]
  return (
    <AppShell {...props} page="shares">
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>SECURE DISTRIBUTION</Kicker>
            <h2>
              Liên kết chia sẻ<span>.</span>
            </h2>
            <p>Kiểm soát quyền truy cập và thời hạn của từng CV.</p>
          </div>
          <Button icon="plus" onClick={() => setDialog(true)}>
            TẠO LIÊN KẾT
          </Button>
        </div>
        <div className="share-stats">
          <div>
            <small>ĐANG HOẠT ĐỘNG</small>
            <b>06</b>
          </div>
          <div>
            <small>LƯỢT XEM THÁNG NÀY</small>
            <b>348</b>
          </div>
          <div>
            <small>ĐƯỢC BẢO VỆ MẬT KHẨU</small>
            <b>03</b>
          </div>
        </div>
        <div className="content-card list-card">
          <div className="list-head">
            <span>CV / LIÊN KẾT</span>
            <span>HẾT HẠN</span>
            <span>LƯỢT XEM</span>
            <span>THAO TÁC</span>
          </div>
          {links.map((link) => (
            <div className="share-row" key={link[0]}>
              <span>
                <b>{link[0]}</b>
                <code>{link[1]}</code>
              </span>
              <span className="status live">{link[2]}</span>
              <b>{link[3]}</b>
              <span className="row-actions">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(link[1])
                    setToast(true)
                  }}
                >
                  <Icon name="link" />
                </button>
                <button>
                  <Icon name="trash" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
      {dialog && (
        <div className="dialog-backdrop" onMouseDown={() => setDialog(false)}>
          <div
            className="dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Kicker>NEW SECURE LINK</Kicker>
            <h3>Tạo liên kết chia sẻ</h3>
            <Field label="CV" defaultValue="Product Designer cấp cao" />
            <Field label="NGÀY HẾT HẠN" type="date" />
            <Field
              label="MẬT KHẨU (KHÔNG BẮT BUỘC)"
              type="password"
              placeholder="Tối thiểu 8 ký tự"
            />
            <div className="dialog-actions">
              <Button variant="light" onClick={() => setDialog(false)}>
                HỦY
              </Button>
              <Button
                icon="link"
                onClick={() => {
                  setDialog(false)
                  setToast(true)
                }}
              >
                TẠO LIÊN KẾT
              </Button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Icon name="check" /> LIÊN KẾT ĐÃ SẴN SÀNG
        </div>
      )}
    </AppShell>
  )
}
