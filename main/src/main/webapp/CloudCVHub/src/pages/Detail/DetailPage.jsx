import Kicker from '../../components/UI/Kicker'
import Button from '../../components/UI/Button'
import AppShell from '../../layouts/AppShell'

export default function DetailPage(props) {
  return (
    <AppShell {...props} page="detail">
      <div className="page content-page">
        <button className="back-link" onClick={() => props.onNavigate("cvs")}>
          ← QUAY LẠI DANH SÁCH CV
        </button>
        <div className="detail-heading">
          <div>
            <Kicker>DOCUMENT / CCH-2025-0842</Kicker>
            <h2>
              Product Designer cấp cao<span>.</span>
            </h2>
            <p>Cập nhật 2 giờ trước bởi Nguyễn Minh Anh</p>
          </div>
          <div className="heading-actions">
            <Button
              variant="light"
              icon="link"
              onClick={() => props.onNavigate("shares")}
            >
              CHIA SẺ
            </Button>
            <Button icon="edit">CHỈNH SỬA</Button>
          </div>
        </div>
        <div className="detail-grid">
          <div className="document-preview">
            <div className="preview-paper">
              <div className="preview-name">NGUYỄN MINH ANH</div>
              <div className="preview-role">SENIOR PRODUCT DESIGNER</div>
              <div className="preview-line wide" />
              <div className="preview-columns">
                <div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i key={i} />
                  ))}
                </div>
                <div>
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <i key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="version-panel content-card">
            <div className="section-title">
              <h3>Lịch sử phiên bản</h3>
              <span>05 PHIÊN BẢN</span>
            </div>
            {[
              ["v8.2", "Hiện tại", "Hôm nay, 09:42", "Cập nhật dự án Fintech"],
              ["v8.1", "Ổn định", "10/05/2025", "Tinh chỉnh phần kỹ năng"],
              ["v8.0", "Mốc chính", "02/05/2025", "Thiết kế lại bố cục"],
              ["v7.3", "Lưu trữ", "18/04/2025", "Bổ sung kinh nghiệm Acme"],
            ].map(([version, status, date, note], index) => (
              <div className="version-row" key={version}>
                <span className={index === 0 ? "version active" : "version"}>
                  {version}
                </span>
                <span>
                  <b>{status}</b>
                  <small>{note}</small>
                </span>
                <time>{date}</time>
                <button>KHÔI PHỤC</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
