import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';
import EditableMedia from './EditableMedia';

const PESEBranch = () => {
    const { content, addPeseWeek, updatePeseWeek, deletePeseWeek } = useContent();
    const { isLoggedIn } = useAuth();
    const { peseWeeks } = content;
    const [showAddModal, setShowAddModal] = useState(false);
    const [newWeek, setNewWeek] = useState({ title: '', description: '', video: null });

    const handleAddWeek = () => {
        if (newWeek.title) {
            addPeseWeek(newWeek);
            setNewWeek({ title: '', description: '', video: null });
            setShowAddModal(false);
        }
    };

    return (
        <section id="pese">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">PESE Class Journey</h2>
                    <p className="section-subtitle">
                        Weekly Physical Education & Sports Education sessions
                    </p>
                </motion.div>

                {/* Branch Tree Visualization */}
                <div className="pese-branch-container" style={{ marginTop: '50px', position: 'relative', marginLeft: '60px' }}>
                    {/* Main trunk line */}
                    <div style={{
                        position: 'absolute',
                        left: '-30px',
                        top: 0,
                        bottom: isLoggedIn ? '80px' : 0,
                        width: '4px',
                        background: 'var(--gradient-primary)',
                        borderRadius: '2px'
                    }} />

                    {/* Week nodes */}
                    <AnimatePresence>
                        {peseWeeks.map((week, index) => (
                            <motion.div
                                key={week.id}
                                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{
                                    position: 'relative',
                                    marginBottom: '40px'
                                }}
                            >
                                {/* Branch connector */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-38px',
                                    top: '30px',
                                    width: '38px',
                                    height: '3px',
                                    background: 'var(--gradient-primary)'
                                }} />

                                {/* Node dot */}
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        left: '-50px',
                                        top: '20px',
                                        width: '24px',
                                        height: '24px',
                                        background: 'var(--primary)',
                                        borderRadius: '50%',
                                        border: '4px solid var(--bg-light)',
                                        boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                />

                                {/* Week number badge - hidden on mobile */}
                                <div className="pese-week-vertical" style={{
                                    position: 'absolute',
                                    left: '-80px',
                                    top: '50px',
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(180deg)',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    WEEK {week.week}
                                </div>

                                {/* Content Card */}
                                <div className="glass-card pese-card-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1.2fr',
                                    gap: '24px',
                                    alignItems: 'start'
                                }}>
                                    {/* Video */}
                                    <div>
                                        <EditableMedia
                                            type="video"
                                            value={week.video}
                                            onSave={(val) => updatePeseWeek(week.id, { video: val })}
                                            style={{ aspectRatio: '16/9' }}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '12px',
                                            flexWrap: 'wrap',
                                            gap: '8px'
                                        }}>
                                            <span style={{
                                                padding: '6px 14px',
                                                background: 'rgba(102, 126, 234, 0.2)',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                color: 'var(--primary)',
                                                fontWeight: '600'
                                            }}>
                                                Week {week.week}
                                            </span>

                                            {isLoggedIn && (
                                                <button
                                                    onClick={() => deletePeseWeek(week.id)}
                                                    style={{
                                                        background: 'rgba(239, 68, 68, 0.2)',
                                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                                        borderRadius: '8px',
                                                        padding: '6px 12px',
                                                        color: '#ef4444',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem'
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            )}
                                        </div>

                                        <EditableText
                                            value={week.title}
                                            onSave={(val) => updatePeseWeek(week.id, { title: val })}
                                            as="h3"
                                            style={{
                                                fontSize: '1.3rem',
                                                marginBottom: '12px'
                                            }}
                                        />

                                        <EditableText
                                            value={week.description}
                                            onSave={(val) => updatePeseWeek(week.id, { description: val })}
                                            as="p"
                                            multiline
                                            style={{
                                                color: 'var(--text-secondary)',
                                                lineHeight: '1.7'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Add New Week Button */}
                    {isLoggedIn && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <button
                                className="add-button"
                                onClick={() => setShowAddModal(true)}
                            >
                                <span style={{ fontSize: '24px', marginRight: '12px' }}>➕</span>
                                Add New PESE Week
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Add Week Modal */}
                <AnimatePresence>
                    {showAddModal && (
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                        >
                            <motion.div
                                className="modal-content"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={e => e.stopPropagation()}
                                style={{ maxWidth: '600px' }}
                            >
                                <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>

                                <h2 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.8rem',
                                    marginBottom: '8px',
                                    background: 'var(--gradient-primary)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    Add New PESE Week
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                    Week {peseWeeks.length + 1}
                                </p>

                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newWeek.title}
                                        onChange={(e) => setNewWeek({ ...newWeek, title: e.target.value })}
                                        placeholder="e.g., Introduction to Basketball"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={newWeek.description}
                                        onChange={(e) => setNewWeek({ ...newWeek, description: e.target.value })}
                                        placeholder="What was covered in this session..."
                                        rows={4}
                                    />
                                </div>

                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem',
                                    marginBottom: '16px'
                                }}>
                                    💡 You can add the video after creating the week
                                </p>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAddWeek}
                                        style={{ flex: 1, minWidth: '120px' }}
                                    >
                                        ✓ Add Week
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PESEBranch;
