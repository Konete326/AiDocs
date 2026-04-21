const admin = require('firebase-admin');

let auth;

try {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey) {
    // 1. Strip surrounding quotes that Vercel may add
    privateKey = privateKey.replace(/^["']|["']$/g, '').trim();
    
    // 2. Convert any escaped \n sequences back to real newlines
    //    Handles: \n, \\n, and \\\\n (multiple levels of escaping)
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // 3. Normalize: Ensure header and footer have newlines
    privateKey = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----\s*/g, '-----BEGIN PRIVATE KEY-----\n')
      .replace(/\s*-----END PRIVATE KEY-----/g, '\n-----END PRIVATE KEY-----')
      .trim() + '\n';

    console.log('🔑 Key start:', JSON.stringify(privateKey.substring(0, 40)));
    console.log('🔑 Key end:', JSON.stringify(privateKey.substring(privateKey.length - 40)));
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
  const pk = process.env.FIREBASE_PRIVATE_KEY || 'N/A';
  const debug = `[Len: ${pk.length}, Start: ${pk.substring(0, 15)}, End: ${pk.substring(pk.length - 15)}]`;
  
  console.error('❌ Firebase SDK Initialization Error:', error.message, debug);
  auth = {
    verifyIdToken: async () => { 
      throw new Error(`Firebase Auth logic failed. Error: ${error.message}. Debug: ${debug}. Ensure you redeploy on Vercel.`); 
    }
  };
}

module.exports = auth;
