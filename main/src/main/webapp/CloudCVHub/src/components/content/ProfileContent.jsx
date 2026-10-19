import { 
    Icons8ShieldSecure, 
    Icons8Layers, 
    Icons8Database, 
    Icons8User, 
    Icons8Check 
} from '../icons/Icons8.jsx';

function ProfileContent({ user, displayName, resumes }) {
    const avatarText = (displayName || "Người dùng")
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    // Tính toán dung lượng lưu trữ thực tế
    const totalSizeBytes = resumes.reduce((acc, cv) => acc + (cv.content ? cv.content.length : 0), 0);
    const sizeInKB = (totalSizeBytes / 1024).toFixed(2);
    const sizeInMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
    const sizeDisplay = totalSizeBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
    const limitBytes = 10 * 1024 * 1024; // Giới hạn 10 MB cho thiết kế thực tế
    const sizePercentage = Math.min((totalSizeBytes / limitBytes) * 100, 100).toFixed(1);
    const sizeProgressDisplay = `${sizeDisplay} / 10 MB`;
    const handleName = user?.email ? `@${user.email.split('@')[0]}` : "@cloudcv_user";

    return (
        <div className="max-w-5xl mx-auto font-mono space-y-8">
            {/* Top Grid: Left = Two-Tone Overlapping Avatar ID Card | Right = Account Details & Quota */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
                
                {/* 1. RETRO BRUTALIST ID BADGE CARD (Mô phỏng mẫu thẻ ID nổi bật) */}
                <div className="lg:col-span-5 flex justify-center pt-8">
                    <div className="w-full max-w-xs relative transition-transform duration-200 hover:-translate-y-1">
                        
                        {/* Avatar tròn nổi đè mép trên */}
                        <div className="w-24 h-24 rounded-full bg-[#FFF275] border-3 border-black shadow-[4px_4px_0px_#000] absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center font-black text-2xl text-black">
                            {avatarText || "CV"}
                        </div>

                        {/* Thẻ chính chia 2 nửa */}
                        <div className="bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden flex flex-col">
                            {/* Nửa trên: Header màu cam đỏ #FF5E5B */}
                            <div className="bg-[#FF5E5B] border-b-2 border-black pt-16 pb-6 px-4 text-center">
                                <h3 className="font-black text-lg text-black uppercase tracking-tight truncate">
                                    {displayName}
                                </h3>
                                <p className="text-xs font-bold text-black/85 mt-0.5 truncate">
                                    {handleName}
                                </p>
                                <div className="mt-3 inline-block">
                                    <span className="px-2.5 py-0.5 rounded border border-black bg-white text-black text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                                        HỘI VIÊN CHÍNH THỨC
                                    </span>
                                </div>
                            </div>

                            {/* Nửa dưới: Danh sách các quyền lợi & thông số thẻ */}
                            <div className="p-6 bg-white space-y-3.5">
                                <ul className="space-y-3 font-bold text-xs text-black">
                                    <li className="flex items-center gap-2.5">
                                        <Icons8ShieldSecure size={18} className="text-[#FF4B2B] shrink-0" />
                                        <span>Bảo mật AES-256 Cloud</span>
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Icons8Layers size={18} className="text-blue-600 shrink-0" />
                                        <span>{resumes.length} Hồ sơ CV đã tạo</span>
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Icons8Database size={18} className="text-emerald-600 shrink-0" />
                                        <span>Dung lượng: {sizeDisplay}</span>
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Icons8Check size={18} className="text-violet-600 shrink-0" />
                                        <span>Chia sẻ link có mật khẩu</span>
                                    </li>
                                </ul>

                                <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-bold text-zinc-500">
                                    <span>TRẠNG THÁI</span>
                                    <span className="text-black bg-[#FFF275] border border-black px-1.5 py-0.2 rounded text-[10px] font-black uppercase">
                                        KÍCH HOẠT
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT DETAILS PANEL: Bảng thông tin chi tiết & Hạn mức */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Thẻ chi tiết hồ sơ */}
                    <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-[5px_5px_0px_#000]">
                        <h4 className="font-black text-black text-sm uppercase tracking-tight pb-3 border-b-2 border-black mb-4 flex items-center gap-2">
                            <Icons8User size={18} className="text-[#FF4B2B]" />
                            CHI TIẾT TÀI KHOẢN
                        </h4>

                        <div className="space-y-3">
                            <div className="p-3 border-2 border-black rounded-xl bg-zinc-50 flex items-center justify-between">
                                <span className="text-xs font-black text-zinc-600 uppercase">Họ và tên</span>
                                <span className="text-xs font-bold text-black uppercase">{displayName}</span>
                            </div>

                            <div className="p-3 border-2 border-black rounded-xl bg-zinc-50 flex items-center justify-between">
                                <span className="text-xs font-black text-zinc-600 uppercase">Email</span>
                                <span className="text-xs font-bold text-black truncate max-w-[220px]">
                                    {user.email || "user@cloudcvhub.io"}
                                </span>
                            </div>

                            <div className="p-3 border-2 border-black rounded-xl bg-zinc-50 flex items-center justify-between">
                                <span className="text-xs font-black text-zinc-600 uppercase">Quyền hạn</span>
                                <span className="text-xs font-black text-white bg-black border border-black rounded px-2 py-0.5 uppercase">
                                    {user.role || "USER_STANDARD"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Thẻ hạn mức lưu trữ */}
                    <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-[5px_5px_0px_#000]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-black text-black uppercase flex items-center gap-1.5">
                                <Icons8Database size={16} /> Hạn mức lưu trữ đám mây
                            </span>
                            <span className="text-xs font-bold text-black bg-yellow-100 border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                                {sizeProgressDisplay}
                            </span>
                        </div>

                        <div className="w-full bg-zinc-200 border-2 border-black h-3.5 rounded-full overflow-hidden my-3">
                            <div 
                                className="bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] h-full transition-all duration-300" 
                                style={{ width: `${Math.max(parseFloat(sizePercentage), 3)}%` }} 
                            />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-600 pt-1">
                            <span>Đã dùng: {sizePercentage}%</span>
                            <span>Giới hạn tối đa: 10 MB</span>
                        </div>
                    </div>

                    {/* Thẻ chứng thực bảo mật */}
                    <div className="p-4 rounded-xl border-2 border-black bg-rose-50/70 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-black">
                            <Icons8ShieldSecure size={18} className="text-[#FF4B2B] shrink-0" />
                            <span>Mã hóa AES-256 & Băm toàn vẹn SHA-256 bảo vệ hồ sơ</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-black">
                            <Icons8Layers size={18} className="text-[#FF4B2B] shrink-0" />
                            <span>Quản lý đa phiên bản độc lập và chia sẻ link bảo mật</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileContent;
