import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { GradientText } from './AnimatedText';

const Footer = () => {
    const { content } = useContent();
    const { hero, about } = content;

    const socialLinks = [
        {
            name: 'Email',
            icon: '📧',
            href: `mailto:${about.contact.email}`,
            color: '#22d3ee',
            label: 'Email Me'
        },
        {
            name: 'LinkedIn',
            icon: '💼',
            href: about.contact.linkedin,
            color: '#8b5cf6',
            label: 'LinkedIn'
        },
        {
            name: 'GitHub',
            icon: '🐙',
            href: about.contact.github,
            color: '#ec4899',
            label: 'GitHub'
        }
    ];

    return (
        <footer id="contact" style={{
            padding: '100px 0 50px',
            borderTop: '1px solid var(--border-glass)',
            marginTop: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '300px',
                background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 className="section-title" style={{ fontSize: '3rem' }}>
                        Let's Create Something Amazing
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto', fontSize: '1.2rem' }}>
                        Have a project in mind? Let's collaborate and bring your ideas to life
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="footer-buttons-mobile"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        marginBottom: '80px',
                        flexWrap: 'wrap'
                    }}
                >
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            target={link.name !== 'Email' ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className={`btn ${index === 0 ? 'btn-primary' : 'btn-secondary'}`}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: `0 0 40px ${link.color}50`
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                            {link.label}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Divider */}
                <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--border-glass), transparent)',
                    marginBottom: '50px'
                }} />

                {/* Footer Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{ textAlign: 'center' }}
                >
                    <motion.p
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2rem',
                            fontWeight: '800',
                            marginBottom: '16px'
                        }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <GradientText>{hero.name}</GradientText>
                    </motion.p>

                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem',
                        marginBottom: '12px'
                    }}>
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>

                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        Built with
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{ fontSize: '1.2rem' }}
                        >
                            ❤️
                        </motion.span>
                        using
                        <span style={{
                            color: 'var(--accent)',
                            fontWeight: '600'
                        }}>
                            React + Vite
                        </span>
                    </p>

                    {/* Tech stack icons */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginTop: '24px',
                        opacity: 0.6
                    }}>
                        {['⚛️', '⚡', '🎨', '✨'].map((emoji, index) => (
                            <motion.span
                                key={index}
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    delay: index * 0.2
                                }}
                                style={{ fontSize: '1.5rem' }}
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
