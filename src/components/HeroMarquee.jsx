import { Fragment } from 'react'

const ITEMS = [
  ['devicon-java-plain colored', 'Java'],
  ['devicon-spring-plain colored', 'Spring Boot'],
  ['devicon-python-plain colored', 'Python'],
  ['devicon-react-original colored', 'React'],
  ['devicon-nodejs-plain colored', 'Node.js'],
  ['devicon-django-plain colored', 'Django'],
  ['devicon-javascript-plain colored', 'JavaScript'],
  ['devicon-mongodb-plain colored', 'MongoDB'],
  ['devicon-mysql-plain colored', 'MySQL'],
  ['devicon-git-plain colored', 'Git'],
  ['bi bi-cpu', 'AI Tools'],
  ['bi bi-bar-chart-line', 'Power BI'],
]

// Duplicate the list once so the CSS animation (translateX(-50%)) loops seamlessly.
const LOOP = [...ITEMS, ...ITEMS]

export default function HeroMarquee() {
  return (
    <div className="hero-marquee">
      <div className="hero-marquee-track">
        {LOOP.map(([icon, name], i) => (
          <Fragment key={i}>
            <div className="hero-marquee-item">
              <i className={icon} style={{ animationDelay: `${(i % 6) * 0.4}s` }}></i>
              <span>{name}</span>
            </div>
            <span className="hero-marquee-dot"></span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
