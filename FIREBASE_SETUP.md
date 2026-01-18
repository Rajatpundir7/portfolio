# 🔥 Firebase Setup Guide

Follow these steps to enable **permanent cloud storage** for your portfolio so all visitors can see your updated content.

---

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `my-portfolio` (or any name you like)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

---

## Step 2: Add a Web App

1. In your Firebase project, click the **Web icon** (</>) 
2. Register your app with a nickname like `portfolio-web`
3. **Copy the config values** - you'll need these!

Example config:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "my-portfolio.firebaseapp.com",
  projectId: "my-portfolio",
  storageBucket: "my-portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 3: Enable Firestore Database

1. In the Firebase Console sidebar, go to **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location close to you
5. Click **"Enable"**

### Set Database Rules (Important!)

Go to **Firestore Database → Rules** and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to everyone
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if true; // For development
    }
  }
}
```

> ⚠️ **Note:** For production, you should add authentication to restrict writes!

---

## Step 4: Enable Firebase Storage

1. In the Firebase Console sidebar, go to **Build → Storage**
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Next"** and then **"Done"**

### Set Storage Rules

Go to **Storage → Rules** and set:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if true; // For development
    }
  }
}
```

---

## Step 5: Update Your Config File

Open `src/firebase/config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Step 6: Test It!

1. Start your development server: `npm run dev`
2. Open your portfolio
3. Log in as admin (username: `rajat pundir`, password: `8445`)
4. Look for **"☁️ Cloud Connected"** badge at the bottom right
5. Edit some text and you should see **"Saving to cloud..."**
6. Open the portfolio in another browser - your changes should appear!

---

## Step 7: Deploy to Vercel

After setting up Firebase:

```bash
git add -A
git commit -m "Add Firebase integration"
git push origin master
```

Your Vercel deployment will automatically update.

---

## 🔒 Security (Production)

For a production site, update your Firebase rules to require authentication:

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## ❓ Troubleshooting

### "Firebase not configured" message
- Make sure you've replaced the placeholder values in `src/firebase/config.js`
- Check that your project ID matches exactly

### Uploads failing
- Check if Storage is enabled in Firebase Console
- Verify storage rules allow writes
- Check browser console for specific error messages

### Changes not saving
- Check if Firestore is enabled
- Verify database rules allow writes
- Look for errors in browser console

---

## 📊 Firebase Free Tier Limits

Firebase Spark (Free) plan includes:
- **Firestore:** 1GB storage, 50K reads/day, 20K writes/day
- **Storage:** 5GB storage, 1GB/day downloads

This is more than enough for a portfolio website!

---

Happy building! 🚀
