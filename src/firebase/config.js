// Firebase Configuration
// ========================
// INSTRUCTIONS: 
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Click "Web" icon to add a web app
// 4. Copy your config values below
// 5. Enable Firestore Database (in "Build" menu)
// 6. Enable Storage (in "Build" menu)
// 7. Set Firestore rules to allow read/write (see below)

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ⚠️ REPLACE WITH YOUR FIREBASE CONFIG ⚠️
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app = null;
let db = null;
let storage = null;

if (isFirebaseConfigured) {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        storage = getStorage(app);
        console.log('✅ Firebase connected successfully!');
    } catch (error) {
        console.error('❌ Firebase connection error:', error);
    }
} else {
    console.warn('⚠️ Firebase not configured. Using localStorage fallback.');
    console.warn('📝 To enable permanent storage, update src/firebase/config.js with your Firebase credentials.');
}

// Document ID for portfolio content
const CONTENT_DOC_ID = 'portfolio-content';

// =====================
// DATABASE FUNCTIONS
// =====================

/**
 * Load content from Firebase
 * Returns null if Firebase not configured or error occurs
 */
export const loadContentFromFirebase = async () => {
    if (!db) return null;

    try {
        const docRef = doc(db, 'portfolio', CONTENT_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('📦 Content loaded from Firebase');
            return docSnap.data();
        } else {
            console.log('📭 No content in Firebase yet');
            return null;
        }
    } catch (error) {
        console.error('❌ Error loading from Firebase:', error);
        return null;
    }
};

/**
 * Save content to Firebase
 * Returns true on success, false on failure
 */
export const saveContentToFirebase = async (content) => {
    if (!db) {
        console.warn('⚠️ Firebase not configured, saving to localStorage only');
        return false;
    }

    try {
        const docRef = doc(db, 'portfolio', CONTENT_DOC_ID);
        await setDoc(docRef, {
            ...content,
            lastUpdated: new Date().toISOString()
        });
        console.log('💾 Content saved to Firebase');
        return true;
    } catch (error) {
        console.error('❌ Error saving to Firebase:', error);
        return false;
    }
};

/**
 * Update a specific field in Firebase
 */
export const updateFieldInFirebase = async (fieldPath, value) => {
    if (!db) return false;

    try {
        const docRef = doc(db, 'portfolio', CONTENT_DOC_ID);
        await updateDoc(docRef, {
            [fieldPath]: value,
            lastUpdated: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('❌ Error updating field:', error);
        return false;
    }
};

// =====================
// FILE UPLOAD FUNCTIONS
// =====================

/**
 * Upload a file to Firebase Storage
 * Returns the download URL on success
 */
export const uploadFileToFirebase = async (file, path) => {
    if (!storage) {
        console.warn('⚠️ Firebase Storage not configured');
        return null;
    }

    try {
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `${path}/${timestamp}_${file.name}`;
        const storageRef = ref(storage, filename);

        // Upload the file
        console.log('📤 Uploading file...');
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('✅ File uploaded successfully');

        return downloadURL;
    } catch (error) {
        console.error('❌ Error uploading file:', error);
        return null;
    }
};

/**
 * Upload an image file
 */
export const uploadImage = async (file) => {
    return uploadFileToFirebase(file, 'images');
};

/**
 * Upload a video file
 */
export const uploadVideo = async (file) => {
    return uploadFileToFirebase(file, 'videos');
};

// =====================
// UTILITY FUNCTIONS
// =====================

export const isFirebaseReady = () => isFirebaseConfigured && db !== null;

export { db, storage };
