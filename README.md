# Ajithkumar — Full Stack Developer Portfolio

A dark, cinematic, red-accented 3D portfolio built with **React + Vite + Bootstrap**.
Features a mouse-parallax hero, a CSS-built AI robot whose head eases toward your cursor,
3D-tilt skill badges and project cards, a glowing timeline, and a glassmorphism contact form.

## Folder structure

```
portfolio-react/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css              # design tokens + all component styles
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── ParticleField.jsx  # canvas particle background used in Hero
│       ├── Robot3D.jsx        # mouse-tracking robot (CSS-based)
│       ├── About.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx
│       ├── Experience.jsx     # experience + education timeline
│       ├── Contact.jsx
│       └── Footer.jsx
└── README.md
```

## Getting started

```bash
cd portfolio-react
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Customizing

- **Content**: edit the arrays at the top of `About.jsx`, `Skills.jsx`, `Projects.jsx`,
  `Experience.jsx`, and the contact links in `Contact.jsx` / `Footer.jsx`.
- **Colors / type**: everything is driven by CSS variables at the top of `src/index.css`
  (`--bg-void`, `--red-core`, `--font-display`, etc.) — change them once, the whole site updates.
- **Resume**: your real resume PDF is already at `public/resume.pdf`, and the "Download Resume"
  button in `Hero.jsx` links to it directly. Replace that file to update what visitors download.
- **Skill icons**: pulled from [Devicon](https://devicon.dev/) via CDN (linked in `index.html`)
  for authentic logos (Java's coffee cup, the React atom, etc.), with a few Bootstrap Icons for
  tools Devicon doesn't cover (Power BI, Excel, AI Tools, Django REST).
- **Contact form**: `Contact.jsx` currently logs the submission to the console. Wire
  `handleSubmit` up to a service like Formspree, EmailJS, or your own API endpoint.

## Profile photo

Your photo appears as a circular avatar next to the "AJITHKUMAR" logo in the navbar
(`.brand-avatar` in `index.css`, used in both the desktop nav and the mobile drawer in
`Navbar.jsx`). It reads from `public/profile.jpg` — replace that file to swap the photo. Resize
it via the `.brand-avatar` rule (`width`/`height`) in `index.css`.

## Hero tech marquee

`HeroMarquee.jsx` is an infinite-scrolling ticker of tech icons (Java, Spring Boot, Python,
React, Node.js, Django, JavaScript, MongoDB, MySQL, Git, plus AI Tools and Power BI) sitting
just above the headline in `Hero.jsx`. It's a pure-CSS loop — the icon list is duplicated once
and animated with `translateX(-50%)` so it wraps seamlessly — hover it to pause. It renders
full-bleed edge-to-edge (breaks out of the container via the `100vw` + negative-margin trick in
`.hero-marquee`), framed top and bottom by a bright gold streak that continuously slides left
to right (and right to left on the bottom edge) in a loop — `marquee-border-slide` in
`index.css`.

The band uses the same theme-aware glass background as the rest of the site
(`var(--bg-glass)` on `.hero-marquee`) — it switches with the light/dark toggle like everything
else. Each icon also blinks gently on a staggered loop (`icon-blink` in `index.css`, delay set
per-icon in `HeroMarquee.jsx`) so they twinkle independently rather than all at once. Edit the
`ITEMS` array at the top of the file to change which technologies show, or the `font-size`/`gap`
values in `.hero-marquee-item` / `.hero-marquee-track` in `index.css` to resize it further.

## Projects section

`Projects.jsx` renders projects as a **clickable row list** (not a grid) — each row is a single
`<a>` spanning the full width, so clicking anywhere on a project (icon, title, description, tech
pills) opens its GitHub repo in a new tab. Edit the `ITEMS` array at the top to add, remove, or
re-link projects; give each one a real `github` URL once you have per-project repos instead of
linking everyone back to your profile.

## Magic cursor

`MagicCursor.jsx` replaces the default pointer with a glowing red dot, a softer trailing ring
that eases a beat behind it, and a light sparkle trail drawn on a full-page canvas as you move.
Hovering any link, button, or card grows the ring and turns the dot white as a "this is
clickable" cue. It automatically turns itself off on touch devices (checks
`(hover: hover) and (pointer: fine)`), so it never gets in the way on mobile. Tweak the hover
selector list or particle spawn rate at the top of the `useEffect` in `MagicCursor.jsx`.

## Typewriter tagline

The line under your name ("Full Stack Developer — Web · Data · AI Tools") types itself out,
pauses, deletes, and retypes in an endless loop — `useTypewriter.js` is a small reusable hook
(`src/hooks/useTypewriter.js`) driving it, paired with a blinking `.type-cursor` caret in
`index.css`. Change the string passed to `useTypewriter(...)` in `Hero.jsx` to edit the text, or
the `typeSpeed`/`deleteSpeed`/`pause` options to change its pacing.

## Navigation bar

`Navbar.jsx` (plus `ScrollProgress.jsx`) is a from-scratch premium nav — no Bootstrap JS
dependency:

- **Scroll progress bar** — a thin glowing red line at the very top of the page that fills as
  you scroll.
- **Floating pill nav** (desktop) — links live inside a glassy capsule with a quiet static
  hairline border. The active link gets a solid red pill background, driven by a real scrollspy
  (`IntersectionObserver` watching each section) rather than just matching the URL hash.
- **Custom animated burger + slide-in drawer** (mobile) — the three lines morph into an X, and
  a full-height glass drawer slides in from the right with staggered link entrance animations
  and a backdrop that locks page scroll while open.
- **GitHub icon button + theme toggle** live in both the desktop nav and the mobile drawer
  footer.

Edit `NAV_LINKS` / `SECTION_IDS` at the top of `Navbar.jsx` to add or rename sections — just
keep the two arrays in sync (a link's lowercase name should match its section's `id`).

## The robot — "Nova"

`Robot3D.jsx` renders a cartoon-cutout robot docked bottom-right: cream body, dark ink outline,
red glow accents (ears, eyes, chest core). Normally every part eases toward the cursor
independently — head tilts in 3D, eyes gaze within the face, arms reach toward whichever side
the mouse is on, legs lean slightly the same direction like a subtle weight shift. **Hover the
robot itself** and it switches to a playful time-based dance wiggle instead
(`computeDanceTargets` — head, arms and legs all shake on independent sine waves), and a
"Don't touch me!" speech bubble fades in above it (`.robot-tooltip`). Move the mouse away and it
smoothly returns to normal cursor-tracking. Tune the `Math.sin(t * ...)` frequencies/amplitudes
in `computeDanceTargets` to make the dance faster, slower, or wilder, or edit the bubble text
directly in the JSX.

## Dark mode / light mode

Click the switch in the navbar to flip between dark and light themes. It works by toggling
`data-theme="dark" | "light"` on the `<html>` element (`ThemeToggle.jsx`) — every color in
`src/index.css` is a CSS variable defined once at the top and re-declared inside an
`html[data-theme="light"] { ... }` block, so no other component needs to know about theming.
Defaults to dark on load; change the initial `useState('dark')` in `ThemeToggle.jsx` if you'd
rather default to light, or wire in `prefers-color-scheme` / persistence to `localStorage` if
you want it to remember the user's choice.

## Upgrading the robot to a real 3D GLB model

If you'd rather have a true, riggable 3D robot instead of the CSS build:

```bash
npm install three @react-three/fiber @react-three/drei
```

Then replace the contents of `Robot3D.jsx` with an R3F `<Canvas>`, load the model with
`useGLTF()`, and each frame lerp the head bone's rotation toward a target computed from the
mouse position — the same easing math already used in this file (`curX/curY` chasing
`targetX/targetY`) carries over directly.

## Contact form

Submitting the form POSTs to [FormSubmit.co](https://formsubmit.co) — a free form-to-email
service that delivers straight to `ajithajith54957@gmail.com` with no backend, API keys, or
account signup required upfront (`handleSubmit` in `Contact.jsx`). It validates that
name/email/message are filled in, shows a sending/sent/error state, and clears the form on
success.

**One-time step:** the very first submission triggers an activation email from FormSubmit to
`ajithajith54957@gmail.com` — click the confirmation link in that email once, and every
submission after that delivers automatically with no further action needed.

Want a different service instead (your own EmailJS or Formspree account, or a custom backend)?
Swap the `fetch(...)` call inside `handleSubmit`.

## Notes

- Icons come from **Bootstrap Icons** via CDN (linked in `index.html`).
- Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (labels/eyebrows) —
  loaded from Google Fonts in `index.html`.
- All scroll-reveal animations use `IntersectionObserver` (`useReveal` in `App.jsx`), no extra
  animation library required.
