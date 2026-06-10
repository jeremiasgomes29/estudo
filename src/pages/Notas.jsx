import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import { nextId } from '../hooks/useDatabase.js'
import { padId, situacaoBadge, situacaoTexto, notaColor } from '../utils/helpers.js'

export default function Notas({ db, setDb, toast }) {
  const [filtro, setFiltro] = useState('')
  const [modal, setModal]   = useState(false)
  const [form, setForm]     = useState({ aluno_id: '', disciplina: '', nota: '' })

  const save = () => {
    if (!form.aluno_id || !form.disciplina || form.nota === '') return
    const nota = parseFloat(form.nota)
    if (isNaN(nota) || nota < 0 || nota > 10) return
    setDb({ ...db, notas: [...db.notas, { id: nextId(db.notas), aluno_id: +form.aluno_id, disciplina: form.disciplina, nota }] })
    toast('Nota lançada com sucesso!')
    setModal(false)
    setForm({ aluno_id: '', disciplina: '', nota: '' })
  }

  const del = (id) => {
    setDb({ ...db, notas: db.notas.filter((n) => n.id !== id) })
    toast('Nota removida.')
  }

  const filtered = db.notas.filter((n) => {
    if (!filtro) return true
    const a = db.alunos.find((a) => a.id === n.aluno_id)
    return (
      a?.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      n.disciplina.toLowerCase().includes(filtro.toLowerCase())
    )
  })

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input placeholder="Filtrar por aluno ou disciplina..." value={filtro} onChange={(e) => setFiltro(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => setModal(true)}>+ Lançar Nota</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Aluno</th><th>Disciplina</th><th>Nota</th><th>Situação</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {filtered.map((n) => {
                const aluno = db.alunos.find((a) => a.id === n.aluno_id)
                return (
                  <tr key={n.id}>
                    <td><span className="mono" style={{ color: 'var(--muted)' }}>{padId(n.id)}</span></td>
                    <td><strong>{aluno?.nome || '—'}</strong></td>
                    <td>{n.disciplina}</td>
                    <td>
                      <span style={{ fontSize: 18, fontWeight: 800, color: notaColor(n.nota) }}>{n.nota.toFixed(1)}</span>
                      <div className="progress-bar" style={{ marginTop: 4, width: 80 }}>
                        <div className="progress-fill" style={{ width: `${n.nota * 10}%`, background: notaColor(n.nota) }} />
                      </div>
                    </td>
                    <td><Badge type={situacaoBadge(n.nota)}>{situacaoTexto(n.nota)}</Badge></td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => del(n.id)}>🗑️</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          title="Lançar Nota"
          onClose={() => setModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Lançar</button>
            </>
          }
        >
          <div className="form-grid">
            <div className="form-group">
              <label>Aluno *</label>
              <select value={form.aluno_id} onChange={(e) => setForm({ ...form, aluno_id: e.target.value })}>
                <option value="">Selecione o aluno</option>
                {db.alunos.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Disciplina *</label>
              <input value={form.disciplina} onChange={(e) => setForm({ ...form, disciplina: e.target.value })} placeholder="Ex: Matemática" />
            </div>
            <div className="form-group">
              <label>Nota (0 a 10) *</label>
              <input type="number" min="0" max="10" step="0.1" value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })} placeholder="Ex: 8.5" />
            </div>
            {form.nota !== '' && !isNaN(parseFloat(form.nota)) && (
              <div className="form-group">
                <div className={`alert ${parseFloat(form.nota) >= 7 ? 'alert-success' : 'alert-info'}`}>
                  {parseFloat(form.nota) >= 7 ? '✅ Aprovado (≥ 7.0)' : parseFloat(form.nota) >= 5 ? '⚠️ Em risco (5.0 – 6.9)' : '❌ Reprovado (< 5.0)'}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
