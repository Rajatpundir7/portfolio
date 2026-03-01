import { motion } from 'framer-motion'
import { FiBookOpen, FiCalendar, FiStar } from 'react-icons/fi'

const coursework = [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
]

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Education() {
    return (
        <section className="section" id="education">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <p className="section-label">Education</p>
                    <h2 className="section-title">
                        Academic <span className="highlight">Background</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="glass-card edu-card"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <div className="edu-icon">
                        <FiBookOpen />
                    </div>
                    <div className="edu-content">
                        <h3>Graphic Era Hill University</h3>
                        <p className="edu-degree">
                            Bachelor of Technology in Computer Science
                            <br />
                            <em>Artificial Intelligence & Machine Learning</em>
                        </p>
                        <div className="edu-meta">
                            <span>
                                <FiCalendar /> Aug 2023 – May 2027
                            </span>
                            <span className="cgpa">
                                <FiStar /> CGPA: 8.56/10
                            </span>
                        </div>
                        <div className="edu-coursework">
                            {coursework.map((c) => (
                                <span key={c} className="skill-tag">{c}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
