import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const characters = [
  { name: 'Zidane', role: 'Ladrón', color: '#4a9eff' },
  { name: 'Garnet', role: 'Invocadora', color: '#c9a84c' },
  { name: 'Vivi', role: 'Mago Negro', color: '#8b5cf6' },
  { name: 'Steiner', role: 'Caballero', color: '#e85c5c' },
]

const sections = [
  { title: 'Personajes', desc: 'Héroes y compañeros del mundo de Gaia', emoji: '⚔️', path: '/characters' },
  { title: 'Enemigos', desc: 'Bestias y villanos que acecharán tu viaje', emoji: '👾', path: '/enemies' },
  { title: 'Items', desc: 'Equipamiento, armas y objetos clave', emoji: '🎒', path: '/items' },
  { title: 'Habilidades', desc: 'Magias, habilidades y soporte de cada clase', emoji: '✨', path: '/abilities' },
  { title: 'Zonas', desc: 'Mapas y regiones del mundo de Gaia', emoji: '🗺️', path: '/zones' },
  { title: 'Galería', desc: 'Arte, ilustraciones y capturas del juego', emoji: '🖼️', path: '/gallery' },
]

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.y < 0) p.y = canvas.height
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Canvas partículas */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Hero */}
      <section style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem',
      }}>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--accent-gold)',
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Final Fantasy IX
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
        >
          El Mundo de<br />
          <span style={{ color: 'var(--accent-gold)' }}>Gaia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            maxWidth: '500px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          Una enciclopedia del universo de Final Fantasy IX.
          Personajes, enemigos, lore y mucho más.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a href="/characters" style={{
            padding: '0.75rem 2rem',
            background: 'var(--accent-gold)',
            color: '#0a0a0f',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.05em',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Personajes
          </a>
          <a href="/gallery" style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            border: '1px solid var(--border)',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Ver galería
          </a>
        </motion.div>

        {/* Characters mini bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            position: 'absolute', bottom: '2rem',
            display: 'flex', gap: '1rem',
          }}
        >
          {characters.map(c => (
            <div key={c.name} style={{
              textAlign: 'center', opacity: 0.7,
              transition: 'opacity 0.2s', cursor: 'default',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                border: `2px solid ${c.color}`,
                margin: '0 auto 0.3rem',
                background: `${c.color}22`,
              }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{c.name}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Sections grid */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '5rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-title)',
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            textAlign: 'center',
          }}
        >
          Explorar el universo
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {sections.map((s, i) => (
            <motion.a
              key={s.title}
              href={s.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'block',
                padding: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-hover)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.emoji}</div>
              <h3 style={{
                fontFamily: 'var(--font-title)',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
              }}>
                {s.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  )
}