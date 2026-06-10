import { useState } from 'react'
import Badge from '../components/Badge.jsx'
import { avg, pct, notaColor, situacaoBadge, situacaoTexto, freqColor } from '../utils/helpers.js'

export default function Boletim({ db }) {
  const [alunoId, setAlunoId] = useState(db.alunos[0]?.id || '')

  const aluno  = db.alunos.find((a) => a.id === +alunoId)
  const curso  = aluno ? db.cursos.find((c) => c.id === aluno.curso_id) : null
  const notas  = db.notas.filter((n) => n.aluno_id === +alunoId)
  const mediaG = avg(notas.map((n) => n.nota))

  const regs  = db.frequencia.filter((f) => f.aluno_id === +alunoId)
  const pres  = regs.filter((f) => f.presente).length
  const freqP = pct(pres, regs.length)

  const aprovado = parseFloat(mediaG) >= 7 && freqP >= 75

  return (
    <div className="fadeUp">
      <div className="search-row">
        <div className="form-group" style={{ flex: 1 }}>
          <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} style={{ maxWidth: 340 }}>
            {db.alunos.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
          </select>
        </div>
        <button className="btn btn-ghost" onClick={() => window.print()}>🖨️ Imprimir</button>
      </div>

      {aluno ? (
        <div className="boletim-card">
          {/* Cabeçalho */}
          <div className="boletim-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div className="avatar" style={{ width: 52, height: 52, fontSize: 22 }}>🎓</div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '1px', opacity: 0.7, textTransform: 'uppercase', marginBottom: 4 }}>
                  Boletim Escolar — EduManager
                </div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{aluno.nome}</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Curso: {curso?.nome} &nbsp;|&nbsp; {aluno.email}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{mediaG}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>Média Geral</div>
                <div style={{ marginTop: 6 }}>
                  <Badge type={aprovado ? 'green' : 'red'}>{aprovado ? '✅ Aprovado' : '❌ Reprovado'}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div style={{ padding: '0 24px' }}>
            <div style={{ padding: '16px 0 10px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.8px' }}>
              Notas por Disciplina
            </div>

            {notas.length === 0 && (
              <div style={{ textAlign: 'center', padding: 24, color: 'var(--muted)' }}>
                Nenhuma nota lançada para este aluno.
              </div>
            )}

            {notas.map((n) => (
              <div className="nota-row" key={n.id}>
                <div style={{ fontWeight: 600 }}>{n.disciplina}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 120 }}>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${n.nota * 10}%`, background: notaColor(n.nota) }} />
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 18, color: notaColor(n.nota), width: 36, textAlign: 'right' }}>
                    {n.nota.toFixed(1)}
                  </span>
                  <Badge type={situacaoBadge(n.nota)}>{situacaoTexto(n.nota)}</Badge>
                </div>
              </div>
            ))}

            <div className="divider" />

            {/* Frequência + Resultado */}
            <div style={{ display: 'flex', gap: 24, padding: '0 4px 20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.8px', fontWeight: 700 }}>
                  Frequência
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: freqColor(freqP) }}>{freqP}%</div>
                  <div>
                    <div className="progress-bar" style={{ width: 100 }}>
                      <div className="progress-fill" style={{ width: `${freqP}%`, background: freqColor(freqP) }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{pres}/{regs.length} aulas</div>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.8px', fontWeight: 700 }}>
                  Resultado Final
                </div>
                <div
                  style={{
                    padding: '14px 18px', borderRadius: 10,
                    background: aprovado ? 'rgba(16,185,129,.1)' : 'rgba(244,63,94,.1)',
                    border: `1px solid ${aprovado ? 'rgba(16,185,129,.3)' : 'rgba(244,63,94,.3)'}`,
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, color: aprovado ? 'var(--emerald)' : 'var(--rose)' }}>
                    {aprovado ? '✅ APROVADO' : '❌ REPROVADO'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                    Critério: Média ≥ 7.0 e Frequência ≥ 75%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--muted)' }}>
          Selecione um aluno para visualizar o boletim.
        </div>
      )}
    </div>
  )
}
