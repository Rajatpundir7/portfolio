import { motion } from 'framer-motion'
import { FiFileText, FiUsers, FiBookOpen, FiTarget, FiZap } from 'react-icons/fi'

const achievements = [
    {
        icon: <FiFileText />,
        color: 'gold',
        title: 'Patent Filed (India)',
        description:
            'Independently innovated Adaptive Multi-Agent Traffic Control System using GNN, Reinforcement Learning, Computer Vision. Application No. 202511132246 A.',
        date: 'Feb 2026',
    },
    {
        icon: <FiUsers />,
        color: 'blue',
        title: 'Hackathon Finalist — Team Leader',
        description:
            'Led cross-functional team at Square Hack, IIT Delhi (Top 20 of 700+ teams). Collaborated on ideation, prototyping, and presentation.',
        date: 'Dec 2025',
    },
    {
        icon: <FiBookOpen />,
        color: 'purple',
        title: 'IEEE Research Paper — 1st Place',
        description:
            'Published "AI-Based Traffic Control: GNN-DRL with Computer Vision & Multi-Agent Coordination".',
        date: 'Oct 2025',
    },
    {
        icon: <FiTarget />,
        color: 'emerald',
        title: 'Amazon ML Challenge 2025',
        description:
            'Ranked under 1,500 of 70,000+ participants in the national-level machine learning competition.',
        date: 'Oct 2025',
    },
    {
        icon: <FiZap />,
        color: 'rose',
        title: 'Competitive Programming',
        description:
            'Solved 300+ problems on LeetCode (C++, Python, Java). Contest Rating 1590+.',
        date: 'Ongoing',
    },
]

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Achievements() {
    return (
        <section className="section" id="achievements">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <p className="section-label">Achievements</p>
                    <h2 className="section-title">
                        Awards & <span className="highlight">Recognition</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="achievements-list"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {achievements.map((a, i) => (
                        <motion.div key={i} className="glass-card achievement-item" variants={fadeIn}>
                            <div className={`achievement-icon ${a.color}`}>{a.icon}</div>
                            <div className="achievement-content">
                                <h3>{a.title}</h3>
                                <p>{a.description}</p>
                                <p className="achievement-date">{a.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
