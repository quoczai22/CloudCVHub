import { useEffect } from 'react';
import { X, CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

function Alert({
    message,
    type = 'error', // 'success' | 'error' | 'info' | 'warning'
    isOpen,
    onClose,
    autoCloseDuration = 7000 // Tự động đóng sau 7 giây
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

    // Định nghĩa styles cho từng loại Alert
    const styles = {
        success: {
            bg: 'bg-green-50 border-green-200',
            text: 'text-green-800',
            iconColor: 'text-green-500',
            icon: <CheckCircle2 className="w-5 h-5" />,
            closeBtn: 'text-green-400 hover:text-green-700',
            barBg: 'bg-green-500/80'
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            text: 'text-red-800',
            iconColor: 'text-red-500',
            icon: <XCircle className="w-5 h-5" />,
            closeBtn: 'text-red-400 hover:text-red-700',
            barBg: 'bg-red-500/80'
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            text: 'text-yellow-800',
            iconColor: 'text-yellow-500',
            icon: <AlertTriangle className="w-5 h-5" />,
            closeBtn: 'text-yellow-400 hover:text-yellow-700',
            barBg: 'bg-yellow-500/80'
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            text: 'text-blue-800',
            iconColor: 'text-blue-500',
            icon: <Info className="w-5 h-5" />,
            closeBtn: 'text-blue-400 hover:text-blue-700',
            barBg: 'bg-blue-500/80'
        }
    };

    const currentStyle = styles[type] || styles.error;

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shrinkWidth {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .alert-progress-bar {
                    animation: shrinkWidth ${autoCloseDuration / 10}ms linear forwards;
                }
            `}} />
            <div
                className={`
                    fixed top-5 right-5 z-50 max-w-sm w-[calc(100vw-40px)] sm:w-96 p-4 rounded-xl border shadow-xl flex items-start gap-3 
                    transition-all duration-300 ease-in-out animate-slide-in overflow-hidden
                    ${currentStyle.bg} ${currentStyle.text}
                `}
            >
                <div className={`shrink-0 mt-0.5 ${currentStyle.iconColor}`}>
                    {currentStyle.icon}
                </div>

                <div className="flex-1 text-sm font-medium leading-relaxed pb-1">
                    {message}
                </div>

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className={`shrink-0 rounded-lg p-0.5 transition-colors cursor-pointer ${currentStyle.closeBtn}`}
                    >
                        <X size={18} />
                    </button>
                )}

                {/* Thanh thời gian chạy ở dưới */}
                <div className={`absolute bottom-0 left-0 h-1 alert-progress-bar ${currentStyle.barBg}`} />
            </div>
        </>
    );
}

export default Alert;
