import Kicker from '../../../components/UI/Kicker'
import Button from '../../../components/UI/Button'

export default function DashboardSummary({ onNavigate }) {
  return (
    <div className="page-heading">
      <div>
        <Kicker>THỨ HAI, 12 THÁNG 5</Kicker>
        <h2>
          Trung tâm điều hành<span>.</span>
        </h2>
        <p>
          Chào Minh Anh. Kho CV của bạn đang an toàn và hoạt động ổn định.
        </p>
      </div>
      <Button icon="plus" onClick={() => onNavigate?.("upload")}>
        TẠO CV MỚI
      </Button>
    </div>
  )
}
