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

  const hasProjectId = !!serviceAccount.projectId;
  const hasClientEmail = !!serviceAccount.clientEmail;
  const isKeyFormatted = !!serviceAccount.privateKey && serviceAccount.privateKey.includes('-----BEGIN PRIVATE KEY-----');

  if (hasProjectId && hasClientEmail && isKeyFormatted) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    auth = admin.auth();
    console.log('✅ Firebase Admin SDK initialized successfully');
  } else {
    const reasons = [];
    if (!hasProjectId) reasons.push('PROJECT_ID_MISSING');
    if (!hasClientEmail) reasons.push('CLIENT_EMAIL_MISSING');
    if (!isKeyFormatted) reasons.push('PRIVATE_KEY_INVALID_OR_MISSING');
    
    throw new Error(`Incomplete configuration: ${reasons.join(', ')}`);
  }
} catch (error) {
  console.error('❌ Firebase SDK Initialization Error:', error.message);
  auth = {
    verifyIdToken: async () => { 
      throw new Error(`Firebase Auth logic failed. Server message: ${error.message}. Ensure you redeploy on Vercel after adding Env Vars.`); 
    }
  };
}

module.exports = auth;
