/**
 * Schema xác thực dữ liệu đăng nhập và đăng ký
 */
export const authSchema = {
  validateLogin: ({ username, password }) => {
    const errors = {};
    if (!username || !username.trim()) {
      errors.username = 'Tên đăng nhập không được để trống';
    }
    if (!password || password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateRegister: ({ username, password, confirmPassword, email }) => {
    const errors = {};
    if (!username || !username.trim()) {
      errors.username = 'Tên đăng nhập không được để trống';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!password || password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export default authSchema;
