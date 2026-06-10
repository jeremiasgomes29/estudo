import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import Modal from '../components/Modal.jsx'
import { nextId } from '../hooks/useDatabase.js'
import { pct, freqColor } from '../utils/helpers.js'

export default function Frequencia({ db, setDb, toast }) {
  const [modal, setModal] = useState(false)
  const [form, setForm]   = useState({
    aluno_id: '',
    data: new Date().toISOString().split('T')[0],
    presente: 'true',
  })

  const save = () => {
    if (!form.aluno_id || !form.data) return
    const nova = {
      id: nextId(db.frequencia),
      aluno_id: +form.aluno_id,
      data: form.data,
      presente: form.presente === 'true',
    }
    setDb({ ...db, frequencia: [...db.frequencia, nova] })
    toast('Frequência registrada!')
    setModal(false)
  }

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => setModal(true)}>+ Registrar Presença</button>
      </div>

      <div className="freq-grid">
        {db.alunos.map((a) => {
          const regs  = db.frequencia.filter((f) => f.aluno_id === a.id)
          const pres  = regs.filter((f) => f.presente).length
          const freq  = pct(pres, regs.length)
          const color = freqColor(freq)
          return (
            <div className="freq-card" key={a.id}>
              {/* Cabeçalho do card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div className="avatar">{a.nome[0]}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{a.nome}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {db.cursos.find((c) => c.id === a.curso_id)?.nome}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color }}>{freq}%</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>frequência</div>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${freq}%`, background: color }} />
              </div>

              {/* Resumo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: 'var(--muted)' }}>
                <span>✅ {pres} presentes</span>
                <span>❌ {regs.length - pres} ausentes</span>
                <span>📅 {regs.length} aulas</span>
              </div>

              {/* Últimos registros */}
              <div style={{ marginTop: 12, maxHeight: 80, overflowY: 'auto' }}>
                {regs.slice(-4).map((r) => (
                  <div
                    key={r.id}
                    style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0', color: 'var(--muted)' }}
                  >
                    <span>{r.data}</span>
                    <Badge type={r.presente ? 'green' : 'red'}>{r.presente ? 'Presente' : 'Ausente'}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {modal && (
        <Modal
          title="Registrar Frequência"
          onClose={() => setModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Registrar</button>
            </>
          }
        >
          <div className="form-grid">
            <div className="form-group">
              <label>Aluno *</label>
              <select value={form.aluno_id} onChange={(e) => setForm({ ...form, aluno_id: e.target.value })}>
                <option value="">Selecione</option>
                {db.alunos.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Data *</label>
              <input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Situação *</label>
              <select value={form.presente} onChange={(e) => setForm({ ...form, presente: e.target.value })}>
                <option value="true">✅ Presente</option>
                <option value="false">❌ Ausente</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
