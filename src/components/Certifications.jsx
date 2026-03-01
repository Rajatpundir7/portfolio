import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'

const certs = [
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'Aug 2025',
        color: 'amber',
    },
    {
        title: 'Generative AI & LLMs / Foundation Models / Language Modeling',
        issuer: 'IBM',
        date: '2025 – 2026',
        color: 'blue',
    },
    {
        title: 'Cloud Computing',
        issuer: 'NPTEL (IIT)',
        date: 'Sep 2024',
        color: 'purple',
    },
]

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Certifications() {
    return (
        <section className="section" id="certifications">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <p className="section-label">Certifications</p>
                    <h2 className="section-title">
                        Professional <span className="highlight">Credentials</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="cert-grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {certs.map((c, i) => (
                        <motion.div key={i} className="glass-card cert-card" variants={fadeIn}>
                            <div className={`cert-icon ${c.color}`}>
                                <FiAward />
                            </div>
                            <h3>{c.title}</h3>
                            <p className="cert-issuer">{c.issuer}</p>
                            <p className="cert-date">{c.date}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
