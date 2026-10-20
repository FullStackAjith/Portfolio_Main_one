const STATS = [
  { n: '4+', l: 'Years of Experience' },
  { n: '3', l: 'Web Stacks (Java / MERN / Django)' },
  { n: '15+', l: 'Tools & Technologies' },
  { n: '∞', l: 'Curiosity for AI' },
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="eyebrow reveal">Who I Am</div>
        <h2 className="section-title reveal">About Me</h2>
        <div className="row g-5 align-items-start">
          <div className="col-lg-6 reveal">
            <p className="about-lead">
              I'm Ajithkumar, a Java Full Stack Developer with 4+ years of experience building
              scalable, high-performance applications across Java/Spring Boot and the MERN stack.
              I work comfortably end to end — from responsive React interfaces to REST APIs,
              relational and NoSQL databases, and everything that connects them.
            </p>
            <p className="about-lead">
              Alongside development, I have hands-on experience training teams in Java, Python,
              MERN, and data analytics, and a strong interest in turning raw data into decisions
              using Power BI, Pandas, NumPy, and R. I keep my workflow modern by weaving AI tools
              into everyday development, from debugging to rapid prototyping.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {STATS.map((s, i) => (
                <div className="col-6 reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="glass-card about-stat">
                    <div className="num">{s.n}</div>
                    <div className="lbl">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
