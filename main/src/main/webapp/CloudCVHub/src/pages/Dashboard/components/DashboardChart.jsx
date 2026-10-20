import Sparkline from '../../../components/UI/Sparkline'

export default function DashboardChart() {
  const stats = [
    ["TỔNG CV", "12", "+2 THÁNG NÀY", 0],
    ["LƯỢT XEM", "348", "+18.4%", 1],
    ["LIÊN KẾT", "08", "6 ĐANG BẬT", 2],
    ["ĐIỂM TRUNG BÌNH", "92", "TOP 8%", 0],
  ]

  return (
    <div className="stat-grid" aria-label="Biểu đồ thống kê tổng quan">
      {stats.map(([label, value, change, variant], i) => (
        <div
          className={`stat-card ${i === 1 ? "stat-yellow" : ""}`}
          key={label}
        >
          <div className="stat-head">
            <span>{label}</span>
            <b>0{i + 1}</b>
          </div>
          <div className="stat-value">{value}</div>
          <div className="stat-foot">
            <span className={i === 1 ? "dark-chip" : ""}>↗ {change}</span>
            <Sparkline variant={variant} />
          </div>
        </div>
      ))}
    </div>
  )
}
