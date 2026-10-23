export default function ComicBrutalMenuButton({
  isOpen = true,
  onClick,
  className = "",
  title,
}) {
  return (
    <div className={`comic-brutal-button-container topbar-mode ${className}`}>
      <button
        type="button"
        className={`comic-brutal-button ${!isOpen ? "is-collapsed" : ""}`}
        onClick={onClick}
        aria-label={isOpen ? "Thu gọn thanh điều hướng (Sidebar)" : "Mở rộng thanh điều hướng (Sidebar)"}
        title={title || (isOpen ? "Thu gọn thanh điều hướng (Sidebar)" : "Mở rộng thanh điều hướng (Sidebar)")}
      >
        <span className="button-shadow" />
        <span className="button-frame" />
        <span className="button-inner">
          <span className="halftone-overlay" />
          <span className="ink-splatter" />
          <span className="button-text">
            {isOpen ? "✕ MENU" : "☰ MENU"}
          </span>
        </span>
      </button>
    </div>
  )
}
