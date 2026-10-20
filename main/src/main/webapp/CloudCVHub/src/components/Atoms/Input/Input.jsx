export default function Input({
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className={`neobrutal-input ${className}`.trim()}
      {...props}
    />
  )
}
