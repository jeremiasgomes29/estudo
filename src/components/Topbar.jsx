import Badge from './Badge.jsx'
import { PAGE_TITLES } from '../data/database.js'

export default function Topbar({ page, user }) {
  const [title, sub] = PAGE_TITLES[page] || ['', '']

  return (
    <header className="topbar">
      <div>
        <div className="page-title">{title}</div>
        <div className="page-sub">{sub}</div>
      </div>
      <div className="topbar-right">
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <Badge type="blue">{user.tipo}</Badge>
      </div>
    </header>
  )
}
