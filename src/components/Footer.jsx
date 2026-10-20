import { useEffect, useState } from 'react'

export default function Footer() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <small>&copy; 2026 Ajithkumar — Full Stack Developer</small>
          <div>
            <a className="social-icon" href="https://github.com/FullStackAjith" target="_blank" rel="noreferrer">
              <i className="bi bi-github"></i>
            </a>
            <a className="social-icon" href="tel:+919629706538">
              <i className="bi bi-telephone-fill"></i>
            </a>
            <a className="social-icon" href="mailto:ajithajith54957@gmail.com">
              <i className="bi bi-envelope"></i>
            </a>
          </div>
        </div>
      </footer>
      <a href="#top" className={`back-to-top ${show ? 'show' : ''}`}>
        <i className="bi bi-arrow-up"></i>
      </a>
    </>
  )
}
