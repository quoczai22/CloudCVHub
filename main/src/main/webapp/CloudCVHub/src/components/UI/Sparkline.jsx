export default function Sparkline({ variant = 0 }) {
  const data = [
    [10, 24, 18, 32, 28, 44, 40],
    [5, 12, 28, 22, 38, 30, 48],
    [20, 16, 24, 20, 36, 28, 52],
    [12, 18, 14, 28, 24, 38, 42],
  ][variant % 4]
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 120
      const y = 30 - ((v - min) / (max - min || 1)) * 24
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg className="sparkline" viewBox="0 0 120 34" aria-hidden="true">
      <polyline points={pts} />
    </svg>
  )
}
