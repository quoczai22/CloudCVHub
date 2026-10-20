import { useState } from 'react'
import Icon from '../components/UI/Icon'
import Kicker from '../components/UI/Kicker'
import Button from '../components/UI/Button'
import Field from '../components/UI/Field'
import AppShell from '../layouts/AppShell'

export default function UploadPage(props) {
  const [uploaded, setUploaded] = useState(false)
  return (
    <AppShell {...props} page="upload">
      <div className="page content-page">
        <div className="page-heading">
          <div>
            <Kicker>DOCUMENT INTAKE</Kicker>
            <h2>
              Tải CV lên<span>.</span>
            </h2>
            <p>Đưa tài liệu vào kho bảo mật và quản lý phiên bản tự động.</p>
          </div>
        </div>
        <button className="drop-zone" onClick={() => setUploaded(true)}>
          <span className="drop-icon">
            <Icon name="upload" size={34} />
          </span>
          <b>KÉO & THẢ CV VÀO ĐÂY</b>
          <p>hoặc nhấn để chọn tệp từ thiết bị</p>
          <small>PDF, DOCX • TỐI ĐA 10MB • MÃ HÓA AES-256</small>
        </button>
        <div className="upload-grid">
          <div className="content-card">
            <Kicker>THÔNG TIN TỆP</Kicker>
            <Field
              label="TÊN HIỂN THỊ"
              defaultValue="CV Product Designer 2025"
            />
            <Field
              label="VỊ TRÍ ỨNG TUYỂN"
              defaultValue="Senior Product Designer"
            />
            <Button icon="upload" onClick={() => setUploaded(true)}>
              TẢI LÊN AN TOÀN
            </Button>
          </div>
          <div className="content-card upload-rules">
            <Kicker>KIỂM TRA TỰ ĐỘNG</Kicker>
            {[
              "Quét mã độc",
              "Nhận diện dữ liệu cá nhân",
              "Tạo ảnh xem trước",
              "Khởi tạo phiên bản v1.0",
            ].map((item) => (
              <div key={item}>
                <Icon name="check" size={17} />
                <span>{item}</span>
                <b>SẴN SÀNG</b>
              </div>
            ))}
          </div>
        </div>
      </div>
      {uploaded && (
        <div className="toast">
          <Icon name="check" /> CV ĐÃ ĐƯỢC TẢI LÊN VÀ MÃ HÓA
        </div>
      )}
    </AppShell>
  )
}
