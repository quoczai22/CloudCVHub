import Icon from '../../../components/UI/Icon'

export default function QuickActions({ onNavigate }) {
  return (
    <>
      <div className="section-title">
        <h3>Thao tác nhanh</h3>
        <span>THỰC THI / KHỞI TẠO</span>
      </div>
      <div className="quick-grid">
        <button type="button" onClick={() => onNavigate("upload")}>
          <span className="action-icon coral">
            <Icon name="plus" size={28} />
          </span>
          <b>Tạo CV mới</b>
          <small>Bắt đầu từ một không gian trống</small>
          <Icon name="arrow" />
        </button>
        <button type="button" onClick={() => onNavigate("upload")}>
          <span className="action-icon yellow">
            <Icon name="upload" size={28} />
          </span>
          <b>Nhập CV hiện có</b>
          <small>PDF, DOCX tối đa 10MB</small>
          <Icon name="arrow" />
        </button>
        <button type="button" onClick={() => onNavigate("cvs")}>
          <span className="action-icon white">
            <Icon name="file" size={28} />
          </span>
          <b>Duyệt mẫu CV</b>
          <small>24 bố cục đã được kiểm chứng</small>
          <Icon name="arrow" />
        </button>
      </div>
    </>
  )
}
