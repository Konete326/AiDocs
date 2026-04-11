const admin = require('firebase-admin');

let auth;

try {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey) {
    // 1. Remove surrounding quotes if they exist
    privateKey = privateKey.replace(/^"|"$/g, '');
    // 2. Fix escaped newlines
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey
  };

  if (serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    auth = admin.auth();
    console.log('Firebase Admin SDK initialized successfully');
  } else {
    throw new Error('Missing or placeholder credentials');
  }
} catch (error) {
  console.warn('Firebase Admin SDK is in MOCK mode:', error.message);
  auth = {
    verifyIdToken: async () => { 
      throw new Error('Firebase ID token verification failed: Real credentials not configured on server.'); 
    }
  };
}

module.exports = auth;
