import { useEffect, useRef } from 'react'

/**
 * MagicCursor
 * -----------
 * Replaces the default pointer with a glowing red dot that sits exactly on
 * the cursor, a softer ring that eases toward it a beat behind, and a trail
 * of small sparks drawn on a full-page canvas as you move. Hovering any
 * clickable element (links, buttons, cards) grows the ring and swaps the
 * dot to white, signalling "this is clickable".
 *
 * Automatically disables itself on touch devices via a
 * `(hover: hover) and (pointer: fine)` media query check, so it never
 * interferes with tapping on mobile.
 */
export default function MagicCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    document.body.classList.add('magic-cursor-active')
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let mouseX = w / 2,
      mouseY = h / 2
    let ringX = mouseX,
      ringY = mouseY
    let particles = []
    let raf

    function spawnParticle(x, y) {
      const hue = Math.random() < 0.5 ? '255,48,73' : '255,106,77'
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -Math.random() * 0.9 - 0.25,
        life: 1,
        size: Math.random() * 2.2 + 1.2,
        color: hue,
      })
    }

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`
      }
      if (Math.random() < 0.6) spawnParticle(mouseX, mouseY)
    }

    function onOver(e) {
      const hoverable =
        e.target.closest &&
        e.target.closest('a, button, .glass-card, .skill-badge, .project-row, .theme-toggle, .nav-burger, input, textarea')
      if (ringRef.current) ringRef.current.classList.toggle('hovering', !!hoverable)
      if (dotRef.current) dotRef.current.classList.toggle('hovering', !!hoverable)
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`
      }
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.022
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(p.size * p.life, 0), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${Math.max(p.life, 0)})`
        ctx.fill()
      })
      particles = particles.filter((p) => p.life > 0)
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    loop()

    return () => {
      document.body.classList.remove('magic-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="cursor-trail-canvas"></canvas>
      <div ref={ringRef} className="cursor-ring"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  )
}
