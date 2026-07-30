import './Login.css'
import { useState } from "react"
import { Check, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';

// Component Form Đăng Nhập
function SignInForm({ onToggleSignUp }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("error");

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true); // Bật hiệu ứng loading khi gửi request
        setSnackBarOpen(false); // Ẩn thông báo lỗi cũ nếu có

        fetch("http://localhost:8081/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Đăng nhập thất bại!");
                }

                return data;
            })
            .then((data) => {
                console.log("Response body:", data);

                // Lưu token vào localStorage
                if (data.result?.accessToken) {
                    localStorage.setItem("token", data.result.accessToken);
                }

                // Chuyển hướng về trang chủ
                setSnackBarType("success");
                setSnackBarMessage(data.message || "Đăng nhập thành công!");
                setSnackBarOpen(true);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            })
            .catch((error) => {
                // Xử lý khi có lỗi kết nối hoặc backend trả về mã lỗi
                setSnackBarType("error");
                setSnackBarMessage(error.message || "Không thể kết nối đến máy chủ.");
                setSnackBarOpen(true);
            })
            .finally(() => {
                setIsLoading(false); // Tắt hiệu ứng loading sau khi hoàn thành
            });
    };

    return (
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl border border-slate-100">
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800">Mừng bạn quay lại!</h3>
                <p className="text-sm text-slate-500 mt-2">Vui lòng nhập thông tin để truy cập CloudCVHub</p>
            </div>

            <Alert
                message={snackBarMessage}
                type={snackBarType}
                isOpen={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
            />

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ Email</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Mail size={18} />
                        </span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="emailcuaban@email.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Lock size={18} />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                        <span>Ghi nhớ đăng nhập</span>
                    </label>
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Quên mật khẩu?</a>
                </div>

                <Button type="submit" isLoading={isLoading} loadingText="Đang đăng nhập...">
                    Đăng nhập
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
                <span>Chưa có tài khoản? </span>
                <button onClick={onToggleSignUp} className="font-bold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none cursor-pointer">
                    Đăng ký ngay
                </button>
            </div>
        </div>
    );
}


// Component Form Đăng Ký
function SignUpForm({ onToggleSignIn }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("error");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setSnackBarType("warning");
            setSnackBarMessage("Mật khẩu xác nhận không khớp!");
            setSnackBarOpen(true);
            return;
        }

        setIsLoading(true);
        setSnackBarOpen(false);

        fetch("http://localhost:8081/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password,
            }),
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Đăng ký thất bại!");
                }

                return data;
            })
            .then((data) => {
                console.log("Register response:", data);

                setSnackBarType("success");
                setSnackBarMessage(data.message || "Đăng ký thành công! Đang chuyển hướng...");
                setSnackBarOpen(true);
                setTimeout(() => {
                    onToggleSignIn();
                }, 1500);
            })
            .catch((error) => {
                setSnackBarType("error");
                setSnackBarMessage(error.message || "Không thể kết nối đến máy chủ.");
                setSnackBarOpen(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-xl border border-slate-100">
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800">Tạo tài khoản mới</h3>
                <p className="text-sm text-slate-500 mt-2">Bắt đầu lưu trữ và quản lý CV của bạn miễn phí</p>
            </div>

            <Alert
                message={snackBarMessage}
                type={snackBarType}
                isOpen={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
            />

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <User size={18} />
                        </span>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ Email</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Mail size={18} />
                        </span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="emailcuaban@email.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Lock size={18} />
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Xác nhận mật khẩu</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Lock size={18} />
                        </span>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-slate-800"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <Button type="submit" isLoading={isLoading} loadingText="Đang tạo tài khoản...">
                    Đăng ký
                </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
                <span>Đã có tài khoản? </span>
                <button onClick={onToggleSignIn} className="font-bold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none cursor-pointer">
                    Đăng nhập
                </button>
            </div>
        </div>
    );
}

// Component Trang Đăng Nhập Chính (LoginPage)
function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false)
    return (
        <div className='min-h-screen bg-slate-50 flex'>
            {/* Cột bên trái: Giới thiệu dự án (Chỉ hiển thị trên màn hình lớn) */}
            <div className='hidden lg:flex lg:w-[500px] bg-blue-600 p-12 flex-col justify-between shrink-0 margin-left-100'>
                <div>
                    <div className='flex items-center gap-2.5 mb-12'>
                        <span className='text-white text-4xl font-bold tracking-tight'>&#128221;</span>
                        <span className='text-white text-5xl font-bold tracking-tight'>CloudCVHub</span>
                    </div>
                    <h2 className="chu-cau-vong">
                        Hồ sơ của bạn,mọi lúc mọi nơi.
                    </h2>
                    <p className="text-blue-100  leading-relaxed text-lg">
                        Lưu trữ và chia sẻ CV an toàn trên Cloud. Có thể tiếp cận từ bất kỳ thiết bị nào.
                    </p>
                </div>
                <div className="space-y-3">
                    {[
                        'Bảo mật AES-256',
                        'Quản lý đa phiên bản CV',
                        'Chia sẻ có kiểm soát',
                    ].map((f, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full bg-cyan-200 flex items-center justify-center">
                                <Check size={18} className="text-cyan-500" />
                            </div>
                            <span className="text-md text-white">{f}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cột bên phải: Form Đăng nhập hoặc Đăng ký */}
            <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                {showSignUp ? (
                    <SignUpForm onToggleSignIn={() => setShowSignUp(false)} />
                ) : (
                    <SignInForm onToggleSignUp={() => setShowSignUp(true)} />
                )}
            </div>
        </div >
    )
}

export default LoginPage
