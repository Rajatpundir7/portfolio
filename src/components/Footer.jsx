import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Footer = () => {
    const { content } = useContent();
    const { hero, about } = content;

    return (
        <footer id="contact" style={{
            padding: '80px 0 40px',
            borderTop: '1px solid var(--border-glass)',
            marginTop: '60px'
        }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Feel free to reach out for collaborations or just a friendly chat
                    </p>
                </motion.div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '60px',
                    flexWrap: 'wrap'
                }}>
                    <a
                        href={`mailto:${about.contact.email}`}
                        className="btn btn-primary"
                    >
                        📧 Email Me
                    </a>
                    <a
                        href={about.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        💼 LinkedIn
                    </a>
                    <a
                        href={about.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        🐙 GitHub
                    </a>
                </div>

                {/* Footer Bottom */}
                <div style={{
                    textAlign: 'center',
                    paddingTop: '40px',
                    borderTop: '1px solid var(--border-glass)'
                }}>
                    <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        {hero.name}
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        marginTop: '8px'
                    }}>
                        Built with ❤️ using React
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
