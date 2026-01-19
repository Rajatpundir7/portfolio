import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { convertGoogleDriveLinkForVideo, isGoogleDriveLink } from '../storage/jsonbin';

const EditableMedia = ({
    type = 'image', // 'image' or 'video'
    value,
    onSave,
    placeholder = null,
    style = {}
}) => {
    const { isLoggedIn } = useAuth();
    const { processMediaUrl, isCloudConnected } = useContent();
    const [isEditing, setIsEditing] = useState(false);
    const [inputMode, setInputMode] = useState('url'); // 'url' or 'file'
    const [urlInput, setUrlInput] = useState('');
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 25 * 1024 * 1024) {
                alert('File size must be less than 25MB. For larger files, upload to a video hosting service and paste the link.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlPreview = () => {
        if (urlInput.trim()) {
            const processedUrl = processMediaUrl(urlInput.trim());
            setPreview(processedUrl);
        }
    };

    const handleSave = () => {
        if (preview) {
            onSave(preview);
        } else if (urlInput.trim()) {
            const processedUrl = processMediaUrl(urlInput.trim());
            onSave(processedUrl);
        }
        setIsEditing(false);
        setPreview(null);
        setUrlInput('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPreview(null);
        setUrlInput('');
    };

    const handleRemove = () => {
        onSave(null);
        setIsEditing(false);
        setPreview(null);
        setUrlInput('');
    };

    const displayValue = preview || value;

    if (isEditing) {
        return (
            <div className="glass-card" style={{ padding: '24px', ...style }}>
                {/* Mode Toggle */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px'
                }}>
                    <button
                        onClick={() => setInputMode('url')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            borderRadius: '8px',
                            background: inputMode === 'url'
                                ? 'var(--gradient-primary)'
                                : 'rgba(139, 92, 246, 0.1)',
                            color: inputMode === 'url' ? 'white' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                    >
                        🔗 URL / Link
                    </button>
                    <button
                        onClick={() => setInputMode('file')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            borderRadius: '8px',
                            background: inputMode === 'file'
                                ? 'var(--gradient-primary)'
                                : 'rgba(139, 92, 246, 0.1)',
                            color: inputMode === 'file' ? 'white' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                    >
                        📁 Upload File
                    </button>
                </div>

                {/* URL Input Mode */}
                {inputMode === 'url' && (
                    <div style={{ marginBottom: '16px' }}>
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder={type === 'image'
                                ? "Paste image URL or Google Drive link..."
                                : "Paste video URL or Google Drive link..."}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '1px solid var(--border-glass)',
                                background: 'rgba(15, 15, 25, 0.8)',
                                color: 'var(--text-primary)',
                                fontSize: '0.95rem',
                                marginBottom: '8px'
                            }}
                        />
                        <button
                            onClick={handleUrlPreview}
                            disabled={!urlInput.trim()}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '8px',
                                background: urlInput.trim() ? 'rgba(34, 211, 238, 0.2)' : 'rgba(100, 100, 100, 0.2)',
                                color: urlInput.trim() ? 'var(--accent)' : 'var(--text-muted)',
                                cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                                fontWeight: '500'
                            }}
                        >
                            👁️ Preview
                        </button>

                        {/* Google Drive Instructions */}
                        <div style={{
                            marginTop: '12px',
                            padding: '12px',
                            borderRadius: '8px',
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <strong style={{ color: 'var(--primary)' }}>💡 Tip:</strong>
                            <ol style={{ margin: '8px 0 0 16px', padding: 0 }}>
                                <li>Upload {type} to Google Drive</li>
                                <li>Right-click → "Share" → "Anyone with link"</li>
                                <li>Copy link & paste here</li>
                            </ol>
                        </div>
                    </div>
                )}

                {/* File Upload Mode */}
                {inputMode === 'file' && (
                    <div style={{ marginBottom: '16px' }}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept={type === 'image' ? 'image/*' : 'video/*'}
                            style={{ display: 'none' }}
                        />
                        <div
                            className="file-upload"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <span style={{ fontSize: '2rem' }}>{type === 'image' ? '🖼️' : '🎬'}</span>
                            <p>Click to upload {type}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Max 25MB (for larger files, use URL mode)
                            </p>
                        </div>
                    </div>
                )}

                {/* Preview */}
                {displayValue && (
                    <div style={{ marginBottom: '16px' }}>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            marginBottom: '8px'
                        }}>
                            Preview:
                        </p>
                        {type === 'image' ? (
                            <img
                                src={displayValue}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '250px',
                                    borderRadius: '12px',
                                    objectFit: 'contain'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    alert('Unable to load image. Please check the URL.');
                                }}
                            />
                        ) : (
                            isGoogleDriveLink(displayValue) ? (
                                <iframe
                                    src={convertGoogleDriveLinkForVideo(displayValue)}
                                    style={{
                                        maxWidth: '100%',
                                        width: '100%',
                                        aspectRatio: '16/9',
                                        maxHeight: '250px',
                                        borderRadius: '12px',
                                        border: 'none'
                                    }}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="Video Preview"
                                />
                            ) : (
                                <video
                                    src={displayValue}
                                    controls
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '250px',
                                        borderRadius: '12px'
                                    }}
                                />
                            )
                        )}
                    </div>
                )}

                {/* Cloud Status */}
                <div style={{
                    marginBottom: '16px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: isCloudConnected
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(249, 115, 22, 0.1)',
                    border: `1px solid ${isCloudConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                    fontSize: '0.85rem',
                    color: isCloudConnected ? '#10b981' : '#f97316',
                    textAlign: 'center'
                }}>
                    {isCloudConnected
                        ? '☁️ Cloud storage enabled - URL will be saved permanently'
                        : '💾 Local storage only - ask admin to configure cloud'}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={!preview && !urlInput.trim()}
                        style={{ flex: 1 }}
                    >
                        ✓ Save
                    </button>
                    {value && (
                        <button
                            className="btn btn-secondary"
                            onClick={handleRemove}
                            style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                borderColor: '#ef4444',
                                color: '#ef4444'
                            }}
                        >
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
                        {isGoogleDriveLink(displayValue) ? (
                            <iframe
                                src={convertGoogleDriveLinkForVideo(displayValue)}
                                style={{
                                    width: '100%',
                                    aspectRatio: '16/9',
                                    borderRadius: '16px',
                                    border: 'none'
                                }}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Video"
                            />
                        ) : (
                            <video
                                src={displayValue}
                                controls
                                style={{ width: '100%', borderRadius: '16px' }}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Placeholder
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
