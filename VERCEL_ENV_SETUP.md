# Vercel Environment Variables Setup

Go to: vercel.com → Project → Settings → Environment Variables
Add ALL of these (set for Production + Preview + Development):

NODE_ENV=production
MONGODB_URI=<your Atlas URI>
JWT_ACCESS_SECRET=<random 64 char string>
JWT_REFRESH_SECRET=<different random 64 char string>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

FIREBASE_PROJECT_ID=<from Firebase Console>
FIREBASE_CLIENT_EMAIL=<from Firebase service account JSON>
FIREBASE_PRIVATE_KEY=<full key with \n — wrap in quotes>

CLOUDINARY_CLOUD_NAME=<from Cloudinary dashboard>
CLOUDINARY_API_KEY=<from Cloudinary dashboard>
CLOUDINARY_API_SECRET=<from Cloudinary dashboard>

NVIDIA_API_KEY=<from build.nvidia.com>
OPENROUTER_API_KEY=<from openrouter.ai>

STRIPE_SECRET_KEY=<from Stripe dashboard>
STRIPE_WEBHOOK_SECRET=<from Stripe CLI>
STRIPE_PRO_PRICE_ID=<from Stripe products>
STRIPE_TEAM_PRICE_ID=<from Stripe products>
STRIPE_SUCCESS_URL=https://your-app.vercel.app/dashboard?upgrade=success
STRIPE_CANCEL_URL=https://your-app.vercel.app/pricing

FRONTEND_URL=https://your-app.vercel.app

EMAIL_FROM=noreply@yourdomain.com
EMAIL_SERVICE=gmail
EMAIL_USER=<gmail address>
EMAIL_PASS=<gmail app password>
RESET_TOKEN_SECRET=<random 64 char string>

IMPORTANT:
- FIREBASE_PRIVATE_KEY must be in quotes with literal \n characters
- After adding all variables, redeploy from Vercel dashboard
