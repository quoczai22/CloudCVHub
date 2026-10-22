import { useState } from 'react'
import Icon from '../../../components/UI/Icon'
import Kicker from '../../../components/UI/Kicker'
import Button from '../../../components/UI/Button'

export default function AdminCVsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterScan, setFilterScan] = useState("ALL")
  const [docs, setDocs] = useState([
    { id: "DOC-8921", title: "CV Product Designer 2026.pdf", owner: "Nguyễn Minh Anh", size: "2.8 MB", views: 184, scan: "AN TOÀN", date: "22/10/2026" },
    { id: "DOC-8922", title: "Design Lead Portfolio.pdf", owner: "Trần Thùy Dương", size: "4.1 MB", views: 92, scan: "AN TOÀN", date: "21/10/2026" },
    { id: "DOC-8923", title: "CV Marketing Manager.pdf", owner: "Lê Hoàng Nam", size: "1.9 MB", views: 31, scan: "CẦN DUYỆT", date: "21/10/2026" },
    { id: "DOC-8924", title: "Product Owner — Fintech.docx", owner: "Phạm Gia Hân", size: "3.4 MB", views: 126, scan: "AN TOÀN", date: "20/10/2026" },
    { id: "DOC-8925", title: "Fullstack_CV_Senior_Node.pdf", owner: "Vũ Tuấn Kiệt", size: "1.2 MB", views: 412, scan: "AN TOÀN", date: "19/10/2026" },
    { id: "DOC-8926", title: "Resume_Suspicious_Script.pdf", owner: "Unknown Applicant", size: "8.7 MB", views: 2, scan: "NGUY HIỂM", date: "18/10/2026" },
  ])

  const approveDoc = (id) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, scan: "AN TOÀN" } : d))
    )
  }

  const deleteDoc = (id) => {
    setDocs((prev) => prev.filter((d) => d.id !== id))
  }

  const filteredDocs = docs.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchScan = filterScan === "ALL" || d.scan === filterScan
    return matchSearch && matchScan
  })

  return (
    <div className="flex flex-col gap-6 font-mono">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div>
          <Kicker>AREA: ADMIN / CV REPOSITORY</Kicker>
          <h2 className="text-2xl md:text-3xl font-black text-black m-0 tracking-tight">
            KIỂM DUYỆT VÀ QUẢN LÝ CV<span>.</span>
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Giám sát tệp tin tải lên, phát hiện mã độc tự động và phê duyệt hồ sơ người dùng.
          </p>
        </div>

        <Button variant="yellow" icon="shield">
          QUÉT TOÀN BỘ REPO
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3 border-2 border-black shadow-[4px_4px_0_#000]">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Tìm theo Tên file CV, Chủ sở hữu hoặc Mã tài liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-mono pl-8 pr-3 py-2 border-2 border-black focus:outline-none focus:bg-[#fef08a]"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon name="search" size={14} />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-600">TRẠNG THÁI:</span>
          {["ALL", "AN TOÀN", "CẦN DUYỆT", "NGUY HIỂM"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterScan(f)}
              className={`px-2.5 py-1 text-xs font-bold border-2 border-black transition-all ${
                filterScan === f
                  ? "bg-[#fbca1f] text-black shadow-[2px_2px_0_#000] -translate-y-0.5"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Docs Table */}
      <div className="border-2 border-black bg-white shadow-[6px_6px_0_#000] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-black text-white font-bold uppercase tracking-wider border-b-2 border-black">
              <th className="p-3 border-r border-neutral-700">MÃ TÀI LIỆU</th>
              <th className="p-3 border-r border-neutral-700">TÊN HỒ SƠ CV</th>
              <th className="p-3 border-r border-neutral-700">CHỦ SỞ HỮU</th>
              <th className="p-3 border-r border-neutral-700 text-center">DUNG LƯỢNG</th>
              <th className="p-3 border-r border-neutral-700 text-center">LƯỢT XEM</th>
              <th className="p-3 border-r border-neutral-700 text-center">NGÀY TẢI LÊN</th>
              <th className="p-3 border-r border-neutral-700 text-center">AN TOÀN FILE</th>
              <th className="p-3 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-neutral-500 font-bold">
                  Không tìm thấy hồ sơ nào phù hợp!
                </td>
              </tr>
            ) : (
              filteredDocs.map((d, i) => (
                <tr
                  key={d.id}
                  className={`border-b border-black hover:bg-[#fff9db] transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                  }`}
                >
                  <td className="p-3 font-bold border-r border-neutral-200">{d.id}</td>
                  <td className="p-3 font-black text-black border-r border-neutral-200 flex items-center gap-2">
                    <Icon name="file" size={14} />
                    <span>{d.title}</span>
                  </td>
                  <td className="p-3 text-neutral-600 border-r border-neutral-200">{d.owner}</td>
                  <td className="p-3 text-center border-r border-neutral-200 font-bold">{d.size}</td>
                  <td className="p-3 text-center border-r border-neutral-200">{d.views} lượt</td>
                  <td className="p-3 text-center border-r border-neutral-200 text-neutral-500">{d.date}</td>
                  <td className="p-3 text-center border-r border-neutral-200">
                    <span
                      className={`inline-block px-2 py-0.5 font-bold text-[10px] border border-black shadow-[1px_1px_0_#000] ${
                        d.scan === "AN TOÀN"
                          ? "bg-[#e8fdf0] text-[#008744]"
                          : d.scan === "CẦN DUYỆT"
                          ? "bg-[#fff9db] text-[#b45309]"
                          : "bg-[#ffeaea] text-[#d93025]"
                      }`}
                    >
                      {d.scan}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {d.scan === "CẦN DUYỆT" && (
                        <button
                          type="button"
                          onClick={() => approveDoc(d.id)}
                          className="px-2 py-1 text-[11px] font-bold border border-black bg-[#e8fdf0] text-[#008744] hover:bg-[#00cc66] hover:text-white transition-all shadow-[1px_1px_0_#000]"
                          title="Phê duyệt cho phép lưu hành"
                        >
                          Duyệt
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteDoc(d.id)}
                        className="px-2 py-1 text-[11px] font-bold border border-black bg-[#fff0f0] text-[#d93025] hover:bg-[#ff416c] hover:text-white transition-all shadow-[1px_1px_0_#000]"
                        title="Xóa tài liệu khỏi hệ thống"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Hiển thị {filteredDocs.length} tài liệu trong kho lưu trữ</span>
        <span className="font-bold">TRANG 1 / 1</span>
      </div>
    </div>
  )
}
