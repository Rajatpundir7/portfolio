import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import Tilt from 'react-parallax-tilt';
import { RevealOnScroll } from './AnimatedText';

const Skills = () => {
    const { content } = useContent();
    const { skills } = content;

    const categoryIcons = {
        'Programming Languages': '💻',
        'Machine Learning & AI': '🧠',
        'Frameworks & Libraries': '⚡',
        'Databases': '🗄️',
        'Cloud & DevOps': '☁️',
        'Core CS & Tools': '🔧'
    };

    const categoryColors = {
        'Programming Languages': 'rgba(139, 92, 246, 0.15)',
        'Machine Learning & AI': 'rgba(34, 211, 238, 0.15)',
        'Frameworks & Libraries': 'rgba(236, 72, 153, 0.15)',
        'Databases': 'rgba(16, 185, 129, 0.15)',
        'Cloud & DevOps': 'rgba(249, 115, 22, 0.15)',
        'Core CS & Tools': 'rgba(6, 182, 212, 0.15)'
    };

    return (
        <section id="skills">
            <div className="container">
                <RevealOnScroll>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Skills & Expertise</h2>
                        <p className="section-subtitle">Technologies I've mastered along the way</p>
                    </motion.div>
                </RevealOnScroll>

                <div className="skills-grid-responsive" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    marginTop: '60px'
                }}>
                    {skills.map((skillGroup, index) => (
                        <RevealOnScroll key={skillGroup.category} delay={index * 0.1}>
                            <Tilt
                                tiltMaxAngleX={8}
                                tiltMaxAngleY={8}
                                perspective={1000}
                                scale={1.02}
                                transitionSpeed={2000}
                            >
                                <motion.div
                                    className="glass-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    style={{
                                        padding: '28px',
                                        height: '100%',
                                        background: categoryColors[skillGroup.category] || 'var(--bg-card)'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginBottom: '20px'
                                    }}>
                                        <span style={{ fontSize: '1.8rem' }}>
                                            {categoryIcons[skillGroup.category] || '📦'}
                                        </span>
                                        <h3 style={{
                                            fontSize: '1.05rem',
                                            color: 'var(--text-primary)',
                                            fontWeight: '600'
                                        }}>
                                            {skillGroup.category}
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {skillGroup.items.map((skill, skillIndex) => (
                                            <motion.span
                                                key={skill}
                                                className="skill-tag"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                                                }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Tilt>
                        </RevealOnScroll>
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
                <RevealOnScroll>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-subtitle">Real-world solutions I've built</p>
                    </motion.div>
                </RevealOnScroll>

                <div className="projects-grid-responsive" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '28px',
                    marginTop: '60px'
                }}>
                    {projects.map((project, index) => (
                        <RevealOnScroll key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.1}>
                            <Tilt
                                tiltMaxAngleX={8}
                                tiltMaxAngleY={8}
                                perspective={1000}
                                scale={1.02}
                                transitionSpeed={2000}
                                glareEnable={true}
                                glareMaxOpacity={0.15}
                                glareColor="#8b5cf6"
                            >
                                <motion.div
                                    className="glass-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Project number indicator */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        right: '-20px',
                                        width: '80px',
                                        height: '80px',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0.1,
                                        fontSize: '2.5rem',
                                        fontWeight: '800'
                                    }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '16px',
                                        flexWrap: 'wrap',
                                        gap: '10px'
                                    }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '6px 14px',
                                            background: 'rgba(236, 72, 153, 0.15)',
                                            borderRadius: '15px',
                                            fontSize: '0.85rem',
                                            color: 'var(--accent-pink)',
                                            fontWeight: '500'
                                        }}>
                                            <span>📅</span> {project.period}
                                        </span>
                                        {project.tech && (
                                            <span style={{
                                                padding: '6px 14px',
                                                background: 'rgba(34, 211, 238, 0.15)',
                                                borderRadius: '15px',
                                                fontSize: '0.8rem',
                                                color: 'var(--accent)',
                                                fontWeight: '500'
                                            }}>
                                                {project.tech}
                                            </span>
                                        )}
                                    </div>

                                    <h4 style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '16px',
                                        lineHeight: '1.4',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {project.title}
                                    </h4>

                                    <ul style={{
                                        listStyle: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        flex: 1
                                    }}>
                                        {project.points.map((point, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + (i * 0.1) }}
                                                style={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.95rem',
                                                    paddingLeft: '20px',
                                                    position: 'relative',
                                                    lineHeight: '1.6'
                                                }}
                                            >
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '8px',
                                                    width: '6px',
                                                    height: '6px',
                                                    background: 'var(--primary)',
                                                    borderRadius: '50%',
                                                    boxShadow: '0 0 10px var(--primary)'
                                                }}></span>
                                                {point}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {(project.github || project.live) && (
                                        <div className="project-links" style={{ marginTop: '20px' }}>
                                            {project.github && (
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link secondary"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span>🐙</span> GitHub
                                                </motion.a>
                                            )}
                                            {project.live && (
                                                <motion.a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span>🚀</span> Live Demo
                                                </motion.a>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </Tilt>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Education = () => {
    const { content } = useContent();

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

    const achievements = content.achievements || content.awards || [];
    const certifications = content.certifications || [];

    return (
        <section id="education" style={{ paddingTop: '80px' }}>
            <div className="container">
                {/* Education Timeline */}
                <RevealOnScroll>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '60px' }}
                    >
                        <h3 style={{
                            fontSize: '1.6rem',
                            marginBottom: '28px',
                            color: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <span style={{ fontSize: '2rem' }}>🎓</span> Education
                        </h3>

                        <div className="education-grid-responsive" style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${Math.min(educationData.length, 3)}, 1fr)`,
                            gap: '24px'
                        }}>
                            {educationData.map((edu, index) => (
                                <RevealOnScroll key={index} delay={index * 0.15}>
                                    <Tilt
                                        tiltMaxAngleX={8}
                                        tiltMaxAngleY={8}
                                        perspective={1000}
                                        transitionSpeed={2000}
                                    >
                                        <motion.div
                                            className="glass-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            style={{
                                                background: index === 0
                                                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)'
                                                    : 'var(--bg-card)',
                                                borderColor: index === 0 ? 'rgba(139, 92, 246, 0.3)' : 'var(--border-glass)',
                                                height: '100%'
                                            }}
                                        >
                                            <h4 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                                                {edu.degree}
                                            </h4>
                                            <p style={{
                                                color: 'var(--primary-light)',
                                                marginBottom: '16px',
                                                fontSize: '1rem',
                                                fontWeight: '500'
                                            }}>
                                                {edu.institution}
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.95rem',
                                                flexWrap: 'wrap',
                                                gap: '10px'
                                            }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span>📅</span> {edu.period}
                                                </span>
                                                <span style={{
                                                    padding: '6px 14px',
                                                    background: 'rgba(16, 185, 129, 0.15)',
                                                    borderRadius: '15px',
                                                    color: '#10b981',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {edu.score}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Tilt>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </motion.div>
                </RevealOnScroll>

                <div className="education-achievements-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px'
                }}>
                    {/* Achievements */}
                    <RevealOnScroll direction="left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 style={{
                                fontSize: '1.6rem',
                                marginBottom: '28px',
                                color: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <span style={{ fontSize: '2rem' }}>🏆</span> Achievements
                            </h3>
                            <div className="glass-card">
                                <ul style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px'
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
                                                lineHeight: '1.6',
                                                padding: '12px',
                                                borderRadius: '10px',
                                                background: 'rgba(139, 92, 246, 0.05)',
                                                border: '1px solid rgba(139, 92, 246, 0.1)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            whileHover={{
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                x: 5
                                            }}
                                        >
                                            {achievement}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </RevealOnScroll>

                    {/* Certifications */}
                    <RevealOnScroll direction="right" delay={0.2}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 style={{
                                fontSize: '1.6rem',
                                marginBottom: '28px',
                                color: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <span style={{ fontSize: '2rem' }}>📜</span> Certifications
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
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px',
                                                padding: '16px',
                                                background: 'rgba(139, 92, 246, 0.05)',
                                                borderRadius: '14px',
                                                border: '1px solid rgba(139, 92, 246, 0.1)',
                                                flexWrap: 'wrap',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '28px',
                                                filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))'
                                            }}>🎖️</span>
                                            <div style={{ flex: 1, minWidth: '150px' }}>
                                                <p style={{
                                                    fontWeight: '600',
                                                    marginBottom: '4px',
                                                    color: 'var(--text-primary)',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {cert.name}
                                                </p>
                                                <p style={{
                                                    color: 'var(--text-muted)',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    {cert.issuer}
                                                </p>
                                            </div>
                                            {cert.link && (
                                                <motion.a
                                                    href={cert.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        padding: '8px 16px',
                                                        background: 'var(--gradient-primary)',
                                                        borderRadius: '10px',
                                                        color: 'white',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        textDecoration: 'none',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    View →
                                                </motion.a>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

export { Skills, Projects, Education };
