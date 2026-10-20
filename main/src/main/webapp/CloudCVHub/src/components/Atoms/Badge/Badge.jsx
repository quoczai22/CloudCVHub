export default function Badge({ children, variant = "default", className = "" }) {
  return (
    <span className={`kicker kicker-${variant} ${className}`.trim()}>
      {children}
    </span>
  )
}
