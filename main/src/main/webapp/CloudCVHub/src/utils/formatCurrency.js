/**
 * Định dạng số tiền sang tiền tệ VND hoặc tùy chọn
 * @param {number} amount - Số tiền
 * @param {string} [currency='VND'] - Mã tiền tệ
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'VND') {
  if (typeof amount !== 'number') return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount);
}

export default formatCurrency;
