import { Check } from 'lucide-react';

function LoginSidebar() {
    return (
        <div className="hidden lg:flex lg:w-[500px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-12 flex-col justify-between shrink-0 margin-left-100 relative overflow-hidden">
            {/* Decorative background blobs (Hiệu ứng bóng bóng phát sáng) */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-400/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <div className='flex items-center gap-2.5 mb-12'>
                    <span className='text-white text-4xl font-bold tracking-tight'>&#128221;</span>
                    <span className='text-white text-5xl font-bold tracking-tight'>CloudCVHub</span>
                </div>
                <h2 className="chu-cau-vong">
                    Hồ sơ của bạn,mọi lúc mọi nơi.
                </h2>
                <p className="text-blue-100 leading-relaxed text-lg">
                    Lưu trữ và chia sẻ CV an toàn trên Cloud. Có thể tiếp cận từ bất kỳ thiết bị nào.
                </p>
            </div>
            <div className="space-y-3 relative z-10">
                {[
                    'Bảo mật AES-256',
                    'Quản lý đa phiên bản CV',
                    'Chia sẻ có kiểm soát',
                ].map((f, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-lg bg-cyan-400/15 border border-cyan-400/35 flex items-center justify-center">
                            <Check size={14} className="text-cyan-400" />
                        </div>
                        <span className="text-md text-white">{f}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LoginSidebar;
