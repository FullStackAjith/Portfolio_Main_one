import { useEffect, useState } from 'react'

/**
 * ThemeToggle
 * -----------
 * Flips a `data-theme` attribute on <html> between "dark" and "light".
 * All colors in index.css are defined as CSS variables, with an
 * `html[data-theme="light"]` block overriding them — so this component
 * doesn't need to touch any other component to re-theme the whole site.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle light and dark mode"
    >
      <span className="knob">
        <i className={`bi ${theme === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
      </span>
    </button>
  )
}
