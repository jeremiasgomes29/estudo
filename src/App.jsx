import { useState } from 'react'
import './styles.css'

import { useDatabase } from './hooks/useDatabase.js'
import { useToast }    from './hooks/useToast.js'

import Login      from './pages/Login.jsx'
import Dashboard  from './pages/Dashboard.jsx'
import Alunos     from './pages/Alunos.jsx'
import Professores from './pages/Professores.jsx'
import Cursos     from './pages/Cursos.jsx'
import Turmas     from './pages/Turmas.jsx'
import Notas      from './pages/Notas.jsx'
import Frequencia from './pages/Frequencia.jsx'
import Boletim    from './pages/Boletim.jsx'

import Sidebar  from './components/Sidebar.jsx'
import Topbar   from './components/Topbar.jsx'
import Toast    from './components/Toast.jsx'

export default function App() {
  const [user, setUser]       = useState(null)
  const [page, setPage]       = useState('dashboard')
  const { db, setDb }         = useDatabase()
  const { toastMsg, toast }   = useToast()

  // Se não estiver logado → tela de login
  if (!user) {
    return <Login onLogin={(u) => { setUser(u); setPage(u.tipo === 'aluno' ? 'boletim' : 'dashboard') }} />
  }

  // Props comuns para todas as páginas
  const pageProps = { db, setDb, toast, user }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':   return <Dashboard   {...pageProps} />
      case 'alunos':      return <Alunos      {...pageProps} />
      case 'professores': return <Professores {...pageProps} />
      case 'cursos':      return <Cursos      {...pageProps} />
      case 'turmas':      return <Turmas      {...pageProps} />
      case 'notas':       return <Notas       {...pageProps} />
      case 'frequencia':  return <Frequencia  {...pageProps} />
      case 'boletim':     return <Boletim     {...pageProps} />
      default:            return <Dashboard   {...pageProps} />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        user={user}
        page={page}
        setPage={setPage}
        onLogout={() => setUser(null)}
      />

      <div className="main">
        <Topbar page={page} user={user} />
        <main className="content">
          {renderPage()}
        </main>
      </div>

      <Toast msg={toastMsg} />
    </div>
  )
}
