import { motion } from 'framer-motion'
import { FiAward, FiCode, FiTrendingUp, FiShield } from 'react-icons/fi'

const stats = [
    { icon: <FiShield />, number: '1', label: 'Patent Filed' },
    { icon: <FiCode />, number: '300+', label: 'LC Problems' },
    { icon: <FiTrendingUp />, number: 'Top 20', label: 'IIT Delhi Hackathon' },
    { icon: <FiAward />, number: 'AWS', label: 'Certified' },
]

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
    return (
        <section className="section" id="about">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <p className="section-label">About Me</p>
                    <h2 className="section-title">
                        Building <span className="highlight">Intelligent</span> Solutions
                    </h2>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={fadeIn}
                    >
                        <p>
                            I'm a 2nd-year B.Tech student at <strong>Graphic Era Hill University</strong>,
                            pursuing Computer Science with a specialization in Artificial Intelligence &
                            Machine Learning, maintaining a <strong>CGPA of 8.56/10</strong>.
                        </p>
                        <p>
                            My work spans across <strong>Deep Learning, Computer Vision, NLP, and Full-Stack
                                Development</strong>. I've built production-grade systems including AI-powered agriculture
                            platforms, adaptive traffic management systems, and scalable quiz platforms.
                        </p>
                        <p>
                            I hold an <strong>Indian patent</strong> for an Adaptive Multi-Agent Traffic Control System,
                            was a <strong>hackathon finalist at IIT Delhi</strong> (Top 20/700+ teams), and have published
                            an <strong>IEEE 1st-place research paper</strong> on AI-based traffic control.
                        </p>
                    </motion.div>

                    <motion.div
                        className="about-stats"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                        }}
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} className="glass-card stat-card" variants={fadeIn}>
                                <div className="stat-number">{s.number}</div>
                                <div className="stat-label">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
