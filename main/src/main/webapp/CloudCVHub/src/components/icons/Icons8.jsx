// Bộ biểu tượng vector SVG thiết kế theo chuẩn phong cách Icons8 (Sharp & Line Duo-Brutalist)
// Tối ưu hóa tương thích React, sắc nét và kích thước linh hoạt

export function Icons8Resume({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Khung tài liệu CV với góc gập chuẩn Icons8 */}
      <path d="M10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M30 4V14H40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Khối ảnh chân dung hồ sơ */}
      <rect x="14" y="16" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="18.5" cy="19.5" r="2" fill="currentColor" />
      <path d="M15.5 24C15.5 22.8 16.8 22 18.5 22C20.2 22 21.5 22.8 21.5 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Các dòng thông tin kinh nghiệm & kỹ năng */}
      <line x1="27" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="27" y1="23" x2="34" y2="23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="36" x2="28" y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8Dashboard({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Biểu tượng Dashboard 4 khối ô lưới chuẩn Icons8 */}
      <rect x="6" y="6" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="27" y="6" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="6" y="27" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="27" y="27" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Điểm nhấn chi tiết bên trong các widget */}
      <circle cx="13.5" cy="13.5" r="2.5" fill="currentColor" />
      <line x1="31" y1="13.5" x2="38" y2="13.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="34.5" x2="17" y2="34.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M31 36L34 33L38 37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8Speedometer({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 32C6.7 29.5 6 26.8 6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24C42 26.8 41.3 29.5 40 32" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="30" r="4" stroke="currentColor" strokeWidth="3" fill="none" />
      <line x1="24" y1="26" x2="32" y2="16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="12" y1="24" x2="16" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="12" x2="24" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8Plus({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 8V40M8 24H40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8ShieldSecure({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 4L8 10V22C8 32.5 14.8 42.1 24 45C33.2 42.1 40 32.5 40 22V10L24 4Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M17 23L22 28L31 19" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8Layers({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 6L6 16L24 26L42 16L24 6Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M6 25L24 35L42 25" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 34L24 44L42 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8Lock({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="20" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <path d="M16 20V14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14V20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" />
      <line x1="24" y1="32.5" x2="24" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8CloudStorage({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14 38H36C40.4183 38 44 34.4183 44 30C44 25.8 40.8 22.4 36.7 22.1C35.8 15.3 30 10 23 10C16.8 10 11.5 14.1 9.7 19.8C5.4 20.6 2 24.4 2 29C2 33.9706 6.02944 38 11 38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="24" y1="26" x2="24" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 30L24 26L28 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8Database({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="24" cy="11" rx="16" ry="6" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <path d="M8 11V23C8 26.3137 15.1634 29 24 29C32.8366 29 40 26.3137 40 23V11" stroke="currentColor" strokeWidth="3.5" />
      <path d="M8 23V35C8 38.3137 15.1634 41 24 41C32.8366 41 40 38.3137 40 35V23" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}

export function Icons8User({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="15" r="8" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <path d="M8 41C8 33 15 27 24 27C33 27 40 33 40 41" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8Edit({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M34 6L42 14L16 40H8V32L34 6Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="28" y1="12" x2="36" y2="20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8Trash({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 12H40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 12V6H30V12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 12L15 41C15.1 42.1 16 43 17.1 43H30.9C32 43 32.9 42.1 33 41L36 12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="20" y1="20" x2="20" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="20" x2="28" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8Link({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M28 14L34 8C37.3 4.7 42.7 4.7 46 8C49.3 11.3 49.3 16.7 46 20L40 26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 34L14 40C10.7 43.3 5.3 43.3 2 40C-1.3 36.7 -1.3 31.3 2 28L8 22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="30" x2="30" y2="18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Icons8History({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 24C8 15.1634 15.1634 8 24 8C32.8366 8 40 15.1634 40 24C40 32.8366 32.8366 40 24 40C17.5 40 12 36.1 9.5 30.5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <polyline points="4 22 8 26 12 22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="24 14 24 24 30 28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8Check({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 25L19 36L40 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Icons8Copy({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="16" y="16" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <path d="M32 16V10C32 8.9 31.1 8 30 8H10C8.9 8 8 8.9 8 10V30C8 31.1 8.9 32 10 32H16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
