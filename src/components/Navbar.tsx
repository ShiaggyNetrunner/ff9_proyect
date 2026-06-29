import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Personajes', path: '/characters' },
]

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-title)',
        color: 'var(--accent-gold)',
        fontSize: '1.2rem',
        letterSpacing: '0.1em',
      }}>
        Final Fantasy IX
      </span>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        {links.map(link => (
          <li key={link.path}>
            <Link to={link.path} style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}