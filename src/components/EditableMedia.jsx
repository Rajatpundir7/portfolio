import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const EditableMedia = ({
    type = 'image', // 'image' or 'video'
    value,
    onSave,
    placeholder = null,
    style = {}
}) => {
    const { isLoggedIn } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 5MB for localStorage)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB for storage. Consider using a URL instead.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (preview) {
            onSave(preview);
        }
        setIsEditing(false);
        setPreview(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPreview(null);
    };

    const handleRemove = () => {
        onSave(null);
        setIsEditing(false);
        setPreview(null);
    };

    const displayValue = preview || value;

    if (isEditing) {
        return (
            <div className="glass-card" style={{ padding: '24px', ...style }}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    style={{ display: 'none' }}
                />

                {displayValue ? (
                    <div style={{ marginBottom: '16px' }}>
                        {type === 'image' ? (
                            <img
                                src={displayValue}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    borderRadius: '12px',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : (
                            <video
                                src={displayValue}
                                controls
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    borderRadius: '12px'
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div
                        className="file-upload"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ marginBottom: '16px' }}
                    >
                        <span className="file-upload-icon">{type === 'image' ? '🖼️' : '🎬'}</span>
                        <p>Click to upload {type}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max 5MB</p>
                    </div>
                )}

                {!displayValue && (
                    <button
                        className="btn btn-secondary"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ width: '100%', marginBottom: '12px' }}
                    >
                        📁 Choose File
                    </button>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary" onClick={handleSave} disabled={!preview} style={{ flex: 1 }}>
                        ✓ Save
                    </button>
                    {value && (
                        <button className="btn btn-secondary" onClick={handleRemove} style={{ background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' }}>
                            🗑️
                        </button>
                    )}
                    <button className="btn btn-secondary" onClick={handleCancel}>
                        ✕
                    </button>
                </div>
            </div>
        );
    }

    // Display mode
    if (displayValue) {
        return (
            <div
                style={{ position: 'relative', ...style }}
                className={isLoggedIn ? 'editable' : ''}
                onClick={() => isLoggedIn && setIsEditing(true)}
            >
                {type === 'image' ? (
                    <img
                        src={displayValue}
                        alt="Media"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '16px'
                        }}
                    />
                ) : (
                    <div className="video-container">
                        <video
                            src={displayValue}
                            controls
                            style={{ width: '100%', borderRadius: '16px' }}
                        />
                    </div>
                )}
            </div>
        );
    }

    // Placeholder when no media
    return (
        <div
            className={isLoggedIn ? 'editable' : ''}
            onClick={() => isLoggedIn && setIsEditing(true)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                background: 'var(--bg-glass)',
                borderRadius: '16px',
                border: '2px dashed var(--border-glass)',
                cursor: isLoggedIn ? 'pointer' : 'default',
                ...style
            }}
        >
            {isLoggedIn ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '48px' }}>{type === 'image' ? '🖼️' : '🎬'}</span>
                    <p>Click to add {type}</p>
                </div>
            ) : (
                placeholder || (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '48px' }}>{type === 'image' ? '🖼️' : '🎬'}</span>
                        <p>No {type} uploaded</p>
                    </div>
                )
            )}
        </div>
    );
};

export default EditableMedia;
