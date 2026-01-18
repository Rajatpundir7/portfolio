import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';
import { TypewriterText, GradientText, FloatingElement } from './AnimatedText';
import Tilt from 'react-parallax-tilt';

const Hero = () => {
    const { content, updateNestedContent } = useContent();
    const { isLoggedIn } = useAuth();
    const { hero } = content;

    const roles = [
        'AI & Machine Learning Engineer',
        'Deep Learning Specialist',
        'Computer Vision Expert',
        'Full-Stack Developer',
        'Problem Solver'
    ];

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '120px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container">
                <div className="hero-grid-mobile" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'center'
                }}>
                    {/* Left Content */}
                    <motion.div
                        className="hero-content-mobile"
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Welcome Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px 24px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: '30px',
                                marginBottom: '32px'
                            }}
                        >
                            <span style={{
                                width: '8px',
                                height: '8px',
                                background: '#10b981',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px #10b981'
                            }}></span>
                            <span style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}>
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Name with Gradient */}
                        {isLoggedIn ? (
                            <EditableText
                                value={hero.name}
                                onSave={(val) => updateNestedContent('hero', 'name', val)}
                                as="h1"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '4.5rem',
                                    fontWeight: '800',
                                    lineHeight: '1.1',
                                    marginBottom: '16px',
                                    background: 'var(--gradient-cyber)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundSize: '200% 200%',
                                    animation: 'gradientShift 5s ease infinite'
                                }}
                            />
                        ) : (
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="gradient-text gradient-animate"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '4.5rem',
                                    fontWeight: '800',
                                    lineHeight: '1.1',
                                    marginBottom: '16px'
                                }}
                            >
                                {hero.name}
                            </motion.h1>
                        )}

                        {/* Typewriter Role */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{
                                fontSize: '1.8rem',
                                fontWeight: '600',
                                marginBottom: '24px',
                                minHeight: '50px'
                            }}
                        >
                            <span style={{ color: 'var(--text-muted)' }}>I'm a </span>
                            <TypewriterText
                                strings={roles}
                                style={{
                                    color: 'var(--accent)',
                                    textShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
                                }}
                            />
                        </motion.div>

                        {/* Subtitle */}
                        {isLoggedIn ? (
                            <EditableText
                                value={hero.subtitle}
                                onSave={(val) => updateNestedContent('hero', 'subtitle', val)}
                                as="p"
                                multiline
                                style={{
                                    fontSize: '1.15rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '40px',
                                    maxWidth: '520px',
                                    lineHeight: '1.8'
                                }}
                            />
                        ) : (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                style={{
                                    fontSize: '1.15rem',
                                    color: 'var(--text-secondary)',
                                    marginBottom: '40px',
                                    maxWidth: '520px',
                                    lineHeight: '1.8'
                                }}
                            >
                                {hero.subtitle}
                            </motion.p>
                        )}

                        {/* CTA Buttons */}
                        <motion.div
                            className="hero-buttons-mobile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
                        >
                            <a href="#projects" className="btn btn-primary">
                                <span>🚀</span> View Projects
                            </a>
                            <a href="#contact" className="btn btn-secondary">
                                <span>💬</span> Let's Talk
                            </a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="hero-social-mobile"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            style={{
                                display: 'flex',
                                gap: '16px',
                                marginTop: '48px'
                            }}
                        >
                            {[
                                { url: content.about.contact.github, icon: 'github', label: 'GitHub' },
                                { url: content.about.contact.linkedin, icon: 'linkedin', label: 'LinkedIn' },
                                { url: `mailto:${content.about.contact.email}`, icon: 'email', label: 'Email' }
                            ].map((social, index) => (
                                <motion.a
                                    key={social.icon}
                                    href={social.url}
                                    target={social.icon !== 'email' ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="btn btn-icon btn-secondary"
                                    title={social.label}
                                    whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {social.icon === 'github' && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    )}
                                    {social.icon === 'linkedin' && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    )}
                                    {social.icon === 'email' && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                                        </svg>
                                    )}
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            style={{
                                display: 'flex',
                                gap: '40px',
                                marginTop: '48px',
                                flexWrap: 'wrap'
                            }}
                        >
                            {[
                                { value: '250+', label: 'LeetCode Problems' },
                                { value: '10+', label: 'Projects Built' },
                                { value: '8.5', label: 'CGPA' }
                            ].map((stat, index) => (
                                <div key={index} style={{ textAlign: 'left' }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        fontFamily: 'var(--font-display)',
                                        background: 'var(--gradient-primary)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '0.9rem'
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - Intro Video with 3D Tilt */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <FloatingElement duration={5}>
                            <Tilt
                                tiltMaxAngleX={10}
                                tiltMaxAngleY={10}
                                perspective={1000}
                                scale={1.02}
                                transitionSpeed={2000}
                                glareEnable={true}
                                glareMaxOpacity={0.2}
                                glareColor="#8b5cf6"
                                glarePosition="all"
                            >
                                <div className="glass-card" style={{
                                    padding: '20px',
                                    background: 'rgba(15, 15, 25, 0.9)',
                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginBottom: '16px'
                                    }}>
                                        <span style={{ fontSize: '1.5rem' }}>📹</span>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.1rem',
                                                color: 'var(--text-primary)',
                                                fontWeight: '600'
                                            }}>
                                                Self Introduction
                                            </h3>
                                            <p style={{
                                                fontSize: '0.85rem',
                                                color: 'var(--text-muted)'
                                            }}>
                                                Watch my video intro
                                            </p>
                                        </div>
                                    </div>
                                    <EditableMedia
                                        type="video"
                                        value={hero.introVideo}
                                        onSave={(val) => updateNestedContent('hero', 'introVideo', val)}
                                        style={{
                                            aspectRatio: '16/9',
                                            borderRadius: '12px',
                                            overflow: 'hidden'
                                        }}
                                    />
                                </div>
                            </Tilt>
                        </FloatingElement>
                    </motion.div>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 8s ease-in-out infinite',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '0%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 10s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '30%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                animation: 'float 12s ease-in-out infinite',
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default Hero;
