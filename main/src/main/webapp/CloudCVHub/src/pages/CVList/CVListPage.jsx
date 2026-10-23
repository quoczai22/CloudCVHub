import { useState, useMemo, useEffect } from 'react'
import Icon from '../../components/UI/Icon'
import Kicker from '../../components/UI/Kicker'
import Button from '../../components/UI/Button'
import Sidebar from '../../components/Common/Sidebar'
import Header from '../../components/Common/Header'

const cvs = [
  {
    title: "Product Designer cấp cao",
    type: "SẢN PHẨM / UX",
    modified: "2 GIỜ TRƯỚC",
    views: 184,
    status: "LIVE",
    version: "v8.2",
  },
  {
    title: "Trưởng nhóm Design System",
    type: "VẬN HÀNH THIẾT KẾ",
    modified: "HÔM QUA",
    views: 92,
    status: "DRAFT",
    version: "v4.0",
  },
  {
    title: "Hồ sơ nghiên cứu người dùng",
    type: "NGHIÊN CỨU UX",
    modified: "03 THÁNG 5 2025",
    views: 56,
    status: "LIVE",
    version: "v3.1",
  },
  {
    title: "Giám đốc sáng tạo",
    type: "LÃNH ĐẠO",
    modified: "28 THÁNG 4 2025",
    views: 211,
    status: "ARCHIVED",
    version: "v6.4",
  },
  {
    title: "Product Designer tự do",
    type: "FREELANCE",
    modified: "14 THÁNG 4 2025",
    views: 38,
    status: "DRAFT",
    version: "v2.0",
  },
]

export default function CVListPage(props) {
  const { onNavigate, drawerOpen, sidebarOpen = drawerOpen, onMenu, onClose, user, onLogout } = props
  const isSidebarVisible = sidebarOpen !== undefined ? sidebarOpen : drawerOpen
  const [filter, setFilter] = useState("ALL CVS")
  const [search, setSearch] = useState("")
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".row-actions")) {
        setMenu(null)
      }
    }
    if (menu) {
      document.addEventListener("click", handleOutsideClick)
      return () => document.removeEventListener("click", handleOutsideClick)
    }
  }, [menu])

  const filtered = useMemo(
    () =>
      cvs.filter(
        (cv) =>
          (filter === "ALL CVS" || cv.status === filter) &&
          cv.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [filter, search],
  )
  return (
    <section
      className={`artboard app-screen ${!isSidebarVisible ? "sidebar-collapsed" : ""}`}
      aria-label="CV management screen"
    >
      <Sidebar
        active="cvs"
        onNavigate={onNavigate}
        open={isSidebarVisible}
        onClose={onClose}
        user={user}
        onLogout={onLogout}
      />
      <main className="app-main">
        <Header
          section="CV của tôi"
          onSearch={(value) => {
            setSearch(value)
            setLoading(true)
            window.setTimeout(() => setLoading(false), 280)
          }}
          onMenu={onMenu}
          sidebarOpen={isSidebarVisible}
        />
        <div className="page cv-page">
          <div className="page-heading">
            <div>
              <Kicker>DOCUMENT REGISTRY</Kicker>
              <h2>
                Your CVs<span>.</span>
              </h2>
              <p>Create, manage and deploy your professional identities.</p>
            </div>
            <Button variant="yellow" icon="plus" onClick={() => onNavigate("upload")}>
              TẠO CV MỚI
            </Button>
          </div>
          <div className="toolbar">
            <div className="filter-pills">
              {["ALL CVS", "LIVE", "DRAFT", "ARCHIVED"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={filter === item ? "active" : ""}
                >
                  {item}
                  <span>
                    {item === "ALL CVS"
                      ? 12
                      : item === "LIVE"
                        ? 6
                        : item === "DRAFT"
                          ? 4
                          : 2}
                  </span>
                </button>
              ))}
            </div>
            <div className="view-tools">
              <span>{filtered.length.toString().padStart(2, "0")} RESULTS</span>
              <button className="active">
                <Icon name="menu" />
              </button>
              <button>
                <Icon name="grid" />
              </button>
            </div>
          </div>
          <div className="neo-dashed-card group relative block">
            <span className="absolute inset-0 border-2 border-dashed border-black pointer-events-none" aria-hidden="true" />
            <div className="relative border-2 border-black bg-white transition-transform duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 table-shell shadow-[4px_4px_0_#000]">
              <div className="table-head">
              <span>DOCUMENT / TITLE</span>
              <span>LAST MODIFIED</span>
              <span>VIEWS</span>
              <span>STATUS</span>
              <span>VERSION</span>
              <span>ACTIONS</span>
            </div>
            <div className="table-body">
              {loading &&
                [0, 1, 2, 3].map((item) => (
                  <div className="table-row skeleton-row" key={item}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                ))}
              {!loading &&
                filtered.map((cv, i) => (
                  <div className="table-row" key={cv.title}>
                    <div className="document-cell">
                      <span className={`doc-icon doc-${i % 3}`}>
                        <Icon name="file" />
                      </span>
                      <span>
                        <b>{cv.title}</b>
                        <small>{cv.type} • PDF</small>
                      </span>
                    </div>
                    <span className="mono-cell">{cv.modified}</span>
                    <span className="view-cell">
                      ↗ <b>{cv.views}</b>
                    </span>
                    <span>
                      <i className={`status ${cv.status.toLowerCase()}`}>
                        {cv.status}
                      </i>
                    </span>
                    <span className="version">{cv.version}</span>
                    <div className="row-actions">
                      <button
                        type="button"
                        title={menu === cv.title ? "Đóng danh mục thao tác" : "Mở danh mục thao tác"}
                        aria-expanded={menu === cv.title}
                        data-state={menu === cv.title ? "opened" : "closed"}
                        className={`cv-action-toggle button-one ${menu === cv.title ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setMenu(menu === cv.title ? null : cv.title)
                        }}
                      >
                        <svg
                          fill="currentColor"
                          className="hamburger"
                          viewBox="0 0 100 100"
                          width="16"
                          height="16"
                          style={{ pointerEvents: "none" }}
                        >
                          <rect className="line top" width="80" height="11" x="10" y="25" rx="3" />
                          <rect className="line middle" width="80" height="11" x="10" y="45" rx="3" />
                          <rect className="line bottom" width="80" height="11" x="10" y="65" rx="3" />
                        </svg>
                      </button>
                      {menu === cv.title && (
                        <div className="action-menu" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => { setMenu(null); onNavigate("detail"); }}>
                            <Icon name="edit" /> EDIT DOCUMENT
                          </button>
                          <button onClick={() => { setMenu(null); onNavigate("shares"); }}>
                            <Icon name="link" /> SHARE LINK
                          </button>
                          <button onClick={() => setMenu(null)}>
                            <Icon name="history" /> VERSION HISTORY
                          </button>
                          <button
                            className="danger"
                            onClick={() => {
                              setMenu(null)
                              setDeleteTarget(cv.title)
                            }}
                          >
                            <Icon name="trash" /> MOVE TO TRASH
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              {!loading && !filtered.length && (
                <div className="empty-state">
                  NO DOCUMENTS MATCH THIS QUERY.
                </div>
              )}
            </div>
            <div className="table-footer">
              <span>
                SHOWING 1—{filtered.length} OF {filtered.length}
              </span>
              <div>
                <button disabled>← PREV</button>
                <button className="active">01</button>
                <button>02</button>
                <button>03</button>
                <button>NEXT →</button>
              </div>
            </div>
          </div>
          </div>
          <div className="table-note">
            <Icon name="shield" size={16} /> ALL DOCUMENTS ARE ENCRYPTED AT REST
            AND IN TRANSIT <span>•</span> LAST SYNC: 12 SEC AGO
          </div>
        </div>
      </main>
      {deleteTarget && (
        <div
          className="dialog-backdrop"
          onMouseDown={() => setDeleteTarget(null)}
        >
          <div
            className="dialog danger-dialog"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Kicker>DESTRUCTIVE ACTION</Kicker>
            <h3>Xóa CV này?</h3>
            <p>
              “{deleteTarget}” sẽ được chuyển vào thùng rác. Các liên kết chia
              sẻ liên quan sẽ ngừng hoạt động ngay lập tức.
            </p>
            <div className="dialog-actions">
              <Button variant="light" onClick={() => setDeleteTarget(null)}>
                HỦY
              </Button>
              <Button
                variant="danger"
                icon="trash"
                onClick={() => {
                  setDeleteTarget(null)
                  setMenu(null)
                }}
              >
                XÁC NHẬN XÓA
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
