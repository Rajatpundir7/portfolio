import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiCode, FiArrowDown } from 'react-icons/fi'
import profileImg from '../../profile.jpg'

const socials = [
    { icon: <FiGithub />, href: 'https://github.com/Rajatpundir07', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/rajat-pundir-b7556b298', label: 'LinkedIn' },
    { icon: <FiCode />, href: 'https://leetcode.com/rajatpundir07', label: 'LeetCode' },
    { icon: <FiMail />, href: 'mailto:rajatpundir07@gmail.com', label: 'Email' },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* Background */}
            <div className="hero-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="hero-grid" />
            </div>

            <div className="container">
                <motion.div
                    className="hero-content"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <div className="hero-text">
                        <motion.p className="hero-greeting" variants={fadeUp}>
                            👋 Hi, I'm
                        </motion.p>

                        <motion.h1 className="hero-name" variants={fadeUp}>
                            <span className="gradient">Rajat Pundir</span>
                        </motion.h1>

                        <motion.h2 className="hero-role" variants={fadeUp}>
                            AI & Machine Learning Engineer
                        </motion.h2>

                        <motion.p className="hero-desc" variants={fadeUp}>
                            B.Tech CSE (AI & ML) student passionate about building intelligent systems.
                            Specializing in Deep Learning, Computer Vision, NLP, and Full-Stack Development.
                            Patent holder & hackathon finalist at IIT Delhi.
                        </motion.p>

                        <motion.div className="hero-actions" variants={fadeUp}>
                            <a href="#projects" className="btn btn-primary">
                                View Projects <FiArrowDown />
                            </a>
                            <a href="#contact" className="btn btn-secondary">
                                Get in Touch
                            </a>
                        </motion.div>

                        <motion.div className="hero-socials" variants={fadeUp}>
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-icon"
                                    aria-label={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div className="hero-photo-wrapper" variants={fadeUp}>
                        <div className="hero-photo-ring">
                            <img
                                src={profileImg}
                                alt="Rajat Pundir"
                                className="hero-photo"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
