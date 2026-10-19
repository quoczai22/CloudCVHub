import { useEffect } from 'react';
import { X, CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

function Alert({
    message,
    type = 'error', // 'success' | 'error' | 'info' | 'warning'
    isOpen,
    onClose,
    autoCloseDuration = 6000 // Tự động đóng sau 6 giây
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

    // Neo-brutalist alert styles
    const styles = {
        success: {
            bg: 'bg-emerald-100 border-2 border-black text-emerald-950',
            iconColor: 'text-emerald-800',
            icon: <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />,
            closeBtn: 'text-black bg-white hover:bg-black hover:text-white',
            barBg: 'bg-emerald-700'
        },
        error: {
            bg: 'bg-rose-100 border-2 border-black text-rose-950',
            iconColor: 'text-[#FF4B2B]',
            icon: <XCircle className="w-5 h-5" strokeWidth={2.5} />,
            closeBtn: 'text-black bg-white hover:bg-black hover:text-white',
            barBg: 'bg-[#FF4B2B]'
        },
        warning: {
            bg: 'bg-amber-100 border-2 border-black text-amber-950',
            iconColor: 'text-amber-800',
            icon: <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />,
            closeBtn: 'text-black bg-white hover:bg-black hover:text-white',
            barBg: 'bg-amber-700'
        },
        info: {
            bg: 'bg-sky-100 border-2 border-black text-sky-950',
            iconColor: 'text-sky-800',
            icon: <Info className="w-5 h-5" strokeWidth={2.5} />,
            closeBtn: 'text-black bg-white hover:bg-black hover:text-white',
            barBg: 'bg-sky-700'
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
                    fixed top-5 right-5 z-50 max-w-sm w-[calc(100vw-40px)] sm:w-96 p-4 rounded-xl 
                    shadow-[4px_4px_0px_#000] flex items-start gap-3 font-mono
                    transition-all duration-200 overflow-hidden
                    ${currentStyle.bg}
                `}
            >
                <div className={`shrink-0 mt-0.5 ${currentStyle.iconColor}`}>
                    {currentStyle.icon}
                </div>

                <div className="flex-1 text-xs font-bold leading-relaxed pb-1 uppercase">
                    {message}
                </div>

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className={`shrink-0 rounded-lg p-1 border border-black transition-colors cursor-pointer ${currentStyle.closeBtn}`}
                    >
                        <X size={15} strokeWidth={2.5} />
                    </button>
                )}

                {/* Thanh thời gian chạy ở dưới */}
                <div className={`absolute bottom-0 left-0 h-1.5 alert-progress-bar ${currentStyle.barBg}`} />
            </div>
        </>
    );
}

export default Alert;
