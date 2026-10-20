import { useEffect, useRef } from 'react'
import ParticleField from './ParticleField.jsx'
import HeroMarquee from './HeroMarquee.jsx'
import useTypewriter from '../hooks/useTypewriter.js'

export default function Hero() {
  const nameRef = useRef(null)
  const typedRole = useTypewriter('Full Stack Developer — Web · Data · AI Tools')

  useEffect(() => {
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 14
      const y = (e.clientY / window.innerHeight - 0.5) * 8
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <header className="hero" id="top">
      <ParticleField />
      <div className="hero-grid-overlay"></div>
      <div className="container hero-content">
        <HeroMarquee />
        <div className="row">
          <div className="col-lg-9">
            <div className="eyebrow">Full Stack Developer Portfolio</div>
            <h1 className="hero-name" ref={nameRef}>
              Ajith<span className="accent-letter">kumar</span>
            </h1>
            <div className="hero-role">
              <span className="dot"></span>
              <span className="typewriter-text">{typedRole}</span>
              <span className="type-cursor"></span>
            </div>
            <div>
              <a href="#projects" className="btn-portfolio primary">
                View My Work <i className="bi bi-arrow-up-right"></i>
              </a>
              <a href="/resume.pdf" download="Ajithkumar_Resume.pdf" id="hero-resume" className="btn-portfolio">
                Download Resume <i className="bi bi-download"></i>
              </a>
              <a href="#contact" className="btn-portfolio">
                Contact Me <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        Scroll
        <div className="line"></div>
      </div>
    </header>
  )
}
