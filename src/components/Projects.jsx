const ITEMS = [
  {
    title: 'Library Management System',
    desc: 'A full stack system for managing library records, built with Java, Spring Boot and REST APIs backed by relational database integration.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL'],
    icon: 'bi-book',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'Power BI Sales Dashboard',
    desc: 'A sales analytics dashboard built with Power BI — data cleaning, DAX measures, and interactive visualizations to analyze sales performance.',
    tech: ['Power BI', 'DAX', 'Data Cleaning'],
    icon: 'bi-bar-chart-line',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'E-Commerce Web Application',
    desc: 'A responsive MERN-stack e-commerce app with product browsing, authentication, cart, order management and REST APIs.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    icon: 'bi-cart3',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'Food Ball E-Commerce Website',
    desc: 'An online food ordering and e-commerce platform with product browsing, cart, and checkout flow.',
    tech: ['React', 'Node.js', 'MongoDB'],
    icon: 'bi-egg-fried',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'Student Management System',
    desc: 'A system for managing student records, attendance, and academic data with role-based access.',
    tech: ['Java', 'Spring Boot', 'MySQL'],
    icon: 'bi-mortarboard',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'Weather App — React',
    desc: 'A React weather application that fetches live forecasts by city with a clean, responsive UI.',
    tech: ['React', 'Weather API', 'CSS'],
    icon: 'bi-cloud-sun',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'Watch Store — React JS',
    desc: 'A React-based e-commerce storefront for browsing and purchasing watches, with product filtering and a cart.',
    tech: ['React', 'JavaScript', 'CSS'],
    icon: 'bi-smartwatch',
    github: 'https://github.com/FullStackAjith',
  },
  {
    title: 'Food Shop',
    desc: 'A food ordering web app connecting customers with local shops, featuring menus, cart, and order flow.',
    tech: ['React', 'Node.js', 'Express.js'],
    icon: 'bi-shop',
    github: 'https://github.com/FullStackAjith',
  },
]

function ProjectRow({ title, desc, tech, icon, github }) {
  return (
    <a href={github} target="_blank" rel="noreferrer" className="glass-card project-row">
      <div className="project-row-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="project-row-body">
        <div className="project-row-title">{title}</div>
        <p className="project-row-desc">{desc}</p>
        <div>
          {tech.map((t) => (
            <span className="tech-pill" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="project-row-arrow">
        <i className="bi bi-arrow-up-right"></i>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="eyebrow reveal">Selected Work</div>
        <h2 className="section-title reveal" style={{ marginBottom: '0.6rem' }}>
          Projects
        </h2>
        <p
          className="reveal"
          style={{
            color: 'var(--text-low)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
            marginBottom: '2.2rem',
          }}
        >
          Click any project to open its GitHub repository ↗
        </p>
        <div className="project-list">
          {ITEMS.map((p, i) => (
            <div className="reveal" key={i} style={{ transitionDelay: `${(i % 4) * 0.06}s` }}>
              <ProjectRow {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
