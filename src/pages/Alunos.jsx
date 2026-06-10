import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { nextId } from '../hooks/useDatabase.js'
import { avg, padId } from '../utils/helpers.js'

export default function Alunos({ db, setDb, toast }) {
  const [busca, setBusca]   = useState('')
  const [modal, setModal]   = useState(null)
  const [form, setForm]     = useState({ nome: '', cpf: '', email: '', curso_id: '' })

  const filtered = db.alunos.filter(
    (a) =>
      a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.email.toLowerCase().includes(busca.toLowerCase()),
  )

  const openModal = (a = null) => {
    setForm(a ? { ...a, curso_id: String(a.curso_id) } : { nome: '', cpf: '', email: '', curso_id: '' })
    setModal(a || 'novo')
  }

  const save = () => {
    if (!form.nome || !form.email || !form.curso_id) return
    if (modal === 'novo') {
      setDb({ ...db, alunos: [...db.alunos, { ...form, id: nextId(db.alunos), curso_id: +form.curso_id }] })
      toast('Aluno cadastrado com sucesso!')
    } else {
      setDb({ ...db, alunos: db.alunos.map((a) => (a.id === modal.id ? { ...form, id: a.id, curso_id: +form.curso_id } : a)) })
      toast('Aluno atualizado com sucesso!')
    }
    setModal(null)
  }

  const del = (id) => {
    if (!window.confirm('Remover este aluno?')) return
    setDb({
      ...db,
      alunos:     db.alunos.filter((a) => a.id !== id),
      notas:      db.notas.filter((n) => n.aluno_id !== id),
      frequencia: db.frequencia.filter((f) => f.aluno_id !== id),
    })
    toast('Aluno removido.')
  }

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input placeholder="Buscar aluno..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>+ Novo Aluno</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {filtered.length === 0 ? (
            <EmptyState icon="👤" text="Nenhum aluno encontrado" sub="Cadastre um novo aluno ou ajuste a busca" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Nome</th><th>CPF</th><th>E-mail</th>
                  <th>Curso</th><th>Média</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const ns    = db.notas.filter((n) => n.aluno_id === a.id).map((n) => n.nota)
                  const media = avg(ns)
                  const curso = db.cursos.find((c) => c.id === a.curso_id)
                  const mc    = parseFloat(media)
                  return (
                    <tr key={a.id}>
                      <td><span className="mono" style={{ color: 'var(--muted)' }}>{padId(a.id)}</span></td>
                      <td><strong>{a.nome}</strong></td>
                      <td><span className="mono" style={{ fontSize: 12 }}>{a.cpf}</span></td>
                      <td style={{ color: 'var(--muted)' }}>{a.email}</td>
                      <td><Badge type="blue">{curso?.nome || '—'}</Badge></td>
                      <td>
                        <span style={{ fontWeight: 700, color: mc >= 7 ? 'var(--emerald)' : mc >= 5 ? 'var(--amber)' : 'var(--rose)' }}>
                          {media}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openModal(a)}>✏️</button>
                          <button className="btn btn-danger btn-sm" onClick={() => del(a.id)}>🗑️</button>
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
          title={modal === 'novo' ? 'Novo Aluno' : 'Editar Aluno'}
          onClose={() => setModal(null)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Salvar</button>
            </>
          }
        >
          <div className="form-grid form-grid-2">
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label>Nome completo *</label>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: João Pedro Silva" />
            </div>
            <div className="form-group">
              <label>CPF</label>
              <input value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} placeholder="000.000.000-00" />
            </div>
            <div className="form-group">
              <label>E-mail *</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="aluno@email.com" />
            </div>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label>Curso *</label>
              <select value={form.curso_id} onChange={(e) => setForm({ ...form, curso_id: e.target.value })}>
                <option value="">Selecione um curso</option>
                {db.cursos.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
