export default function SearchBar({
  placeholder = "TÌM KIẾM HỒ SƠ...",
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
    <form
      onSubmit={handleSubmit}
      className={`neo-search-box flex border-2 border-black shadow-[4px_4px_0_0] shadow-black focus-within:ring-2 focus-within:ring-yellow-300 bg-white ${className}`.trim()}
    >
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e)
          onSearch?.(e.target.value)
        }}
        className="neo-search-input w-full border-none bg-white text-black px-3 py-1.5 focus:ring-0 sm:text-xs font-mono outline-none"
      />
      <button
        type="submit"
        className="neo-search-btn bg-yellow-300 border-l-2 border-black px-3 py-1.5 text-xs/none font-bold tracking-wide uppercase hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-0 cursor-pointer font-mono"
      >
        Search
      </button>
    </form>
  )
}
