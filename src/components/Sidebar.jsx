import { NAV_ITEMS } from '../data/database.js'

export default function Sidebar({ user, page, setPage, onLogout }) {
  const sections = [...new Set(NAV_ITEMS.map((n) => n.section))]
  const visibleNav =
    user.tipo === 'aluno'
      ? NAV_ITEMS.filter((n) => n.id === 'boletim')
      : NAV_ITEMS

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🎓</div>
        <div>
          <div className="logo-text">EduManager</div>
          <div className="logo-sub">Gestão Escolar</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {sections.map((sec) => {
          const items = visibleNav.filter((n) => n.section === sec)
          if (!items.length) return null
          return (
            <div key={sec}>
              <div className="nav-section">{sec}</div>
              {items.map((n) => (
                <div
                  key={n.id}
                  className={`nav-item${page === n.id ? ' active' : ''}`}
                  onClick={() => setPage(n.id)}
                >
                  <span className="nav-icon">{n.icon}</span>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="avatar">{user.nome[0]}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="avatar-name"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {user.nome}
          </div>
          <div className="avatar-role">{user.tipo}</div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          style={{ padding: '6px 8px' }}
          onClick={onLogout}
          title="Sair"
        >
          ↩
        </button>
      </div>
    </aside>
  )
}
