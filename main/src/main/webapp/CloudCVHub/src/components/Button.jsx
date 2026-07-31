import { Loader2 } from 'lucide-react';

function Button({
    children,
    isLoading = false,
    loadingText = "Đang xử lý...",
    type = "button",
    disabled = false,
    className = "",
    onClick,
    ...props
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                w-full py-3.5 px-4 rounded-2xl font-semibold text-white
                transition-all duration-200 ease-in-out
                flex items-center justify-center gap-2
                cursor-pointer
                
                /* Hiệu ứng trạng thái */
                ${(disabled || isLoading)
                    ? 'bg-slate-400 cursor-not-allowed shadow-none'
                    : className.includes('bg-')
                        ? ''
                        : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35'
                }
                
                /* Hỗ trợ accessibility phím Tab */
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
