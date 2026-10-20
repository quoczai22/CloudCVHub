import Icon from './Icon'

export default function Modal({ isOpen, title, onClose, children, footer }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="border-3 border-black bg-white p-6 shadow-[6px_6px_0_0] shadow-black max-w-lg w-full">
        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-black">
          <h3 className="text-lg font-bold uppercase tracking-wider">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
            aria-label="Đóng"
          >
            <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="modal-body py-2">{children}</div>
        {footer && <div className="modal-footer mt-4 pt-3 border-t-2 border-black flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
