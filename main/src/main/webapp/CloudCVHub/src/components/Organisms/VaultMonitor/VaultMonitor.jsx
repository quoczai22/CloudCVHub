import Icon from '../../../components/UI/Icon'
import ProgressBar from '../../../components/UI/ProgressBar'

export default function VaultMonitor({ onAction }) {
  return (
    <div className="storage-panel">
      <div className="storage-header">
        <span className="storage-badge">
          <Icon name="cloud" size={16} />
        </span>
        <span className="mono-label">// VAULT MONITOR</span>
      </div>
      <div className="donut-wrap">
        <div className="donut">
          <b>62%</b>
          <small>USED</small>
        </div>
      </div>
      <div className="storage-numbers">
        <span>
          <b>6.2 GB</b>
          <small>USED SPACE</small>
        </span>
        <span>
          <b>10 GB</b>
          <small>TOTAL SPACE</small>
        </span>
      </div>
      <ProgressBar value={62} label="Tiến độ lưu trữ" />
      <div className="file-breakdown">
        <div>
          <i style={{ background: "var(--coral)" }} />
          <span>DOCUMENTS</span>
          <b>4.8 GB</b>
        </div>
        <div>
          <i style={{ background: "var(--yellow)" }} />
          <span>MEDIA</span>
          <b>1.1 GB</b>
        </div>
        <div>
          <i style={{ background: "#eee" }} />
          <span>OTHER</span>
          <b>0.3 GB</b>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-light"
        style={{ width: "100%", justifyContent: "center" }}
        onClick={() => onAction?.("Đang mở trang quản lý dung lượng")}
      >
        <Icon name="cloud" size={14} /> Quản lý dung lượng
      </button>
    </div>
  )
}
