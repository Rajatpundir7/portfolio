import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Skills = () => {
    const { content } = useContent();
    const { skills } = content;

    return (
        <section id="skills">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Skills & Expertise</h2>
                    <p className="section-subtitle">Technologies I work with</p>
                </motion.div>

                {/* Skills Grid */}
                <div className="skills-grid-responsive" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginTop: '50px'
                }}>
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{ padding: '24px' }}
                        >
                            <h3 style={{
                                marginBottom: '14px',
                                fontSize: '1rem',
                                color: 'var(--primary)'
                            }}>
                                {skillGroup.category}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {skillGroup.items.map((skill) => (
                                    <span key={skill} className="skill-tag" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Projects = () => {
    const { content } = useContent();
    const { projects } = content;

    return (
        <section id="projects">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">My recent work and achievements</p>
                </motion.div>

                <div className="projects-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '50px' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                                <span className="project-period-badge" style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: 'rgba(236, 72, 153, 0.1)',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem',
                                    color: 'var(--accent)'
                                }}>
                                    {project.period}
                                </span>
                                {project.tech && (
                                    <span className="project-tech-badge" style={{
                                        padding: '4px 12px',
                                        background: 'rgba(6, 182, 212, 0.1)',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        color: 'var(--accent-secondary)'
                                    }}>
                                        {project.tech}
                                    </span>
                                )}
                            </div>
                            <h4 style={{
                                fontSize: '1.1rem',
                                marginBottom: '12px',
                                lineHeight: '1.4'
                            }}>
                                {project.title}
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                flex: 1
                            }}>
                                {project.points.map((point, i) => (
                                    <li key={i} style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.9rem',
                                        paddingLeft: '16px',
                                        position: 'relative'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            color: 'var(--primary)'
                                        }}>•</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            {/* Project Links */}
                            {(project.github || project.live) && (
                                <div className="project-links" style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link secondary"
                                        >
                                            <span>🐙</span> GitHub
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <span>🚀</span> Live Demo
                                        </a>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Education = () => {
    const { content } = useContent();

    // Handle both old (object) and new (array) education formats
    const educationData = Array.isArray(content.education)
        ? content.education
        : content.education
            ? [{
                degree: content.education.degree,
                institution: content.education.institution,
                period: content.education.period,
                score: content.education.cgpa || content.education.score
            }]
            : [];

    // Provide defaults for achievements and certifications if missing
    const achievements = content.achievements || content.awards || [];
    const certifications = content.certifications || [];

    return (
        <section id="education" style={{ paddingTop: '60px' }}>
            <div className="container">
                {/* Education Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '60px' }}
                >
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '24px',
                        color: 'var(--accent)'
                    }}>
                        🎓 Education
                    </h3>

                    <div className="education-grid-responsive" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(educationData.length, 3)}, 1fr)`, gap: '20px' }}>
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="glass-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{
                                    background: index === 0
                                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)'
                                        : 'var(--bg-glass)',
                                    borderColor: index === 0 ? 'rgba(99, 102, 241, 0.2)' : 'var(--border-glass)'
                                }}
                            >
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                                    {edu.degree}
                                </h4>
                                <p style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '0.95rem' }}>
                                    {edu.institution}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    flexWrap: 'wrap',
                                    gap: '8px'
                                }}>
                                    <span>📅 {edu.period}</span>
                                    <span style={{
                                        padding: '4px 12px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        borderRadius: '12px',
                                        color: '#10b981',
                                        fontSize: '0.85rem'
                                    }}>
                                        {edu.score}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="education-achievements-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px'
                }}>
                    {/* Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '24px',
                            color: 'var(--accent)'
                        }}>
                            🏆 Achievements
                        </h3>
                        <div className="glass-card">
                            <ul style={{
                                listStyle: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px'
                            }}>
                                {achievements.map((achievement, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.5'
                                        }}
                                    >
                                        {achievement}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '24px',
                            color: 'var(--accent)'
                        }}>
                            📜 Certifications
                        </h3>
                        <div className="glass-card">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}>
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 16px',
                                            background: 'rgba(99, 102, 241, 0.05)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(99, 102, 241, 0.1)',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <span style={{ fontSize: '24px' }}>🎖️</span>
                                        <div style={{ flex: 1, minWidth: '150px' }}>
                                            <p style={{ fontWeight: '500', marginBottom: '2px', fontSize: '0.95rem' }}>{cert.name}</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{cert.issuer}</p>
                                        </div>
                                        {cert.link && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    padding: '6px 12px',
                                                    background: 'var(--gradient-primary)',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '500',
                                                    textDecoration: 'none',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                View
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export { Skills, Projects, Education };
