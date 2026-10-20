export default function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <label className={`field ${className}`.trim()}>
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  )
}
