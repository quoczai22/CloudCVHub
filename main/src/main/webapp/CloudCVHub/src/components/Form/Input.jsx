export default function Input({
  label,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  error,
  ...props
}) {
  return (
    <label className={`field ${className}`.trim()}>
      {label && <span>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="field-error text-xs text-red-500 font-mono mt-1">{error}</span>}
    </label>
  )
}
