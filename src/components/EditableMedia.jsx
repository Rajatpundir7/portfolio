import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

const EditableMedia = ({
    type = 'image', // 'image' or 'video'
    value,
    onSave,
    placeholder = null,
    style = {}
}) => {
    const { isLoggedIn } = useAuth();
    const { uploadImageFile, uploadVideoFile, isFirebaseConnected } = useContent();
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit: 50MB for Firebase, 5MB for localStorage)
            const maxSize = isFirebaseConnected ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert(`File size must be less than ${isFirebaseConnected ? '50MB' : '5MB'}.`);
                return;
            }

            setSelectedFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (!preview && !selectedFile) return;

        setIsUploading(true);
        try {
            let finalUrl;

            if (selectedFile && isFirebaseConnected) {
                // Upload to Firebase
                setUploadProgress('Uploading to cloud...');
                const uploadFn = type === 'image' ? uploadImageFile : uploadVideoFile;
                finalUrl = await uploadFn(selectedFile);

                if (!finalUrl) {
                    throw new Error('Upload failed');
                }
                setUploadProgress('Upload complete!');
            } else {
                // Use base64 for localStorage (fallback)
                finalUrl = preview;
            }

            onSave(finalUrl);
            setIsEditing(false);
            setPreview(null);
            setSelectedFile(null);
            setUploadProgress('');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload. Please try again.');
            setUploadProgress('');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPreview(null);
        setSelectedFile(null);
        setUploadProgress('');
    };

    const handleRemove = () => {
        onSave(null);
        setIsEditing(false);
        setPreview(null);
        setSelectedFile(null);
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

                {/* Firebase status indicator */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: isFirebaseConnected
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(249, 115, 22, 0.1)',
                    border: `1px solid ${isFirebaseConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`
                }}>
                    <span style={{ fontSize: '14px' }}>
                        {isFirebaseConnected ? '☁️' : '💾'}
                    </span>
                    <span style={{
                        fontSize: '0.85rem',
                        color: isFirebaseConnected ? '#10b981' : '#f97316'
                    }}>
                        {isFirebaseConnected
                            ? 'Cloud storage enabled - visible to everyone'
                            : 'Local storage only - only visible to you'}
                    </span>
                </div>

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
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Max {isFirebaseConnected ? '50MB' : '5MB'}
                        </p>
                    </div>
                )}

                {displayValue && (
                    <button
                        className="btn btn-secondary"
                        onClick={() => fileInputRef.current?.click()}
                        style={{ width: '100%', marginBottom: '12px' }}
                    >
                        📁 Choose Different File
                    </button>
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

                {/* Upload progress */}
                {uploadProgress && (
                    <div style={{
                        padding: '12px',
                        marginBottom: '12px',
                        borderRadius: '8px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        textAlign: 'center',
                        color: 'var(--primary)'
                    }}>
                        ⏳ {uploadProgress}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={!preview || isUploading}
                        style={{ flex: 1 }}
                    >
                        {isUploading ? '⏳ Uploading...' : '✓ Save'}
                    </button>
                    {value && (
                        <button
                            className="btn btn-secondary"
                            onClick={handleRemove}
                            style={{ background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' }}
                            disabled={isUploading}
                        >
                            🗑️
                        </button>
                    )}
                    <button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={isUploading}
                    >
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
