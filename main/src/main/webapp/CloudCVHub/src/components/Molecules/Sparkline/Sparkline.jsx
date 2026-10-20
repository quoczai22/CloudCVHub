export default function Sparkline({ variant = 0 }) {
  const paths = [
    "M2 38 18 29 34 34 52 14 70 22 88 9 106 18 124 5",
    "M2 31 18 35 34 20 52 26 70 13 88 22 106 8 124 12",
    "M2 36 18 22 34 30 52 11 70 18 88 5 106 14 124 3",
    "M2 28 18 32 34 18 52 24 70 10 88 18 106 12 124 4",
  ]
  return (
    <svg className="sparkline" viewBox="0 0 126 44" aria-hidden="true">
      <path className="spark-grid" d="M0 42h126M0 22h126M0 2h126" />
      <path d={paths[variant % paths.length]} />
    </svg>
  )
}

