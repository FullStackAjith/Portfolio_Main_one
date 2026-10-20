const ITEMS = [
  {
    date: 'Feb 2025 — Feb 2027',
    title: 'Java, Python, MERN & Data Analytics Trainer — Career Ladder Pvt. Ltd, Coimbatore',
    desc: 'Training teams across Java, Python, MERN, and data analytics workflows.',
  },
  {
    date: 'Mar 2024 — Feb 2025',
    title: 'Java Full Stack Developer — Amazon Pvt. Ltd, Chennai',
    desc: 'Developed scalable, high-performance applications using Java, Spring Boot and the MERN stack.',
  },
  {
    date: 'March 2018 — April 2022',
    title: 'B.Tech, Computer Science & Engineering — Christ College',
    desc: 'CGPA: 8.04.',
  },
  {
    date: 'Feb 2016 — April 2018',
    title: 'HSC — Isha Vidhya Higher Secondary School',
    desc: 'Percentage: 80%.',
  },
]

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="eyebrow reveal">Journey</div>
        <h2 className="section-title reveal">Experience &amp; Education</h2>
        <div className="timeline">
          {ITEMS.map((it, i) => (
            <div className="timeline-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="timeline-date">{it.date}</div>
              <div className="timeline-title">{it.title}</div>
              <div className="timeline-desc">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
