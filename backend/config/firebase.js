const admin = require('firebase-admin');

let auth;

try {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey) {
    // 1. Initial cleanup
    privateKey = privateKey.trim().replace(/^["']|["']$/g, '');
    
    // 2. Handle all variations of escaped newlines (\n, \\n, \\\n)
    privateKey = privateKey.replace(/\\+n/g, '\n');
    
    // 3. Ensure header and footer are correctly delimited with newlines
    if (privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      const header = '-----BEGIN PRIVATE KEY-----';
      const footer = '-----END PRIVATE KEY-----';
      
      let body = privateKey
        .replace(header, '')
        .replace(footer, '')
        .replace(/\s/g, '') // Remove all internal whitespace/newlines
        .trim();
        
      // Re-insert newlines every 64 chars (PEM standard)
      const matches = body.match(/.{1,64}/g);
      const formattedBody = matches ? matches.join('\n') : body;
      
      privateKey = `${header}\n${formattedBody}\n${footer}\n`;
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
