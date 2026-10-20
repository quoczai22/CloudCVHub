import { useEffect } from 'react';
import { X } from 'lucide-react';

function Alert({
  message,
  type = 'error', // 'success' | 'error' | 'info' | 'warning'
  isOpen,
  onClose,
  autoCloseDuration = 5000,
}) {
  useEffect(() => {
    if (isOpen && autoCloseDuration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen || !message) return null;

  // HyperUI Neobrutalism Alert Styles
  const variants = {
    info: {
      label: 'Thông tin: ',
      classes: 'border-2 border-black bg-blue-100 text-blue-900 shadow-[4px_4px_0_0] shadow-black',
      barColor: 'bg-blue-600',
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="mt-0.5 size-4 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    success: {
      label: 'Thành công: ',
      classes: 'border-2 border-black bg-green-100 text-green-900 shadow-[4px_4px_0_0] shadow-black',
      barColor: 'bg-green-600',
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="mt-0.5 size-4 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      label: 'Lỗi: ',
      classes: 'border-2 border-black bg-red-100 text-red-900 shadow-[4px_4px_0_0] shadow-black',
      barColor: 'bg-red-600',
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="mt-0.5 size-4 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      label: 'Cảnh báo: ',
      classes: 'border-2 border-black bg-yellow-100 text-yellow-900 shadow-[4px_4px_0_0] shadow-black',
      barColor: 'bg-yellow-600',
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="mt-0.5 size-4 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const current = variants[type] || variants.error;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        .alert-progress-bar {
          animation: shrinkWidth ${autoCloseDuration}ms linear forwards;
        }
      `}} />
      <div
        role="alert"
        className={`fixed top-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] sm:w-96 p-4 font-mono transition-all duration-200 overflow-hidden ${current.classes}`}
      >
        <div className="flex items-start gap-3">
          {current.icon}

          <strong className="block flex-1 text-xs leading-tight font-semibold">
            <span className="sr-only">{current.label}</span>
            {message}
          </strong>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng thông báo"
              className="shrink-0 -mr-1 -mt-1 p-0.5 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Thanh thời gian chạy ở đáy */}
        <div className={`absolute bottom-0 left-0 h-1 alert-progress-bar ${current.barColor}`} />
      </div>
    </>
  );
}

export default Alert;
