export default function ProtectedRoute({ isAuthenticated, children, fallback }) {
  if (!isAuthenticated) {
    return fallback || null
  }
  return children
}
