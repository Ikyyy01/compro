import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const css = `
.port-hero{padding:160px 0 80px;border-bottom:1px solid var(--border)}
.section-label{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:10px}
.section-label::before{content:'';display:block;width:24px;height:1px;background:var(--accent)}
.display-h{font-family:var(--font-display);line-height:.9;letter-spacing:.02em;color:#fff}
.filter-chip{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:8px 18px;border:1px solid var(--border2);border-radius:var(--radius);color:var(--text3);background:transparent;cursor:none;transition:all .2s}
.filter-chip:hover{border-color:var(--accent);color:var(--accent)}
.filter-chip.active{background:var(--accent);border-color:var(--accent);color:#0a0a08}
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.proj-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;display:block;text-decoration:none;color:var(--text);transition:border-color .25s,transform .3s cubic-bezier(.34,1.2,.64,1)}
.proj-card:hover{border-color:var(--border2);transform:translateY(-6px)}
.proj-card.featured{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr}
.card-thumb{height:220px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.card-thumb-emoji{font-size:4rem;z-index:1;position:relative;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
.proj-card:hover .card-thumb-emoji{transform:scale(1.2) rotate(-6deg)}
.card-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(10,10,8,.7);backdrop-filter:blur(6px);opacity:0;z-index:2;transition:opacity .25s}
.proj-card:hover .card-overlay{opacity:1}
.ol-btn{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:8px 16px;border-radius:var(--radius);text-decoration:none;transition:background .2s;cursor:none}
.ol-primary{background:var(--accent);color:#0a0a08}
.ol-ghost{border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8)}
.card-body{padding:24px 28px 28px}
.card-type{font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.card-title{font-family:var(--font-display);font-size:1.4rem;letter-spacing:.02em;color:#fff;line-height:1.1;margin-bottom:10px}
.card-desc{font-size:.82rem;color:var(--text2);line-height:1.7;margin-bottom:16px}
.card-tags{display:flex;flex-wrap:wrap;gap:6px}
.card-tag{font-family:var(--font-mono);font-size:.65rem;color:var(--text3);padding:3px 9px;background:var(--surface);border:1px solid var(--border2);border-radius:3px}
.btn-outline{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border:1px solid var(--border2);color:var(--text2);font-size:.78rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:var(--radius);transition:border-color .2s,color .2s}
.btn-outline:hover{border-color:var(--accent);color:var(--accent)}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;background:var(--accent);color:#0a0a08;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border-radius:var(--radius);transition:background .2s}
.btn-primary:hover{background:var(--accent2)}
.wip-badge{display:inline-flex;align-items:center;gap:6px;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);background:rgba(240,165,0,.1);border:1px solid rgba(240,165,0,.25);padding:3px 10px;border-radius:999px;margin-left:10px;vertical-align:middle}
@media(max-width:768px){.proj-grid{grid-template-columns:1fr}.proj-card.featured{grid-column:span 1;display:block}.proj-card.featured .card-thumb{height:200px}}
@media(max-width:600px){.port-hero{padding-left:24px;padding-right:24px}}
`

const projects = [
  {
    id: 1,
    featured: true,
    cat: 'web',
    type: 'Featured · Fullstack Web',
    emoji: '🍽️',
    bg: 'linear-gradient(135deg,#0d1a10,#0a0a08)',
    glow: 'rgba(126,207,142,.07)',
    title: 'CATERING\nFAMILY JAKARTA',
    desc: 'A complete catering management web application for a Jakarta-based catering business. Features include menu management, order tracking, customer management, and an admin dashboard — built with Laravel backend and Vue.js frontend.',
    tags: ['Laravel', 'Vue.js', 'REST API', 'MySQL', 'PHP', 'Tailwind CSS'],
    github: 'https://github.com/RiskyJanuarLbs',
    live: null,
    status: null,
  },
  {
    id: 2,
    featured: false,
    cat: 'web',
    type: 'Web App · Game',
    emoji: '🕵️',
    bg: 'linear-gradient(135deg,#0d1020,#0a0a08)',
    glow: 'rgba(99,102,241,.07)',
    title: 'UNDERCOVER\nPARTY GAME',
    desc: 'A fun multiplayer party game web app inspired by the classic Undercover card game. Players get secret roles and try to find the undercover agent through discussion. Built with React and TypeScript.',
    tags: ['React', 'TypeScript', 'JavaScript', 'CSS3'],
    github: 'https://github.com/RiskyJanuarLbs',
    live: null,
    status: null,
  },
  {
    id: 3,
    featured: false,
    cat: 'web',
    type: 'Web · Coming Soon',
    emoji: '🚧',
    bg: 'linear-gradient(135deg,#141008,#0a0a08)',
    glow: 'rgba(240,165,0,.05)',
    title: 'NEXT\nPROJECT',
    desc: 'Something new is in the works. Stay tuned for the next project — currently in planning and development phase.',
    tags: ['TBD'],
    github: null,
    live: null,
    status: 'wip',
  },
]

const filters = ['all', 'web']

export default function Portfolio() {
  const [active, setActive] = useState('all')
  useReveal()

  const visible = active === 'all' ? projects : projects.filter(p => p.cat === active)

  return (
    <>
      <style>{css}</style>
      <section className="port-hero">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div className="section-label reveal">Selected work</div>
          <h1 className="display-h reveal delay-1" style={{ fontSize: 'clamp(4rem,9vw,7.5rem)', marginTop: 16 }}>
            PORTFOLIO<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <p className="reveal delay-2" style={{ color: 'var(--text2)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.8, marginTop: 20 }}>
            Projects I've built — spanning fullstack web applications and interactive web experiences. Real work, real code.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }} className="reveal">
            {filters.map(f => (
              <button key={f} className={`filter-chip${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--text3)', marginBottom: 24 }} className="reveal">
            Showing {visible.length} project{visible.length !== 1 ? 's' : ''}
          </div>
          <div className="proj-grid">
            {visible.map((p, i) => (
              <div
                key={p.id}
                className={`proj-card reveal delay-${i % 3}${p.featured && active === 'all' ? ' featured' : ''}`}
                style={{ cursor: 'default' }}
              >
                <div className="card-thumb" style={{ background: p.bg, ...(p.featured && active === 'all' ? { height: '100%', minHeight: 280 } : {}) }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 40% 50%, ${p.glow} 0%, transparent 70%)` }} />
                  <span className="card-thumb-emoji">{p.emoji}</span>
                  {(p.github || p.live) && (
                    <div className="card-overlay">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="ol-btn ol-primary">GitHub ↗</a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="ol-btn ol-ghost">Live Demo</a>
                      )}
                    </div>
                  )}
                </div>
                <div className="card-body" style={p.featured && active === 'all' ? { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 40px' } : {}}>
                  <div className="card-type">
                    {p.type}
                    {p.status === 'wip' && <span className="wip-badge">⚡ In Progress</span>}
                  </div>
                  <div className="card-title" style={p.featured && active === 'all' ? { fontSize: '2rem' } : {}}>
                    {p.title.split('\n').map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}
                  </div>
                  <p className="card-desc" style={p.featured && active === 'all' ? { maxWidth: 400 } : {}}>{p.desc}</p>
                  <div className="card-tags">{p.tags.map(t => <span key={t} className="card-tag">{t}</span>)}</div>
                  {p.github && (
                    <div style={{ marginTop: 16 }}>
                      <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--accent)', textDecoration: 'none' }}>
                        View on GitHub ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div className="reveal" style={{ textAlign: 'center', padding: '80px 40px', border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)', background: 'var(--bg2)' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>Ready to build?</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
              HAVE A PROJECT<span style={{ color: 'var(--accent)' }}>?</span>
            </h2>
            <p style={{ color: 'var(--text2)', marginTop: 16, fontSize: '.95rem', maxWidth: 400, margin: '16px auto 0', lineHeight: 1.7 }}>
              I'm available for freelance work and full-time opportunities.
            </p>
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Get In Touch →</Link>
              <Link to="/about" className="btn-outline">About Me</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
