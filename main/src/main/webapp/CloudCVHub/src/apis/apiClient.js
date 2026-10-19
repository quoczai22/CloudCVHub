const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Tạo URL đầy đủ cho API endpoint
 * @param {string} path - Đường dẫn API (ví dụ: "/api/v1/auth/login")
 * @returns {string} Đường dẫn đầy đủ
 */
export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

/**
 * Fetch wrapper có gắn sẵn headers mặc định và Authorization token nếu có
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} [options={}] - Tuỳ chọn fetch
 * @returns {Promise<Response>}
 */
export async function apiClient(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(apiUrl(endpoint), {
    ...options,
    headers,
  });

  return response;
}

export default apiClient;
