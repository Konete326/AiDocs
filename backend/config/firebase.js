const admin = require('firebase-admin');

let auth;

try {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey) {
    // 1. Unquote if wrapped in any quotes
    privateKey = privateKey.trim().replace(/^["'](.+)["']$/s, '$1');
    
    // 2. Handle escaped newlines (both \n and \\n)
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // 3. Final trim of the result
    privateKey = privateKey.trim();

    // Diagnostic if it looks wrong
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        console.error('❌ KEY ERROR: Headers missing. Current start:', privateKey.substring(0, 20));
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
