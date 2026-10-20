import { useRef } from 'react'

const GROUPS = {
  Frontend: [
    ['devicon-html5-plain colored', 'HTML'],
    ['devicon-css3-plain colored', 'CSS'],
    ['devicon-javascript-plain colored', 'JavaScript'],
    ['devicon-bootstrap-plain colored', 'Bootstrap'],
    ['devicon-react-original colored', 'React js'],
  ],
  Backend: [
    ['devicon-java-plain colored', 'Java'],
    ['devicon-python-plain colored', 'Python'],
    ['devicon-spring-plain colored', 'Spring Boot'],
    ['devicon-django-plain colored', 'Django'],
    ['bi bi-hdd-network', 'Django REST'],
    ['devicon-nodejs-plain colored', 'Node.js'],
    ['devicon-express-original', 'Express.js'],
    ['devicon-cplusplus-plain colored', 'C / C++'],
  ],
  Databases: [
    ['devicon-mysql-plain colored', 'MySQL'],
    ['devicon-mongodb-plain colored', 'MongoDB'],
    ['devicon-postgresql-plain colored', 'PostgreSQL'],
  ],
  'Tools & Version Control': [
    ['devicon-git-plain colored', 'Git'],
    ['devicon-github-original', 'GitHub'],
  ],
  'Data & Analytics': [
    ['bi bi-bar-chart-line', 'Power BI'],
    ['devicon-numpy-original colored', 'NumPy'],
    ['devicon-pandas-original colored', 'Pandas'],
    ['devicon-matplotlib-plain colored', 'Matplotlib'],
    ['bi bi-file-earmark-spreadsheet', 'Excel'],
    ['devicon-r-plain colored', 'R Programming'],
  ],
  AI: [
    ['bi bi-magic', 'GitHub Copilot'],
    ['bi bi-chat-dots', 'ChatGPT'],
    ['bi bi-asterisk', 'Claude AI'],
    ['bi bi-stars', 'Gemini AI'],
    ['bi bi-palette2', 'Canva AI'],
    ['devicon-figma-plain colored', 'Figma AI'],
  ],
}

function SkillCard({ icon, name }) {
  const cardRef = useRef(null)

  function onMove(e) {
    const el = cardRef.current
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `perspective(500px) rotateX(${-y / 14}deg) rotateY(${x / 14}deg) translateY(-6px)`
  }

  function onLeave() {
    cardRef.current.style.transform = 'perspective(500px) rotateX(0) rotateY(0)'
  }

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div ref={cardRef} className="glass-card skill-badge" onMouseMove={onMove} onMouseLeave={onLeave}>
        <i className={icon}></i>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      className="section"
      id="skills"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(122,15,30,0.05), transparent)' }}
    >
      <div className="container">
        <div className="eyebrow reveal">Capabilities</div>
        <h2 className="section-title reveal">Technical Skills</h2>
        {Object.entries(GROUPS).map(([g, items]) => (
          <div key={g} className="reveal">
            <div className="skill-group-title">{g}</div>
            <div className="row g-3 mb-2">
              {items.map(([icon, name]) => (
                <SkillCard key={name} icon={icon} name={name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
