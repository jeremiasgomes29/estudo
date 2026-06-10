export default function EmptyState({ icon, text, sub }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <div className="empty-text">{text}</div>
      <div className="empty-sub">{sub}</div>
    </div>
  )
}
