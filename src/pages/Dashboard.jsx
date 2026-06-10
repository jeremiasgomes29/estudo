import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { avg, pct } from '../utils/helpers.js'

const TOOLTIP_STYLE = {
  background: '#0F1F3D',
  border: '1px solid rgba(37,99,235,.3)',
  borderRadius: 10,
  color: '#E2E8F0',
}

export default function Dashboard({ db }) {
  const totalAlunos  = db.alunos.length
  const turmasAtivas = db.turmas.length
  const mediaGeral   = avg(db.notas.map((n) => n.nota))
  const presentes    = db.frequencia.filter((f) => f.presente).length
  const freqGeral    = pct(presentes, db.frequencia.length)

  // Gráfico de barras — desempenho por aluno
  const barData = db.alunos.slice(0, 5).map((a) => {
    const ns = db.notas.filter((n) => n.aluno_id === a.id).map((n) => n.nota)
    return {
      nome:  a.nome.split(' ')[0],
      media: ns.length ? +(ns.reduce((s, x) => s + x, 0) / ns.length).toFixed(1) : 0,
    }
  })

  // Gráfico de pizza — situação das notas
  const pieData = [
    { name: 'Aprovados',  value: db.notas.filter((n) => n.nota >= 7).length,             color: '#10B981' },
    { name: 'Em Risco',   value: db.notas.filter((n) => n.nota >= 5 && n.nota < 7).length, color: '#F59E0B' },
    { name: 'Reprovados', value: db.notas.filter((n) => n.nota < 5).length,              color: '#F43F5E' },
  ]

  // Gráfico de linha — evolução da média
  const lineData = [
    { mes: 'Jan', media: 7.2 },
    { mes: 'Fev', media: 7.5 },
    { mes: 'Mar', media: 6.8 },
    { mes: 'Abr', media: 7.9 },
    { mes: 'Mai', media: parseFloat(mediaGeral) || 7.4 },
  ]

  const kpis = [
    { icon: '👥', num: totalAlunos,    label: 'Total de Alunos',   bg: 'rgba(37,99,235,.15)',  color: 'var(--sky)'     },
    { icon: '📚', num: turmasAtivas,   label: 'Turmas Ativas',     bg: 'rgba(16,185,129,.15)', color: 'var(--emerald)' },
    { icon: '⭐', num: mediaGeral,     label: 'Média Geral',        bg: 'rgba(245,158,11,.15)', color: 'var(--amber)'   },
    { icon: '✅', num: `${freqGeral}%`,label: 'Frequência Média',  bg: 'rgba(244,63,94,.15)',  color: 'var(--rose)'    },
  ]

  return (
    <div>
      {/* KPIs */}
      <div className="grid-4 fadeUp" style={{ marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
            <div>
              <div className="kpi-num" style={{ color: k.color }}>{k.num}</div>
              <div className="kpi-label">{k.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos linha 1 */}
      <div className="grid-2 fadeUp2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-title">📊 Desempenho por Aluno</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis dataKey="nome" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="media" name="Média" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">📈 Evolução da Média</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
              <XAxis dataKey="mes" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[5, 10]} tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="media" name="Média" stroke="#38BDF8" strokeWidth={3} dot={{ fill: '#38BDF8', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos linha 2 */}
      <div className="grid-2 fadeUp3">
        <div className="card">
          <div className="card-title">🍩 Situação das Notas</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend formatter={(v) => <span style={{ color: '#94A3B8', fontSize: 12 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">📢 Avisos Importantes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {db.avisos.map((a) => (
              <div
                key={a.id}
                style={{
                  padding: '11px 14px', borderRadius: 10,
                  background: 'rgba(37,99,235,.08)',
                  border: '1px solid var(--border)',
                  fontSize: 13, lineHeight: 1.5,
                }}
              >
                {a.texto}
              </div>
            ))}
          </div>

          <div className="divider" />
          <div className="card-title">🏆 Top Alunos</div>
          {db.alunos.slice(0, 3).map((a, i) => {
            const ns = db.notas.filter((n) => n.aluno_id === a.id).map((n) => n.nota)
            const m  = avg(ns)
            const medalColors = ['#F59E0B', '#94A3B8', '#CD7F32']
            return (
              <div
                key={a.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '8px 0',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: medalColors[i],
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.nome}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {db.cursos.find((c) => c.id === a.curso_id)?.nome}
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--sky)', fontSize: 16 }}>{m}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
