import Icon from './Icon'
import Button from './Button'

export default function EmptyState({
  icon = "file",
  title = "Chưa có dữ liệu nào",
  description = "Hiện tại không tìm thấy bản ghi hoặc tài liệu nào phù hợp với điều kiện tìm kiếm.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="border-2 border-dashed border-black bg-white p-8 text-center flex flex-col items-center justify-center my-4 font-mono shadow-[4px_4px_0_#000]">
      <div className="w-14 h-14 border-2 border-black bg-[#fbca1f] text-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
        <Icon name={icon} size={28} />
      </div>

      <h4 className="text-base font-black text-black m-0 mb-1 tracking-tight">
        {title}
      </h4>

      <p className="text-xs text-neutral-600 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="yellow" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
