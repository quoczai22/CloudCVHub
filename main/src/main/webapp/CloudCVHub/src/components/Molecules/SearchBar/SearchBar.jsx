import Input from '../../Atoms/Input/Input'
import Button from '../../Atoms/Button/Button'
import Icon from '../../Atoms/Icon/Icon'

export default function SearchBar({
  placeholder = "Tìm theo tên, kỹ năng...",
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
    <form onSubmit={handleSubmit} className={`flex border-2 border-black shadow-[4px_4px_0_0] shadow-black focus-within:ring-2 focus-within:ring-yellow-300 bg-white ${className}`.trim()}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border-none bg-white text-black px-3 py-2 text-xs font-mono focus:outline-none"
      />
      <Button
        type="submit"
        variant="yellow"
        className="border-none border-l-2 border-black rounded-none px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="search" size={14} />
      </Button>
    </form>
  )
}
