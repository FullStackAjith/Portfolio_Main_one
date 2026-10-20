import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement
      const scrollable = h.scrollHeight - h.clientHeight
      setPct(scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="scroll-progress" style={{ width: `${pct}%` }}></div>
}
