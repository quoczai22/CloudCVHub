import { useEffect } from 'react'
import Icon from './Icon'
import Button from './Button'

export default function ConfirmModal({
  isOpen,
  title = "Xác nhận hành động",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmLabel = "XÁC NHẬN",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onCancel?.()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md bg-white border-3 border-black shadow-[8px_8px_0_0_#000] p-6 text-left"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        {/* Header with warning icon */}
        <div className="flex items-start gap-3 border-b-2 border-black pb-4 mb-4">
          <div className="w-10 h-10 border-2 border-black bg-[#ff416c] text-white flex items-center justify-center font-bold text-lg shadow-[2px_2px_0_#000] flex-shrink-0">
            !
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#ff416c] uppercase tracking-wider block">
              // HÀNH ĐỘNG QUẢN TRỊ NGUY HIỂM
            </span>
            <h3 id="confirm-modal-title" className="text-lg font-black text-black m-0 leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="text-xs text-neutral-700 leading-relaxed mb-6 font-mono">
          {message}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="light"
            onClick={onCancel}
            className="flex-1 sm:flex-none text-xs"
          >
            HỦY BỎ
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            className="flex-1 sm:flex-none text-xs font-bold"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
