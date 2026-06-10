// Calcular média de um array de números
export const avg = (arr) =>
  arr.length ? (arr.reduce((s, n) => s + n, 0) / arr.length).toFixed(1) : '—'

// Calcular percentual
export const pct = (n, t) => (t ? Math.round((n / t) * 100) : 0)

// Cor da nota
export const notaColor = (nota) =>
  nota >= 7 ? 'var(--emerald)' : nota >= 5 ? 'var(--amber)' : 'var(--rose)'

// Tipo do badge da situação
export const situacaoBadge = (nota) =>
  nota >= 7 ? 'green' : nota >= 5 ? 'amber' : 'red'

// Texto da situação
export const situacaoTexto = (nota) =>
  nota >= 7 ? 'Aprovado' : nota >= 5 ? 'Em Risco' : 'Reprovado'

// Cor da frequência
export const freqColor = (f) =>
  f >= 75 ? 'var(--emerald)' : f >= 50 ? 'var(--amber)' : 'var(--rose)'

// Pad de ID com zeros
export const padId = (id) => String(id).padStart(3, '0')
