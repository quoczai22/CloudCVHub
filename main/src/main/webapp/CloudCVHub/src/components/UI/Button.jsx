import Icon from './Icon'

export default function Button({
  children,
  icon,
  variant = "dark",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {icon && <Icon name={icon} size={17} />}
      {children}
    </button>
  )
}
