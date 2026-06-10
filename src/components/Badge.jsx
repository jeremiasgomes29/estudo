export default function Badge({ type = 'blue', children }) {
  return <span className={`badge badge-${type}`}>{children}</span>
}
