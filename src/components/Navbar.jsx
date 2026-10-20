import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'
import ScrollProgress from './ScrollProgress.jsx'

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact']
const SECTION_IDS = ['top', 'about', 'skills', 'projects', 'experience', 'contact']

function anchorFor(l) {
  if (l === 'Home') return '#top'
  if (l === 'Resume') return '#hero-resume'
  return `#${l.toLowerCase()}`
}

function isActive(l, activeSection) {
  if (l === 'Resume') return false
  const target = l === 'Home' ? 'top' : l.toLowerCase()
  return target === activeSection
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: highlight whichever section is currently in view.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <>
      <ScrollProgress />
      <nav
        className={`nav-glass ${scrolled ? 'is-scrolled' : ''}`}
        style={{ boxShadow: scrolled ? '0 10px 30px var(--shadow-nav)' : 'none' }}
      >
        <div className="container nav-inner">
          <a className="brand-mark" href="#top">
            <img src="/profile.jpg" alt="" className="brand-avatar" />AJITH<span>KUMAR</span>
          </a>

          <div className="nav-pill">
            {NAV_LINKS.map((l) => (
              <a key={l} className={isActive(l, activeSection) ? 'active' : ''} href={anchorFor(l)}>
                {l}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a
              className="nav-github-btn"
              href="https://github.com/FullStackAjith"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <i className="bi bi-github"></i>
            </a>
            <ThemeToggle />
            <button
              className={`nav-burger ${drawerOpen ? 'open' : ''}`}
              onClick={() => setDrawerOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-backdrop ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)}></div>

      <div className={`nav-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="nav-drawer-top">
          <span className="brand-mark">
            <img src="/profile.jpg" alt="" className="brand-avatar" />AJITH<span>KUMAR</span>
          </span>
          <button className="nav-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="nav-drawer-links">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l}
              className={isActive(l, activeSection) ? 'active' : ''}
              href={anchorFor(l)}
              style={{ transitionDelay: drawerOpen ? `${i * 0.05}s` : '0s' }}
              onClick={() => setDrawerOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
        <div className="nav-drawer-footer">
          <a
            className="nav-github-btn"
            href="https://github.com/FullStackAjith"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <i className="bi bi-github"></i>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
