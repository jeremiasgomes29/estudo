import { useState } from 'react'
import { CREDENTIALS } from '../data/database.js'

export default function Login({ onLogin }) {
  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('admin@admin.com')
  const [senha, setSenha] = useState('123')
  const [err, setErr] = useState('')

  const handleRole = (r) => {
    setRole(r)
    setEmail(CREDENTIALS[r].email)
    setSenha('123')
    setErr('')
  }

  const submit = () => {
    const c = CREDENTIALS[role]
    if (email === c.email && senha === c.senha) {
      onLogin({ nome: c.nome, tipo: role })
    } else {
      setErr('E-mail ou senha incorretos.')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="logo-icon">🎓</div>
          <h1>EduManager</h1>
          <p>Sistema de Gestão Escolar</p>
        </div>

        {/* Abas de perfil */}
        <div className="role-tabs">
          {[
            ['admin',     '👑 Admin'],
            ['professor', '👨‍🏫 Professor'],
            ['aluno',     '🎒 Aluno'],
          ].map(([r, l]) => (
            <button
              key={r}
              className={`role-tab${role === r ? ' active' : ''}`}
              onClick={() => handleRole(r)}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Campos */}
        <div className="form-grid" style={{ gap: 14 }}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="••••••"
            />
          </div>
        </div>

        {err && (
          <div className="alert alert-info" style={{ marginTop: 14 }}>
            ⚠️ {err}
          </div>
        )}

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 20, padding: '12px' }}
          onClick={submit}
        >
          Entrar no Sistema →
        </button>

        {/* Credenciais de demo */}
        <div
          style={{
            marginTop: 18,
            padding: '12px 14px',
            background: 'rgba(0,0,0,.2)',
            borderRadius: 10,
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          <strong style={{ color: 'var(--text)' }}>Credenciais de demonstração</strong>
          <br />
          Admin: admin@admin.com &nbsp;|&nbsp; Prof: prof@prof.com &nbsp;|&nbsp; Aluno: aluno@aluno.com
          <br />
          Senha: <span className="mono">123</span>
        </div>
      </div>
    </div>
  )
}
