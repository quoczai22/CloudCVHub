export default function ProgressBar({
  value = 0,
  max = 100,
  min = 0,
  label = "Tiến độ lưu trữ",
  className = "my-3 w-full",
}) {
  const percent = Math.min(Math.max(value, min), max)
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label}
      className={className}
    >
      <div className="w-full border-2 border-white bg-black p-1 shadow-[2px_2px_0_0] shadow-white">
        <div
          className="h-3 bg-[repeating-linear-gradient(45deg,#facc15_0,#facc15_10px,#eab308_10px,#eab308_20px)] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
