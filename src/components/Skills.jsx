import { motion } from 'framer-motion'
import { FiTerminal, FiLayers, FiCloud, FiCpu, FiDatabase, FiServer } from 'react-icons/fi'

const categories = [
    {
        title: 'Languages',
        icon: <FiTerminal />,
        color: '',
        skills: ['C++', 'Python', 'Java', 'C', 'SQL', 'JavaScript', 'HTML/CSS'],
    },
    {
        title: 'Frameworks & Libraries',
        icon: <FiLayers />,
        color: 'purple',
        skills: ['TensorFlow', 'OpenCV', 'FastAPI', 'Django', 'React', 'Node.js', 'Hugging Face'],
    },
    {
        title: 'Cloud & DevOps',
        icon: <FiCloud />,
        color: 'cyan',
        skills: ['AWS', 'Microsoft Azure', 'Docker', 'Git', 'GitHub', 'Vercel', 'CI/CD'],
    },
    {
        title: 'AI & Machine Learning',
        icon: <FiCpu />,
        color: 'emerald',
        skills: ['Deep Learning', 'Computer Vision', 'NLP', 'Generative AI', 'LLMs', 'RAG'],
    },
    {
        title: 'Core CS',
        icon: <FiServer />,
        color: 'rose',
        skills: ['DSA', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'System Design'],
    },
    {
        title: 'Databases',
        icon: <FiDatabase />,
        color: 'amber',
        skills: ['MySQL', 'MongoDB', 'Firebase'],
    },
]

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Skills() {
    return (
        <section className="section" id="skills">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <p className="section-label">Technical Skills</p>
                    <h2 className="section-title">
                        Tools & <span className="highlight">Technologies</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="skills-grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.title}
                            className="glass-card skill-category"
                            variants={fadeIn}
                        >
                            <div className={`skill-category-icon ${cat.color}`}>
                                {cat.icon}
                            </div>
                            <h3>{cat.title}</h3>
                            <div className="skill-tags">
                                {cat.skills.map((s) => (
                                    <span key={s} className="skill-tag">{s}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
