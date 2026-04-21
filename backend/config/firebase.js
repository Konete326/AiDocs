const admin = require('firebase-admin');

let auth;

try {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey) {
    // Aggressive cleaning for Vercel/Docker env quirks
    privateKey = privateKey
      .trim()
      .replace(/^['"]|['"]$/g, '') // Remove start/end quotes (single or double)
      .replace(/\\n/g, '\n')       // Convert escaped literal \n to real newlines
      .replace(/\r/g, '');         // Remove carriage returns
    
    // Ensure it starts/ends correctly for PEM format
    if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
       console.error('❌ Private Key does not start with BEGIN header');
    }
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
