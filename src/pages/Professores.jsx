import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { nextId } from '../hooks/useDatabase.js'
import { padId } from '../utils/helpers.js'

export default function Professores({ db, setDb, toast }) {
  const [busca, setBusca] = useState('')
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({ nome: '', disciplina: '', email: '' })

  const filtered = db.professores.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.disciplina.toLowerCase().includes(busca.toLowerCase()),
  )

  const openModal = (p = null) => {
    setForm(p || { nome: '', disciplina: '', email: '' })
    setModal(p || 'novo')
  }

  const save = () => {
    if (!form.nome || !form.disciplina || !form.email) return
    if (modal === 'novo') {
      setDb({ ...db, professores: [...db.professores, { ...form, id: nextId(db.professores) }] })
      toast('Professor cadastrado!')
    } else {
      setDb({ ...db, professores: db.professores.map((p) => (p.id === modal.id ? { ...form, id: p.id } : p)) })
      toast('Professor atualizado!')
    }
    setModal(null)
  }

  const del = (id) => {
    if (!window.confirm('Remover professor?')) return
    setDb({ ...db, professores: db.professores.filter((p) => p.id !== id) })
    toast('Professor removido.')
  }

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input placeholder="Buscar professor..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>+ Novo Professor</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {filtered.length === 0 ? (
            <EmptyState icon="👨‍🏫" text="Nenhum professor encontrado" sub="Cadastre um novo professor" />
          ) : (
            <table>
              <thead>
                <tr><th>#</th><th>Nome</th><th>Disciplina</th><th>E-mail</th><th>Turmas</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const turmas = db.turmas.filter((t) => t.professor_id === p.id)
                  return (
                    <tr key={p.id}>
                      <td><span className="mono" style={{ color: 'var(--muted)' }}>{padId(p.id)}</span></td>
                      <td><strong>{p.nome}</strong></td>
                      <td><Badge type="amber">{p.disciplina}</Badge></td>
                      <td style={{ color: 'var(--muted)' }}>{p.email}</td>
                      <td>
                        {turmas.length
                          ? turmas.map((t) => <Badge key={t.id} type="gray" style={{ marginRight: 4 }}>{t.nome}</Badge>)
                          : <span style={{ color: 'var(--muted)', fontSize: 12 }}>—</span>}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openModal(p)}>✏️</button>
                          <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <Modal
          title={modal === 'novo' ? 'Novo Professor' : 'Editar Professor'}
          onClose={() => setModal(null)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Salvar</button>
            </>
          }
        >
          <div className="form-grid">
            <div className="form-group">
              <label>Nome *</label>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome completo" />
            </div>
            <div className="form-group">
              <label>Disciplina *</label>
              <input value={form.disciplina} onChange={(e) => setForm({ ...form, disciplina: e.target.value })} placeholder="Ex: Matemática" />
            </div>
            <div className="form-group">
              <label>E-mail *</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="prof@email.com" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
