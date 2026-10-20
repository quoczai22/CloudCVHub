import Button from '../../components/UI/Button'
import Icon from '../../components/UI/Icon'

export default function NotFoundPage({ onGoHome }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50 font-mono text-center">
      <div className="border-3 border-black bg-white p-8 shadow-[6px_6px_0_0] shadow-black max-w-md w-full">
        <h1 className="text-6xl font-black mb-2">404</h1>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-4">// KHÔNG TÌM THẤY TRANG</h2>
        <p className="text-sm text-gray-700 mb-6">Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển vào kho lưu trữ khác.</p>
        <Button variant="yellow" onClick={onGoHome} className="w-full justify-center">
          <Icon name="arrow" size={16} /> QUAY VỀ BÀN LÀM VIỆC
        </Button>
      </div>
    </div>
  )
}
