import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { FiBox, FiActivity, FiTruck, FiBarChart2 } from 'react-icons/fi'

const projects = [
    {
        title: 'KISAN.JI — AI Agriculture Platform',
        date: 'Dec 2025 – Jan 2026',
        icon: <FiActivity />,
        description:
            'Full-stack smart agriculture platform integrating 7 deep learning models for crop disease detection across 45+ crops and 300+ disease classes. Built with FastAPI + Django backend, MongoDB, and ONNX-optimized inference pipelines.',
        tech: ['FastAPI', 'Django', 'MongoDB', 'TensorFlow', 'ONNX', 'React'],
        metrics: ['45+ Crops', '300+ Diseases', '7 DL Models'],
        github: 'https://github.com/Rajatpundir7/kisanji',
    },
    {
        title: 'Smart Traffic Management System',
        date: 'Aug 2025 – Nov 2025',
        icon: <FiTruck />,
        description:
            'End-to-end adaptive traffic signal control using Deep Q-Network algorithm. Real-time video processing pipeline with TensorFlow and OpenCV for live CCTV feed analysis. Reduced vehicle wait time by 40%.',
        tech: ['Python', 'TensorFlow', 'OpenCV', 'Gymnasium', 'DRL'],
        metrics: ['40% Less Wait', '100K Timesteps', '602 FPS'],
        github: 'https://github.com/Rajatpundir7/Smart-Traffic-Management-Systern-for-Urban-Congestion',
    },
    {
        title: 'QuizEra — Full-Stack Quiz Platform',
        date: 'Mar 2025 – May 2025',
        icon: <FiBox />,
        description:
            'Scalable quiz-hosting platform supporting 100+ concurrent sessions. Built automated evaluation engine eliminating 85% of manual scoring overhead with real-time progress tracking.',
        tech: ['Java', 'JDBC', 'MySQL', 'OOP'],
        metrics: ['100+ Sessions', '85% Less Scoring', '30% Better Rate'],
        github: 'https://github.com/Rajatpundir7/QuizEra',
    },
    {
        title: 'Smart Product Pricing Engine',
        date: 'Oct 2025',
        icon: <FiBarChart2 />,
        description:
            'Multimodal data pipeline processing 75K catalog entries with TF-IDF, Sentence Transformers, and CNN-based image embeddings. Ensemble XGBoost + LightGBM model with 50+ engineered features.',
        tech: ['Python', 'XGBoost', 'LightGBM', 'Transformers', 'CNN'],
        metrics: ['75K Entries', '50+ Features', '53.63 SMAPE'],
        github: 'https://github.com/Rajatpundir7/amazon-ml-challanges-',
    },
]

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects() {
    return (
        <section className="section" id="projects">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                >
                    <p className="section-label">Projects</p>
                    <h2 className="section-title">
                        Featured <span className="highlight">Work</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {projects.map((p) => (
                        <motion.div key={p.title} className="glass-card project-card" variants={fadeIn}>
                            <div className="project-header">
                                <div className="project-icon">{p.icon}</div>
                                <div className="project-links">
                                    <a
                                        href={p.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                        aria-label="GitHub"
                                    >
                                        <FiGithub />
                                    </a>
                                </div>
                            </div>

                            <h3>{p.title}</h3>
                            <p className="project-date">{p.date}</p>
                            <p>{p.description}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                                {p.metrics.map((m) => (
                                    <span key={m} className="project-metric">{m}</span>
                                ))}
                            </div>

                            <div className="project-tech">
                                {p.tech.map((t) => (
                                    <span key={t} className="skill-tag">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
