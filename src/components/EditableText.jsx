import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const EditableText = ({
    value,
    onSave,
    as: Component = 'p',
    multiline = false,
    placeholder = 'Click to edit...',
    style = {},
    className = ''
}) => {
    const { isLoggedIn } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const inputRef = useRef(null);

    const handleClick = () => {
        if (isLoggedIn) {
            setIsEditing(true);
            setTempValue(value);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };

    const handleSave = () => {
        onSave(tempValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !multiline) {
            handleSave();
        }
        if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div style={{ position: 'relative' }}>
                {multiline ? (
                    <textarea
                        ref={inputRef}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{
                            ...style,
                            minHeight: '100px',
                            resize: 'vertical'
                        }}
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={style}
                        placeholder={placeholder}
                    />
                )}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button className="btn btn-primary" onClick={handleSave} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                        ✓ Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                        ✕ Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Component
            className={`${className} ${isLoggedIn ? 'editable' : ''}`}
            style={style}
            onClick={handleClick}
        >
            {value || placeholder}
        </Component>
    );
};

export default EditableText;
