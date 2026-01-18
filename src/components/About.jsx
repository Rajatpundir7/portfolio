import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';

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

    return (
        <section id="about">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>
                </motion.div>

                <div className="about-grid-mobile" style={{
                    display: 'grid',
                    gridTemplateColumns: '300px 1fr',
                    gap: '60px',
                    marginTop: '50px',
                    alignItems: 'start'
                }}>
                    {/* Profile Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center' }}
                    >
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
                                boxShadow: 'var(--shadow-glow)'
                            }}
                        />
                        <h3 style={{ marginTop: '20px', fontSize: '1.5rem' }}>
                            {content.hero.name}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {content.hero.title}
                        </p>
                    </motion.div>

                    {/* About Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass-card" style={{ marginBottom: '24px' }}>
                            <h3 style={{
                                marginBottom: '16px',
                                color: 'var(--primary)',
                                fontSize: '1.3rem'
                            }}>
                                Who I Am
                            </h3>
                            <EditableText
                                value={about.description}
                                onSave={(val) => updateNestedContent('about', 'description', val)}
                                as="p"
                                multiline
                                style={{
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.8'
                                }}
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="glass-card">
                            <h3 style={{
                                marginBottom: '20px',
                                color: 'var(--primary)',
                                fontSize: '1.3rem'
                            }}>
                                Contact Information
                            </h3>

                            <div style={{ display: 'grid', gap: '16px' }}>
                                <div className="contact-item-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>📱</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Phone</span>
                                        <EditableText
                                            value={about.contact.phone}
                                            onSave={(val) => updateContact('phone', val)}
                                            as="p"
                                            style={{ fontWeight: '500' }}
                                        />
                                    </div>
                                </div>

                                <div className="contact-item-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>📧</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</span>
                                        <EditableText
                                            value={about.contact.email}
                                            onSave={(val) => updateContact('email', val)}
                                            as="p"
                                            style={{ fontWeight: '500', wordBreak: 'break-all' }}
                                        />
                                    </div>
                                </div>

                                <div className="contact-item-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>💼</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>LinkedIn</span>
                                        <EditableText
                                            value={about.contact.linkedin}
                                            onSave={(val) => updateContact('linkedin', val)}
                                            as="p"
                                            style={{ fontWeight: '500', wordBreak: 'break-all', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                </div>

                                <div className="contact-item-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>🐙</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>GitHub</span>
                                        <EditableText
                                            value={about.contact.github}
                                            onSave={(val) => updateContact('github', val)}
                                            as="p"
                                            style={{ fontWeight: '500', wordBreak: 'break-all', fontSize: '0.9rem' }}
                                        />
                                    </div>
                                </div>

                                {about.contact.leetcode && (
                                    <div className="contact-item-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '24px' }}>💻</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>LeetCode</span>
                                            <EditableText
                                                value={about.contact.leetcode}
                                                onSave={(val) => updateContact('leetcode', val)}
                                                as="p"
                                                style={{ fontWeight: '500', wordBreak: 'break-all', fontSize: '0.9rem' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
