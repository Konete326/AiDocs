const admin = require('firebase-admin');

let auth;

try {
  let serviceAccount;

  // ── Strategy 1: Full JSON string (most reliable on Vercel) ──────────────
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    console.log('✅ Firebase: loaded via FIREBASE_SERVICE_ACCOUNT_JSON');
  }
  // ── Strategy 2: Individual vars (fallback) ──────────────────────────────
  else if (process.env.FIREBASE_PRIVATE_KEY) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Strip surrounding quotes that Vercel may add
    privateKey = privateKey.replace(/^["']|["']$/g, '').trim();

    // Convert escaped \n sequences back to real newlines
    privateKey = privateKey.replace(/\\n/g, '\n');

    // Remove stray \r characters (Windows line endings)
    privateKey = privateKey.replace(/\r/g, '');

    serviceAccount = {
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    };
    console.log('✅ Firebase: loaded via individual env vars');
  } else {
    throw new Error('No Firebase credentials found. Set FIREBASE_SERVICE_ACCOUNT_JSON in Vercel.');
  }

  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }
  auth = admin.auth();
  console.log('✅ Firebase Admin SDK initialized successfully');

} catch (error) {
  console.error('❌ Firebase SDK Initialization Error:', error.message);
  auth = {
    verifyIdToken: async () => {
      throw new Error(`Firebase not initialized: ${error.message}`);
    }
  };
}

module.exports = auth;

