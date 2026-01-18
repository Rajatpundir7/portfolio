// JSONBin.io Configuration
// =========================
// FREE, no credit card needed!
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://jsonbin.io/
// 2. Click "Sign Up" (it's FREE)
// 3. Go to API Keys section
// 4. Copy your "X-Master-Key" 
// 5. Paste it below
//
// For images/videos: Use Google Drive, Imgur, or any image hosting
// and paste the share links directly when editing

// ⚠️ REPLACE WITH YOUR JSONBIN API KEY ⚠️
const JSONBIN_API_KEY = "$2a$10$8pUUY/53mopf23lp9tpvxemiZjUcaiZkEa1fqd7OrPCoNZkR18WGy";

// This will be auto-created on first save
let JSONBIN_BIN_ID = localStorage.getItem('portfolio_bin_id') || null;

// Check if configured
const isJsonBinConfigured = JSONBIN_API_KEY !== "YOUR_JSONBIN_API_KEY";

// =====================
// DATABASE FUNCTIONS
// =====================

/**
 * Load content from JSONBin
 */
export const loadContentFromCloud = async () => {
    if (!isJsonBinConfigured) {
        console.warn('⚠️ JSONBin not configured. Using localStorage.');
        return null;
    }

    // If we don't have a bin ID yet, nothing to load
    if (!JSONBIN_BIN_ID) {
        console.log('📭 No cloud data yet. Will create on first save.');
        return null;
    }

    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('📦 Content loaded from JSONBin');
        return data.record;
    } catch (error) {
        console.error('❌ Error loading from JSONBin:', error);
        return null;
    }
};

/**
 * Save content to JSONBin
 */
export const saveContentToCloud = async (content) => {
    if (!isJsonBinConfigured) {
        console.warn('⚠️ JSONBin not configured, saving to localStorage only');
        return false;
    }

    try {
        const contentWithTimestamp = {
            ...content,
            lastUpdated: new Date().toISOString()
        };

        if (JSONBIN_BIN_ID) {
            // Update existing bin
            const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_API_KEY
                },
                body: JSON.stringify(contentWithTimestamp)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('💾 Content updated in JSONBin');
            return true;
        } else {
            // Create new bin
            const response = await fetch('https://api.jsonbin.io/v3/b', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_API_KEY,
                    'X-Bin-Name': 'portfolio-content',
                    'X-Bin-Private': 'false' // Make it public so visitors can read
                },
                body: JSON.stringify(contentWithTimestamp)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            JSONBIN_BIN_ID = data.metadata.id;

            // Save bin ID for future use
            localStorage.setItem('portfolio_bin_id', JSONBIN_BIN_ID);

            console.log('🆕 New JSONBin created:', JSONBIN_BIN_ID);
            console.log('💾 Content saved to JSONBin');
            return true;
        }
    } catch (error) {
        console.error('❌ Error saving to JSONBin:', error);
        return false;
    }
};

// =====================
// FILE UPLOAD HELPERS
// =====================

/**
 * For images/videos, users should:
 * 1. Upload to Google Drive
 * 2. Get shareable link
 * 3. Convert to direct link
 * 
 * This function converts Google Drive share links to direct links
 */
export const convertGoogleDriveLink = (shareLink) => {
    // Extract file ID from Google Drive share link
    // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return shareLink;
};

/**
 * Convert Imgur share link to direct image link
 */
export const convertImgurLink = (shareLink) => {
    // Format: https://imgur.com/a/ABCDEF or https://imgur.com/ABCDEF
    if (shareLink.includes('imgur.com')) {
        const match = shareLink.match(/imgur\.com\/(?:a\/)?([a-zA-Z0-9]+)/);
        if (match) {
            return `https://i.imgur.com/${match[1]}.jpg`;
        }
    }
    return shareLink;
};

// =====================
// UTILITY FUNCTIONS
// =====================

export const isCloudReady = () => isJsonBinConfigured;

export const getBinId = () => JSONBIN_BIN_ID;
