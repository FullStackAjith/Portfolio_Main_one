import { useEffect, useState } from 'react'

/**
 * useTypewriter
 * -------------
 * Types out `text` character by character, pauses, deletes it, pauses,
 * then retypes — looping forever. Returns the currently-displayed slice
 * of the string; pair it with the `.type-cursor` CSS class for a blinking
 * caret.
 */
export default function useTypewriter(
  text,
  { typeSpeed = 55, deleteSpeed = 28, pause = 1500, restartDelay = 500 } = {}
) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0
    let deleting = false
    let timeout

    function tick() {
      if (!deleting) {
        i++
        setDisplay(text.slice(0, i))
        if (i >= text.length) {
          timeout = setTimeout(() => {
            deleting = true
            tick()
          }, pause)
          return
        }
        timeout = setTimeout(tick, typeSpeed)
      } else {
        i--
        setDisplay(text.slice(0, i))
        if (i <= 0) {
          deleting = false
          timeout = setTimeout(tick, restartDelay)
          return
        }
        timeout = setTimeout(tick, deleteSpeed)
      }
    }

    timeout = setTimeout(tick, typeSpeed)
    return () => clearTimeout(timeout)
  }, [text])

  return display
}
