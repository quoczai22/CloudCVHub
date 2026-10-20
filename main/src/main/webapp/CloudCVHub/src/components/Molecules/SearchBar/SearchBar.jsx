import Icon from '../../Atoms/Icon/Icon'

export default function SearchBar({
  placeholder = "TÌM KIẾM...",
  value,
  onChange,
  onSearch,
  className = "",
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(value)
  }

  return (
    <form onSubmit={handleSubmit} className={`search ${className}`.trim()}>
      <Icon name="search" size={18} />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e)
          onSearch?.(e.target.value)
        }}
      />
      <kbd>⌘ K</kbd>
    </form>
  )
}
