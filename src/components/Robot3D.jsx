import { useEffect, useRef, useState } from 'react'

/**
 * Robot3D — "Nova"
 * -----------------
 * A cartoon-cutout robot (cream body, dark ink outline, red glow accents)
 * docked bottom-right. Normally every part eases toward the cursor:
 *   - head: rotateX/rotateY tilt toward the mouse
 *   - eyes: a small translate "gaze" within the face, toward the cursor,
 *     plus an independent CSS blink animation on the inner eye element
 *   - arms: rotate to reach toward whichever side the mouse is on
 *   - legs: a subtle lean the same direction, like a weight shift
 *
 * Hover the robot itself and it switches to a playful time-based "dance"
 * wiggle instead (computeDanceTargets), and a "Don't touch me!" speech
 * bubble fades in above it.
 *
 * Important: the moving parts intentionally have NO CSS `transition` on
 * `transform` in index.css. The JS loop below lerps every value on every
 * animation frame — adding a CSS transition on top double-damps the motion
 * and makes it feel laggy/delayed. Stacking order is set via z-index (arms
 * above body above legs) so the arms stay visible on top as they swing.
 */
export default function Robot3D() {
  const dockRef = useRef(null)
  const headRef = useRef(null)
  const eyeLRef = useRef(null)
  const eyeRRef = useRef(null)
  const armLRef = useRef(null)
  const armRRef = useRef(null)
  const legLRef = useRef(null)
  const legRRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const hoveringRef = useRef(false)

  useEffect(() => {
    hoveringRef.current = hovering
  }, [hovering])

  useEffect(() => {
    // current / target pairs for every part that eases toward its target
    let curTiltX = 0,
      curTiltY = 0,
      targetTiltX = 0,
      targetTiltY = 0
    let curEX = 0,
      curEY = 0,
      targetEX = 0,
      targetEY = 0
    let curArmL = 10,
      curArmR = -10,
      targetArmL = 10,
      targetArmR = -10
    let curLegL = 0,
      curLegR = 0,
      targetLegL = 0,
      targetLegR = 0
    let mouseX = 0,
      mouseY = 0
    let raf

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function computeTrackTargets() {
      const dock = dockRef.current
      if (!dock) return
      const r = dock.getBoundingClientRect()
      const cx = r.left + r.width * 0.55
      const cy = r.top + r.height * 0.28 // roughly the head center
      const dx = mouseX - cx
      const dy = mouseY - cy
      const angle = Math.atan2(dy, dx)

      // head turns toward the cursor
      targetTiltY = Math.max(-30, Math.min(30, dx / 12))
      targetTiltX = Math.max(-18, Math.min(18, -dy / 18))

      // eyes gaze toward the cursor within the face
      const eyeRadius = 5
      targetEX = Math.cos(angle) * eyeRadius
      targetEY = Math.sin(angle) * eyeRadius * 0.6

      // arms reach toward wherever the mouse goes (mirrored swing)
      const armPull = Math.max(-26, Math.min(26, dx / 16))
      targetArmL = 10 + armPull
      targetArmR = -10 + armPull

      // legs lean slightly the same direction, like a weight shift
      targetLegL = Math.max(-9, Math.min(9, dx / 60))
      targetLegR = targetLegL
    }

    function computeDanceTargets(t) {
      // playful time-based wiggle — head, arms and legs all shake independently
      targetTiltY = Math.sin(t * 7.5) * 20
      targetTiltX = Math.cos(t * 6.2) * 12
      targetEX = Math.sin(t * 11) * 4
      targetEY = Math.cos(t * 9) * 2.5
      targetArmL = 10 + Math.sin(t * 9) * 38
      targetArmR = -10 + Math.cos(t * 9) * 38
      targetLegL = Math.sin(t * 8) * 11
      targetLegR = -Math.sin(t * 8) * 11
    }

    function ease() {
      if (hoveringRef.current) {
        computeDanceTargets(performance.now() / 1000)
      } else {
        computeTrackTargets()
      }

      const armLerp = hoveringRef.current ? 0.4 : 0.28
      const legLerp = hoveringRef.current ? 0.32 : 0.18
      const tiltLerp = hoveringRef.current ? 0.25 : 0.12

      curTiltX += (targetTiltX - curTiltX) * tiltLerp
      curTiltY += (targetTiltY - curTiltY) * tiltLerp
      curEX += (targetEX - curEX) * 0.22
      curEY += (targetEY - curEY) * 0.22
      curArmL += (targetArmL - curArmL) * armLerp
      curArmR += (targetArmR - curArmR) * armLerp
      curLegL += (targetLegL - curLegL) * legLerp
      curLegR += (targetLegR - curLegR) * legLerp

      if (headRef.current) headRef.current.style.transform = `rotateX(${curTiltX}deg) rotateY(${curTiltY}deg)`
      if (eyeLRef.current) eyeLRef.current.style.transform = `translate(${curEX}px, ${curEY}px)`
      if (eyeRRef.current) eyeRRef.current.style.transform = `translate(${curEX}px, ${curEY}px)`
      if (armLRef.current) armLRef.current.style.transform = `rotate(${curArmL}deg)`
      if (armRRef.current) armRRef.current.style.transform = `rotate(${curArmR}deg)`
      if (legLRef.current) legLRef.current.style.transform = `rotate(${curLegL}deg)`
      if (legRRef.current) legRRef.current.style.transform = `rotate(${curLegR}deg)`

      raf = requestAnimationFrame(ease)
    }

    window.addEventListener('mousemove', onMove)
    ease()
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="robot-dock" ref={dockRef} aria-hidden="true">
      <span className="robot-label">AI:// online</span>
      <div className={`robot-tooltip ${hovering ? 'show' : ''}`}>Don't touch me!</div>
      <div className="robot-scale-wrap" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <div className="robot-float">
          <div className="nova">
            <div className="nova-head-wrap" ref={headRef}>
              <div className="nova-ear left"></div>
              <div className="nova-ear right"></div>
              <div className="nova-head">
                <div className="nova-face">
                  <div className="nova-eye-track" ref={eyeLRef}>
                    <div className="nova-eye blink"></div>
                  </div>
                  <div className="nova-eye-track" ref={eyeRRef}>
                    <div className="nova-eye blink"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nova-neck"></div>
            <div className="nova-body">
              <div className="nova-core"></div>
            </div>
            <div className="nova-arm left" ref={armLRef}></div>
            <div className="nova-arm right" ref={armRRef}></div>
            <div className="nova-leg left" ref={legLRef}></div>
            <div className="nova-leg right" ref={legRRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
