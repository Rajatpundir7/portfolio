import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';
import Tilt from 'react-parallax-tilt';
import { RevealOnScroll, GlowText } from './AnimatedText';

const About = () => {
    const { content, updateNestedContent, updateContent } = useContent();
    const { isLoggedIn } = useAuth();
    const { about } = content;

    const updateContact = (key, value) => {
        updateContent('about', {
            ...about,
            contact: {
                ...about.contact,
                [key]: value
            }
        });
    };

    const contactItems = [
        { icon: '📱', label: 'Phone', key: 'phone', color: 'var(--accent-green)' },
        { icon: '📧', label: 'Email', key: 'email', color: 'var(--accent)' },
        { icon: '💼', label: 'LinkedIn', key: 'linkedin', color: 'var(--primary)' },
        { icon: '🐙', label: 'GitHub', key: 'github', color: 'var(--accent-pink)' },
        { icon: '💻', label: 'LeetCode', key: 'leetcode', color: 'var(--accent-orange)' }
    ];

    return (
        <section id="about">
            <div className="container">
                <RevealOnScroll>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">About Me</h2>
                        <p className="section-subtitle">Get to know the person behind the code</p>
                    </motion.div>
                </RevealOnScroll>

                <div className="about-grid-mobile" style={{
                    display: 'grid',
                    gridTemplateColumns: '300px 1fr',
                    gap: '60px',
                    marginTop: '60px',
                    alignItems: 'start'
                }}>
                    {/* Profile Photo with 3D Tilt */}
                    <RevealOnScroll direction="left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ textAlign: 'center' }}
                        >
                            <Tilt
                                tiltMaxAngleX={15}
                                tiltMaxAngleY={15}
                                perspective={1000}
                                scale={1.05}
                                transitionSpeed={2000}
                                glareEnable={true}
                                glareMaxOpacity={0.3}
                                glareColor="#8b5cf6"
                                glareBorderRadius="50%"
                            >
                                <div style={{
                                    position: 'relative',
                                    display: 'inline-block'
                                }}>
                                    {/* Glow ring behind photo */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        left: '-10px',
                                        right: '-10px',
                                        bottom: '-10px',
                                        borderRadius: '50%',
                                        background: 'var(--gradient-primary)',
                                        opacity: 0.3,
                                        filter: 'blur(20px)',
                                        animation: 'pulse 3s ease-in-out infinite'
                                    }} />
                                    <EditableMedia
                                        type="image"
                                        value={about.photo}
                                        onSave={(val) => updateNestedContent('about', 'photo', val)}
                                        className="about-photo-mobile"
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                            borderRadius: '50%',
                                            margin: '0 auto',
                                            border: '4px solid var(--primary)',
                                            boxShadow: 'var(--shadow-glow-purple)',
                                            position: 'relative',
                                            zIndex: 1
                                        }}
                                    />
                                </div>
                            </Tilt>

                            <motion.h3
                                style={{ marginTop: '24px', fontSize: '1.6rem' }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <GlowText color="primary">{content.hero.name}</GlowText>
                            </motion.h3>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.05rem',
                                marginTop: '8px'
                            }}>
                                {content.hero.title}
                            </p>

                            {/* Status indicator */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginTop: '16px',
                                padding: '8px 16px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '20px'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    background: '#10b981',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 10px #10b981',
                                    animation: 'pulse 2s infinite'
                                }}></span>
                                <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '500' }}>
                                    Open to Work
                                </span>
                            </div>
                        </motion.div>
                    </RevealOnScroll>

                    {/* About Content */}
                    <div>
                        <RevealOnScroll direction="right" delay={0.2}>
                            <Tilt
                                tiltMaxAngleX={5}
                                tiltMaxAngleY={5}
                                perspective={1000}
                                transitionSpeed={2000}
                            >
                                <div className="glass-card" style={{ marginBottom: '24px' }}>
                                    <h3 style={{
                                        marginBottom: '20px',
                                        color: 'var(--accent)',
                                        fontSize: '1.4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <span>🚀</span> Who I Am
                                    </h3>
                                    <EditableText
                                        value={about.description}
                                        onSave={(val) => updateNestedContent('about', 'description', val)}
                                        as="p"
                                        multiline
                                        style={{
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.9',
                                            fontSize: '1.05rem'
                                        }}
                                    />
                                </div>
                            </Tilt>
                        </RevealOnScroll>

                        {/* Contact Info */}
                        <RevealOnScroll direction="right" delay={0.4}>
                            <Tilt
                                tiltMaxAngleX={5}
                                tiltMaxAngleY={5}
                                perspective={1000}
                                transitionSpeed={2000}
                            >
                                <div className="glass-card">
                                    <h3 style={{
                                        marginBottom: '24px',
                                        color: 'var(--accent)',
                                        fontSize: '1.4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <span>📬</span> Get In Touch
                                    </h3>

                                    <div style={{ display: 'grid', gap: '16px' }}>
                                        {contactItems
                                            .filter(item => about.contact[item.key])
                                            .map((item, index) => (
                                                <motion.div
                                                    key={item.key}
                                                    className="contact-item-mobile"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{
                                                        x: 10,
                                                        background: 'rgba(139, 92, 246, 0.1)'
                                                    }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        padding: '12px 16px',
                                                        borderRadius: '12px',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <span style={{
                                                        fontSize: '28px',
                                                        filter: `drop-shadow(0 0 8px ${item.color})`
                                                    }}>
                                                        {item.icon}
                                                    </span>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <span style={{
                                                            color: 'var(--text-muted)',
                                                            fontSize: '0.85rem',
                                                            display: 'block',
                                                            marginBottom: '4px'
                                                        }}>
                                                            {item.label}
                                                        </span>
                                                        <EditableText
                                                            value={about.contact[item.key]}
                                                            onSave={(val) => updateContact(item.key, val)}
                                                            as="p"
                                                            style={{
                                                                fontWeight: '500',
                                                                wordBreak: 'break-all',
                                                                fontSize: '0.95rem',
                                                                color: 'var(--text-primary)'
                                                            }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            </Tilt>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
