import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import { nextId } from '../hooks/useDatabase.js'

export default function Cursos({ db, setDb, toast }) {
  const [modal, setModal] = useState(null)
  const [form, setForm]   = useState({ nome: '', carga_horaria: '' })

  const openModal = (c = null) => {
    setForm(c ? { ...c, carga_horaria: String(c.carga_horaria) } : { nome: '', carga_horaria: '' })
    setModal(c || 'novo')
  }

  const save = () => {
    if (!form.nome || !form.carga_horaria) return
    if (modal === 'novo') {
      setDb({ ...db, cursos: [...db.cursos, { ...form, id: nextId(db.cursos), carga_horaria: +form.carga_horaria }] })
      toast('Curso criado!')
    } else {
      setDb({ ...db, cursos: db.cursos.map((c) => (c.id === modal.id ? { ...form, id: c.id, carga_horaria: +form.carga_horaria } : c)) })
      toast('Curso atualizado!')
    }
    setModal(null)
  }

  const del = (id) => {
    if (!window.confirm('Remover curso?')) return
    setDb({ ...db, cursos: db.cursos.filter((c) => c.id !== id) })
    toast('Curso removido.')
  }

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => openModal()}>+ Novo Curso</button>
      </div>

      <div className="grid-2">
        {db.cursos.map((c) => {
          const alunos = db.alunos.filter((a) => a.curso_id === c.id)
          const turmas = db.turmas.filter((t) => t.curso_id === c.id)
          return (
            <div className="card" key={c.id}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{c.nome}</div>
                  <Badge type="blue">⏱ {c.carga_horaria}h</Badge>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => openModal(c)}>✏️</button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(c.id)}>🗑️</button>
                </div>
              </div>

              <div className="divider" />

              <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--sky)' }}>{alunos.length}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Alunos</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--emerald)' }}>{turmas.length}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Turmas</div>
                </div>
              </div>

              {turmas.map((t) => {
                const prof = db.professores.find((p) => p.id === t.professor_id)
                return (
                  <div key={t.id} style={{ fontSize: 12, color: 'var(--muted)', padding: '3px 0' }}>
                    📚 {t.nome} — {prof?.nome || '—'}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {modal && (
        <Modal
          title={modal === 'novo' ? 'Novo Curso' : 'Editar Curso'}
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
              <label>Nome do Curso *</label>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: Análise de Sistemas" />
            </div>
            <div className="form-group">
              <label>Carga Horária (horas) *</label>
              <input type="number" value={form.carga_horaria} onChange={(e) => setForm({ ...form, carga_horaria: e.target.value })} placeholder="120" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
