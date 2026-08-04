const admin = require('firebase-admin');

let auth;

try {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else if (process.env.FIREBASE_PRIVATE_KEY) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (typeof privateKey === 'string') {
      privateKey = privateKey.replace(/^["']|["']$/g, '').trim();
      if (privateKey.includes('\\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }
      privateKey = privateKey.replace(/\r/g, '');
    }

    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    };
  } else {
    throw new Error('No Firebase credentials found.');
  }

  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }
  auth = admin.auth();
} catch (error) {
  auth = {
    verifyIdToken: async () => {
      throw new Error(`Firebase not initialized: ${error.message}`);
    }
  };
}

module.exports = auth;
