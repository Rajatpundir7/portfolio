import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';

const Assignments = () => {
    const { content, updateAssignment } = useContent();
    const { isLoggedIn } = useAuth();
    const { assignments } = content;

    return (
        <section id="assignments">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Assignments</h2>
                    <p className="section-subtitle">
                        My 5 main course assignments
                    </p>
                </motion.div>

                <div className="grid-3" style={{ marginTop: '50px' }}>
                    {assignments.map((assignment, index) => (
                        <motion.div
                            key={assignment.id}
                            className="glass-card"
                            initial={{ opacity: 0, y: 30, rotateY: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Assignment Number Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '20px',
                                width: '50px',
                                height: '50px',
                                background: 'var(--gradient-primary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                boxShadow: 'var(--shadow-md)',
                                zIndex: 1
                            }}>
                                {assignment.id}
                            </div>

                            {/* Assignment Image */}
                            <div style={{ marginBottom: '16px', marginTop: '20px' }}>
                                <EditableMedia
                                    type="image"
                                    value={assignment.image}
                                    onSave={(val) => updateAssignment(assignment.id, { image: val })}
                                    style={{
                                        height: '160px',
                                        borderRadius: '12px'
                                    }}
                                />
                            </div>

                            {/* Assignment Title */}
                            <EditableText
                                value={assignment.title}
                                onSave={(val) => updateAssignment(assignment.id, { title: val })}
                                as="h3"
                                style={{
                                    fontSize: '1.2rem',
                                    marginBottom: '12px'
                                }}
                            />

                            {/* Assignment Description */}
                            <EditableText
                                value={assignment.description}
                                onSave={(val) => updateAssignment(assignment.id, { description: val })}
                                as="p"
                                multiline
                                style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    flex: 1
                                }}
                            />

                            {/* Link */}
                            {assignment.link && (
                                <a
                                    href={assignment.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ marginTop: '16px', justifyContent: 'center' }}
                                >
                                    View Assignment →
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Assignments;
