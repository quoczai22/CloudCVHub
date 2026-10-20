import Icon from '../../../components/UI/Icon'

export default function RecentEdits({ onNavigate }) {
  return (
    <>
      <div className="section-title recent-title">
        <h3>Chỉnh sửa gần đây</h3>
        <button type="button" onClick={() => onNavigate("cvs")}>
          XEM TẤT CẢ <Icon name="arrow" size={14} />
        </button>
      </div>
      <div className="recent-list">
        <div>
          <span className="file-block">CV</span>
          <span>
            <b>Product Designer cấp cao</b>
            <small>Chỉnh sửa 2 giờ trước • v8.2</small>
          </span>
          <span className="status live">LIVE</span>
          <button type="button" aria-label="Tùy chọn">
            <Icon name="menu" />
          </button>
        </div>
        <div>
          <span className="file-block">CV</span>
          <span>
            <b>Trưởng nhóm kỹ thuật Full-stack</b>
            <small>Chỉnh sửa hôm qua • v3.1</small>
          </span>
          <span className="status draft">DRAFT</span>
          <button type="button" aria-label="Tùy chọn">
            <Icon name="menu" />
          </button>
        </div>
        <div>
          <span className="file-block">CV</span>
          <span>
            <b>Chuyên viên Tiếp thị Tăng trưởng</b>
            <small>Chỉnh sửa 4 ngày trước • v1.0</small>
          </span>
          <span className="status draft">DRAFT</span>
          <button type="button" aria-label="Tùy chọn">
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </>
  )
}
