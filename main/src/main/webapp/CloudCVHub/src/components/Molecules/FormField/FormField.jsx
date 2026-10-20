export default function FormField({
  label,
  type = "text",
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  required = false,
  className = "",
  ...props
}) {
  return (
    <label className={`field ${className}`.trim()}>
      {label && (
        <span className="flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider">
          {label} {required && <b className="text-red-500">*</b>}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        {...props}
      />
      {error && <span className="field-error text-xs text-red-500 font-mono mt-1">{error}</span>}
    </label>
  )
}
