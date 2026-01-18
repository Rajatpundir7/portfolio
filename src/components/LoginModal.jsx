import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = () => {
    const { showLoginModal, closeLogin, login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!login(username, password)) {
            setError('Invalid username or password');
        } else {
            setUsername('');
            setPassword('');
        }
    };

    return (
        <AnimatePresence>
            {showLoginModal && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeLogin}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={closeLogin}>×</button>

                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.8rem',
                            marginBottom: '8px',
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Admin Login
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            Enter your credentials to edit the portfolio
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>

                            {error && (
                                <p style={{
                                    color: '#ef4444',
                                    marginBottom: '16px',
                                    fontSize: '0.9rem'
                                }}>
                                    {error}
                                </p>
                            )}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                🔓 Login
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
