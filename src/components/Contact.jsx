import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiCode, FiPhone } from 'react-icons/fi'

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Contact() {
    return (
        <section className="section" id="contact">
            <div className="container">
                <motion.div
                    className="contact-content"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    <motion.p className="section-label" variants={fadeIn} style={{ justifyContent: 'center' }}>
                        Get in Touch
                    </motion.p>
                    <motion.h2 variants={fadeIn}>
                        Let's Build Something <span className="highlight">Amazing</span>
                    </motion.h2>
                    <motion.p variants={fadeIn}>
                        I'm currently looking for internship opportunities at top tech companies.
                        If you'd like to discuss AI, ML, or software engineering — let's connect!
                    </motion.p>

                    <motion.div className="contact-links" variants={fadeIn}>
                        <a
                            href="mailto:rajatpundir07@gmail.com"
                            className="contact-btn primary"
                        >
                            <FiMail /> rajatpundir07@gmail.com
                        </a>
                        <a href="tel:+918923365987" className="contact-btn">
                            <FiPhone /> +91-8923365987
                        </a>
                        <a
                            href="https://github.com/Rajatpundir07"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-btn"
                        >
                            <FiGithub /> GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/rajat-pundir-b7556b298"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-btn"
                        >
                            <FiLinkedin /> LinkedIn
                        </a>
                        <a
                            href="https://leetcode.com/rajatpundir07"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-btn"
                        >
                            <FiCode /> LeetCode
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
