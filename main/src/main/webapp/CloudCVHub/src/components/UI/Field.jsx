export default function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  style,
  ...props
}) {
  return (
    <div
      className={`input__container ${className}`.trim()}
      data-label={label || ""}
      style={style}
    >
      <div className="shadow__input" />
      <input
        type={type}
        className="input__search"
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

