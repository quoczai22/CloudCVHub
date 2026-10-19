/**
 * Định dạng chuỗi ngày tháng sang định dạng tiếng Việt hoặc tùy chọn
 * @param {string|Date} date - Giá trị ngày tháng
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  }).format(d);
}

export default formatDate;
