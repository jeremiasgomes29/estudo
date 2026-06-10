import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import { nextId } from '../hooks/useDatabase.js'
import { padId } from '../utils/helpers.js'

export default function Turmas({ db, setDb, toast }) {
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({ nome: '', curso_id: '', professor_id: '' })

  const openModal = (t = null) => {
    setForm(t ? { ...t, curso_id: String(t.curso_id), professor_id: String(t.professor_id) } : { nome: '', curso_id: '', professor_id: '' })
    setModal(t || 'novo')
  }

  const save = () => {
    if (!form.nome || !form.curso_id || !form.professor_id) return
    if (modal === 'novo') {
      setDb({ ...db, turmas: [...db.turmas, { ...form, id: nextId(db.turmas), curso_id: +form.curso_id, professor_id: +form.professor_id }] })
      toast('Turma criada!')
    } else {
      setDb({ ...db, turmas: db.turmas.map((t) => (t.id === modal.id ? { ...form, id: t.id, curso_id: +form.curso_id, professor_id: +form.professor_id } : t)) })
      toast('Turma atualizada!')
    }
    setModal(null)
  }

  const del = (id) => {
    if (!window.confirm('Remover turma?')) return
    setDb({ ...db, turmas: db.turmas.filter((t) => t.id !== id) })
    toast('Turma removida.')
  }

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => openModal()}>+ Nova Turma</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Turma</th><th>Curso</th><th>Professor</th><th>Alunos</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {db.turmas.map((t) => {
                const curso     = db.cursos.find((c) => c.id === t.curso_id)
                const prof      = db.professores.find((p) => p.id === t.professor_id)
                const alunosCt  = db.alunos.filter((a) => a.curso_id === t.curso_id).length
                return (
                  <tr key={t.id}>
                    <td><span className="mono" style={{ color: 'var(--muted)' }}>{padId(t.id)}</span></td>
                    <td><strong>{t.nome}</strong></td>
                    <td><Badge type="blue">{curso?.nome || '—'}</Badge></td>
                    <td>{prof?.nome || '—'}</td>
                    <td><Badge type="green">{alunosCt} alunos</Badge></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openModal(t)}>✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(t.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          title={modal === 'novo' ? 'Nova Turma' : 'Editar Turma'}
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
              <label>Nome da Turma *</label>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: INF-A 2026" />
            </div>
            <div className="form-group">
              <label>Curso *</label>
              <select value={form.curso_id} onChange={(e) => setForm({ ...form, curso_id: e.target.value })}>
                <option value="">Selecione</option>
                {db.cursos.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Professor *</label>
              <select value={form.professor_id} onChange={(e) => setForm({ ...form, professor_id: e.target.value })}>
                <option value="">Selecione</option>
                {db.professores.map((p) => <option key={p.id} value={p.id}>{p.nome} — {p.disciplina}</option>)}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
