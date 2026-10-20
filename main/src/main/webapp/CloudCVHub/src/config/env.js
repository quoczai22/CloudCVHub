export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_URL || "https://spring-quoc-production.up.railway.app",
  IS_PROD: import.meta.env.PROD,
  IS_DEV: import.meta.env.DEV,
}

export default ENV
