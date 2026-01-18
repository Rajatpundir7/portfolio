import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';

const WeeklyLearning = () => {
    const { content, addWeeklyLearning, updateWeeklyLearning, deleteWeeklyLearning } = useContent();
    const { isLoggedIn } = useAuth();
    const { weeklyLearning } = content;
    const [showAddModal, setShowAddModal] = useState(false);
    const [newLearning, setNewLearning] = useState({ title: '', content: '' });

    const handleAdd = () => {
        if (newLearning.title && newLearning.content) {
            addWeeklyLearning(newLearning);
            setNewLearning({ title: '', content: '' });
            setShowAddModal(false);
        }
    };

    return (
        <section id="learning">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Weekly Learning</h2>
                    <p className="section-subtitle">
                        Documenting my learning journey week by week
                    </p>
                </motion.div>

                {/* Timeline */}
                <div style={{ marginTop: '50px' }}>
                    <AnimatePresence>
                        {weeklyLearning.map((learning, index) => (
                            <motion.div
                                key={learning.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                style={{
                                    display: 'flex',
                                    marginBottom: '24px',
                                    justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'
                                }}
                            >
                                <div
                                    className="glass-card weekly-card-mobile"
                                    style={{
                                        maxWidth: '600px',
                                        width: '100%',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Week badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: index % 2 === 0 ? '20px' : 'auto',
                                        right: index % 2 === 0 ? 'auto' : '20px',
                                        padding: '6px 16px',
                                        background: 'var(--gradient-accent)',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        boxShadow: 'var(--shadow-md)',
                                        color: 'white'
                                    }}>
                                        Week {learning.week}
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginTop: '16px',
                                        marginBottom: '12px',
                                        flexWrap: 'wrap',
                                        gap: '8px'
                                    }}>
                                        <EditableText
                                            value={learning.title}
                                            onSave={(val) => updateWeeklyLearning(learning.id, { title: val })}
                                            as="h3"
                                            style={{ fontSize: '1.2rem', flex: 1, minWidth: '150px' }}
                                        />

                                        {isLoggedIn && (
                                            <button
                                                onClick={() => deleteWeeklyLearning(learning.id)}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.2)',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                                    borderRadius: '8px',
                                                    padding: '4px 10px',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>

                                    <EditableText
                                        value={learning.content}
                                        onSave={(val) => updateWeeklyLearning(learning.id, { content: val })}
                                        as="p"
                                        multiline
                                        style={{
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.7'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Add Button */}
                    {isLoggedIn && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <button
                                className="add-button"
                                onClick={() => setShowAddModal(true)}
                                style={{ maxWidth: '400px', margin: '0 auto' }}
                            >
                                <span style={{ fontSize: '24px', marginRight: '12px' }}>📚</span>
                                Add Weekly Learning
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Add Modal */}
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
                                    Add Weekly Learning
                                </h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                    Week {weeklyLearning.length + 1}
                                </p>

                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newLearning.title}
                                        onChange={(e) => setNewLearning({ ...newLearning, title: e.target.value })}
                                        placeholder="e.g., Deep Learning Fundamentals"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>What did you learn?</label>
                                    <textarea
                                        value={newLearning.content}
                                        onChange={(e) => setNewLearning({ ...newLearning, content: e.target.value })}
                                        placeholder="Describe what you learned this week..."
                                        rows={5}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAdd}
                                        style={{ flex: 1, minWidth: '100px' }}
                                    >
                                        ✓ Add
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

export default WeeklyLearning;
