import Icon from '../../Atoms/Icon/Icon'

export default function TableData({ columns = [], data = [], onAction }) {
  return (
    <div className="table-responsive border-2 border-black shadow-[4px_4px_0_0] shadow-black bg-white">
      <table className="w-full text-left font-mono text-xs">
        <thead className="bg-black text-white uppercase tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="p-3 border-b-2 border-black">{col.label}</th>
            ))}
            <th className="p-3 text-right">THAO TÁC</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/20">
          {data.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-yellow-50 transition-colors">
              {columns.map((col, cIdx) => (
                <td key={cIdx} className="p-3">{row[col.key]}</td>
              ))}
              <td className="p-3 text-right">
                <button
                  type="button"
                  onClick={() => onAction?.(row)}
                  className="p-1 border border-black hover:bg-black hover:text-white"
                  aria-label="Thao tác"
                >
                  <Icon name="menu" size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
