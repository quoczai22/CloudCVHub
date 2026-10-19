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
    const isCustomBg = className.includes('bg-');

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                py-2.5 px-4 rounded-xl font-bold uppercase tracking-wide
                font-mono transition-all duration-150 ease-in-out
                flex items-center justify-center gap-2 border-2 border-black
                
                ${(disabled || isLoading)
                    ? 'bg-zinc-300 text-zinc-600 cursor-not-allowed shadow-none opacity-80'
                    : isCustomBg
                        ? 'cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]'
                        : 'cursor-pointer bg-[#FF5E5B] hover:bg-[#FF4B2B] text-white shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]'
                }
                
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={3} />
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
