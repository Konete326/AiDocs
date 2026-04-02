# 📘 Technical Requirements Document (TRD) — AiDocs
## Version 1.0 | Ultra-Detailed Master Guide

**Title:** AiDocs — Technical Requirements Document  
**Audience:** In-house Developers, Freelancers, AI Coding Agents (Claude/Cursor)  
**Status:** Active Development  
**Date:** March 2026  
**Linked PRD:** AiDocs PRD v2.1

---

## Table of Contents
1. [System Overview](#1-system-overview)
2. [Tech Stack Specification](#2-tech-stack-specification)
3. [Database Schema — MongoDB](#3-database-schema--mongodb)
4. [Authentication Flow — JWT + Refresh Tokens](#4-authentication-flow--jwt--refresh-tokens)
5. [API Contracts](#5-api-contracts)
6. [AI Service Architecture & Fallback Cascade](#6-ai-service-architecture--fallback-cascade)
7. [Frontend Architecture](#7-frontend-architecture)
8. [Security Requirements](#8-security-requirements)
9. [Error Handling & Response Standards](#9-error-handling--response-standards)
10. [Environment Variables](#10-environment-variables)
11. [Deployment Architecture](#11-deployment-architecture)

---

## 1. System Overview

### 1.1 Architecture Pattern
AiDocs follows a **decoupled, RESTful monorepo** architecture:

```
Client (React + Vite)
        │
        ▼
   API Gateway (Express.js)
        │
   ┌────┴──────────────┐
   │                   │
MongoDB Atlas    AI Service Layer
(Data Store)    (NVIDIA / OpenRouter)
```

### 1.2 Request Lifecycle
```
1. User submits wizard form (Frontend)
2. React sends POST /api/projects/generate (with JWT Bearer token)
3. Express middleware validates JWT → extracts userId
4. Request hits ProjectController → calls AIService
5. AIService calls Primary LLM (NVIDIA NIM)
   └── On failure → Fallback cascade triggers
6. Generated docs saved to MongoDB (documents collection)
7. Response returned as structured JSON
8. Frontend stores docs in Zustand, renders workspace
```

### 1.3 Environments

| Environment | Base URL | Purpose |
|---|---|---|
| Development | `http://localhost:5000` | Local dev |
| Staging | `https://staging-api.aidocs.io` | QA testing |
| Production | `https://api.aidocs.io` | Live traffic |

---

## 2. Tech Stack Specification

### 2.1 Backend

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Runtime | Node.js | v20 LTS | Server runtime |
| Framework | Express.js | ^4.18.x | HTTP server & routing |
| Auth | jsonwebtoken | ^9.x | JWT signing/verification |
| Password | bcryptjs | ^2.4.x | Password hashing |
| Validation | Joi or Zod | ^3.x | Request schema validation |
| ORM/ODM | Mongoose | ^8.x | MongoDB interface |
| Process Manager | PM2 | ^5.x | Clustering & zero-downtime |
| HTTP Client | Axios | ^1.x | AI provider API calls |
| Rate Limiting | express-rate-limit | ^7.x | API protection |
| Payments | Stripe SDK | ^14.x | Subscription management |

### 2.2 Frontend

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^18.x | UI rendering |
| Build Tool | Vite | ^5.x | Fast bundling |
| Styling | Tailwind CSS | ^3.x | Utility-first CSS |
| State | Zustand | ^4.x | Global state management |
| Animations | Framer Motion | ^11.x | UI transitions |
| Routing | React Router | ^6.x | Client-side routing |
| HTTP | Axios | ^1.x | API communication |
| Auth UI | Google OAuth 2.0 | — | Social login |

### 2.3 Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Primary data store (cloud) |
| Mongoose | Schema enforcement & queries |
| Compound Indexing | Performance optimization |

---

## 3. Database Schema — MongoDB

> All collections use Mongoose. `_id` is auto-generated ObjectId unless specified.

---

### 3.1 `users` Collection

```javascript
const UserSchema = new Schema({
  _id: ObjectId,                          // Auto
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Email regex validation
  },
  passwordHash: {
    type: String,
    required: function() { return !this.googleId; } // Required only if NOT Google auth
  },
  googleId: {
    type: String,
    default: null,
    index: true
  },
  displayName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 80
  },
  avatarUrl: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  refreshTokenHash: String,               // Hashed refresh token stored server-side
  refreshTokenExpiry: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ googleId: 1 });
```

---

### 3.2 `subscriptions` Collection

```javascript
const SubscriptionSchema = new Schema({
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    unique: true,                         // One active subscription per user
    index: true
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'team'],
    default: 'free'
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'past_due', 'trialing'],
    default: 'active'
  },
  stripeCustomerId: {
    type: String,
    default: null
  },
  stripeSubscriptionId: {
    type: String,
    default: null
  },
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  projectLimit: {
    type: Number,
    default: 3                            // Free = 3, Pro = unlimited (-1)
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
```

---

### 3.3 `projects` Collection

```javascript
const ProjectSchema = new Schema({
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 120,
    trim: true
  },
  projectType: {
    type: String,
    enum: ['saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'generating', 'complete', 'error'],
    default: 'draft'
  },
  wizardAnswers: {
    // Raw answers from the 7-step wizard
    problemStatement: String,
    targetAudience: String,
    coreFeatures: [String],
    techPreference: String,
    monetizationModel: String,
    timelineWeeks: Number,
    additionalContext: String
  },
  docsGenerated: {
    type: [String],                       // Array of doc types successfully generated
    default: []
    // e.g. ['prd', 'srd', 'techStack', 'dbSchema', 'userFlows', 'mvpPlan', 'folderStructure']
  },
  kanbanColumns: [{
    id: String,                           // e.g. 'todo', 'in-progress', 'done'
    title: String,
    featureIds: [ObjectId]
  }],
  milestones: [{
    title: String,
    dueDate: Date,
    isComplete: { type: Boolean, default: false }
  }],
  isArchived: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Compound indexes for performance
ProjectSchema.index({ userId: 1, createdAt: -1 });
ProjectSchema.index({ userId: 1, status: 1 });
ProjectSchema.index({ userId: 1, isArchived: 1 });
```

---

### 3.4 `documents` Collection

```javascript
const DocumentSchema = new Schema({
  _id: ObjectId,
  projectId: {
    type: ObjectId,
    ref: 'Project',
    required: true,
    index: true
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  docType: {
    type: String,
    enum: [
      'prd', 'srd', 'techStack', 'dbSchema',
      'userFlows', 'mvpPlan', 'folderStructure',
      'claudeContext', 'agentSystemPrompt', 'pitchDeck'
    ],
    required: true
  },
  version: {
    type: Number,
    default: 1
  },
  content: {
    type: String,                         // Raw markdown content
    required: true
  },
  contentTokenCount: Number,             // For monitoring LLM usage
  modelUsed: {
    type: String,                         // Which LLM generated this
    default: null
  },
  generationTimeMs: Number,              // Performance tracking
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Compound index — one doc type per project
DocumentSchema.index({ projectId: 1, docType: 1 }, { unique: true });
DocumentSchema.index({ userId: 1, projectId: 1 });
```

---

### 3.5 `notifications` Collection

```javascript
const NotificationSchema = new Schema({
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['doc_ready', 'generation_failed', 'plan_upgraded', 'milestone_due', 'system'],
    required: true
  },
  title: String,
  message: String,
  isRead: {
    type: Boolean,
    default: false
  },
  metadata: {
    projectId: ObjectId,
    docType: String
  },
  createdAt: { type: Date, default: Date.now }
});

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });
```

---

## 4. Authentication Flow — JWT + Refresh Tokens

### 4.1 Token Strategy

| Token | Lifetime | Storage | Purpose |
|---|---|---|---|
| Access Token (JWT) | 15 minutes | Memory (JS variable / Zustand) | API authorization |
| Refresh Token | 7 days | `httpOnly` Cookie (SameSite=Strict) | Access token renewal |

> ⚠️ Access token is NEVER stored in `localStorage` or `sessionStorage`. Only kept in-memory to prevent XSS theft.

---

### 4.2 Registration Flow

```
POST /api/auth/register
        │
        ▼
1. Validate body (email, password, displayName) via Joi schema
2. Check if email already exists → 409 Conflict if so
3. Hash password: bcrypt.hash(password, 12)
4. Create user document in MongoDB
5. Create free subscription document linked to userId
6. Generate verificationToken (crypto.randomBytes(32).toString('hex'))
7. Send verification email (optional / future)
8. Return: { message: "Account created", userId }
   → Do NOT return tokens yet (email verification first — or skip in MVP)
```

---

### 4.3 Login Flow (Email/Password)

```
POST /api/auth/login
        │
        ▼
1. Validate body (email, password)
2. Find user by email → 404 if not found
3. bcrypt.compare(password, user.passwordHash) → 401 if mismatch
4. Generate tokens:
   ┌─ accessToken  = jwt.sign({ userId, role }, ACCESS_SECRET,  { expiresIn: '15m' })
   └─ refreshToken = jwt.sign({ userId },       REFRESH_SECRET, { expiresIn: '7d' })
5. Hash refresh token: bcrypt.hash(refreshToken, 10)
6. Store refreshTokenHash + refreshTokenExpiry in user document
7. Set httpOnly cookie: res.cookie('refreshToken', refreshToken, {
     httpOnly: true,
     secure: true,         // HTTPS only in production
     sameSite: 'strict',
     maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in ms
   })
8. Return: { accessToken, user: { userId, email, displayName, role } }
```

---

### 4.4 Token Refresh Flow

```
POST /api/auth/refresh
        │
        ▼
1. Read refreshToken from httpOnly cookie
2. Verify with jwt.verify(token, REFRESH_SECRET) → 401 if invalid/expired
3. Find user by userId from decoded payload
4. bcrypt.compare(incomingToken, user.refreshTokenHash) → 401 if mismatch
5. Check refreshTokenExpiry → 401 if expired
6. Generate NEW accessToken (15 min)
7. Optionally rotate refresh token (generate new, rehash, update DB + cookie)
8. Return: { accessToken }
```

---

### 4.5 Google OAuth Flow

```
GET /api/auth/google → Redirect to Google OAuth consent screen
GET /api/auth/google/callback
        │
        ▼
1. Receive Google profile (googleId, email, displayName, avatarUrl)
2. Find user by googleId OR email
3a. If found → update googleId if not set → proceed to token generation
3b. If not found → create new user (no passwordHash) + subscription → proceed
4. Follow same token generation steps as Login Flow (Step 4 onward)
5. Redirect to: /dashboard with accessToken in URL fragment (short-lived)
   OR set cookie + redirect cleanly
```

---

### 4.6 Logout Flow

```
POST /api/auth/logout
        │
        ▼
1. Clear refreshToken cookie: res.clearCookie('refreshToken')
2. Nullify refreshTokenHash in MongoDB (token rotation invalidation)
3. Return: { message: "Logged out successfully" }
```

---

### 4.7 Auth Middleware

```javascript
// middleware/authenticate.js
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    return res.status(401).json({ error: 'Invalid token', code: 'TOKEN_INVALID' });
  }
};
```

---

## 5. API Contracts

### 5.1 Base Response Format

All API responses follow this envelope:

```json
// ✅ Success
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}

// ❌ Error
{
  "success": false,
  "error": "Human-readable error",
  "code": "MACHINE_READABLE_CODE",
  "details": [ ... ]   // Validation errors array (optional)
}
```

---

### 5.2 Auth Routes

#### `POST /api/auth/register`
**Body:**
```json
{
  "email": "user@example.com",      // Required | valid email | max 255
  "password": "MyPass123!",         // Required | min 8 chars | 1 uppercase | 1 number | 1 special
  "displayName": "John Doe"         // Required | min 2 | max 80
}
```
**Response 201:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": { "userId": "665a..." }
}
```
**Errors:** `400` validation fail | `409` email taken

---

#### `POST /api/auth/login`
**Body:**
```json
{
  "email": "user@example.com",
  "password": "MyPass123!"
}
```
**Response 200:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "user": {
      "userId": "665a...",
      "email": "user@example.com",
      "displayName": "John Doe",
      "role": "user",
      "avatarUrl": null
    }
  }
}
```
**Errors:** `400` validation | `401` wrong credentials | `404` user not found

---

#### `POST /api/auth/refresh`
**Requires:** `refreshToken` httpOnly cookie  
**Response 200:**
```json
{
  "success": true,
  "data": { "accessToken": "eyJ..." }
}
```
**Errors:** `401` token missing/invalid/expired

---

#### `POST /api/auth/logout`
**Requires:** Auth header (Bearer token)  
**Response 200:**
```json
{ "success": true, "message": "Logged out successfully" }
```

---

### 5.3 User Routes

#### `GET /api/users/me`
**Auth:** Required  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "userId": "665a...",
    "email": "user@example.com",
    "displayName": "John Doe",
    "avatarUrl": null,
    "isVerified": true,
    "role": "user",
    "subscription": {
      "plan": "free",
      "status": "active",
      "projectLimit": 3
    },
    "createdAt": "2026-03-01T10:00:00Z"
  }
}
```

#### `PATCH /api/users/me`
**Auth:** Required  
**Body (all optional):**
```json
{
  "displayName": "New Name",
  "avatarUrl": "https://..."
}
```
**Response 200:** Updated user object  
**Errors:** `400` validation | `401` unauthorized

---

### 5.4 Project Routes

#### `GET /api/projects`
**Auth:** Required  
**Query Params:**
```
?page=1&limit=10&status=complete&archived=false
```
**Response 200:**
```json
{
  "success": true,
  "data": {
    "projects": [ { ...projectObject } ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

---

#### `POST /api/projects`
**Auth:** Required  
**Body:**
```json
{
  "title": "My SaaS App",                // Required | 3-120 chars
  "projectType": "saas",                 // Required | enum: saas|mobile|ai|ecommerce|marketplace|other
  "wizardAnswers": {
    "problemStatement": "...",           // Required | 20-2000 chars
    "targetAudience": "...",             // Required | 10-500 chars
    "coreFeatures": ["Feature A", "B"], // Required | min 1 | max 10 items
    "techPreference": "no preference",   // Optional
    "monetizationModel": "subscription", // Optional
    "timelineWeeks": 12,                 // Optional | 1-104
    "additionalContext": "..."           // Optional | max 1000 chars
  }
}
```
**Response 201:**
```json
{
  "success": true,
  "data": {
    "projectId": "665b...",
    "status": "draft",
    "message": "Project created. Call /generate to start doc generation."
  }
}
```
**Errors:** `400` validation | `403` project limit reached (free plan)

---

#### `POST /api/projects/:projectId/generate`
**Auth:** Required  
**Params:** `projectId` (MongoDB ObjectId)  
**Body:**
```json
{
  "docTypes": ["prd", "srd", "techStack"]  // Optional: specify subset. Default = all 9 docs.
}
```
**Response 202 (Accepted — async generation starts):**
```json
{
  "success": true,
  "data": {
    "projectId": "665b...",
    "status": "generating",
    "estimatedTimeSeconds": 45,
    "message": "Document generation started."
  }
}
```
**Errors:** `400` invalid projectId | `403` unauthorized | `404` project not found | `409` already generating

---

#### `GET /api/projects/:projectId`
**Auth:** Required  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "_id": "665b...",
    "title": "My SaaS App",
    "projectType": "saas",
    "status": "complete",
    "docsGenerated": ["prd", "srd", "techStack", "dbSchema"],
    "milestones": [],
    "kanbanColumns": [],
    "createdAt": "2026-03-01T10:00:00Z"
  }
}
```

---

#### `PATCH /api/projects/:projectId`
**Auth:** Required  
**Body (all optional):**
```json
{
  "title": "Updated Title",
  "isArchived": true,
  "milestones": [ { "title": "MVP Launch", "dueDate": "2026-06-01" } ],
  "kanbanColumns": [ { "id": "todo", "title": "To Do", "featureIds": [] } ]
}
```

---

#### `DELETE /api/projects/:projectId`
**Auth:** Required  
**Response 200:**
```json
{ "success": true, "message": "Project and all associated documents deleted." }
```

---

### 5.5 Document Routes

#### `GET /api/projects/:projectId/documents`
**Auth:** Required  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "_id": "665c...",
        "docType": "prd",
        "version": 1,
        "modelUsed": "meta/llama-3.1-405b-instruct",
        "generationTimeMs": 12400,
        "contentTokenCount": 3200,
        "createdAt": "2026-03-01T10:05:00Z"
      }
    ]
  }
}
```

---

#### `GET /api/projects/:projectId/documents/:docType`
**Auth:** Required  
**Params:** `docType` = one of the 10 doc type enums  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "_id": "665c...",
    "docType": "prd",
    "content": "# Product Requirements Document\n\n...",
    "version": 1,
    "modelUsed": "meta/llama-3.1-405b-instruct",
    "generationTimeMs": 12400
  }
}
```
**Errors:** `404` doc not yet generated

---

#### `PATCH /api/projects/:projectId/documents/:docType`
**Auth:** Required (Pro plan only)  
**Body:**
```json
{
  "content": "# Updated PRD content..."  // Required | max 50000 chars
}
```
**Response 200:** Updated document object  
**Errors:** `403` free plan restriction

---

### 5.6 Subscription Routes

#### `GET /api/subscriptions/me`
**Auth:** Required  
**Response 200:** Current subscription object

---

#### `POST /api/subscriptions/create-checkout`
**Auth:** Required  
**Body:**
```json
{
  "planId": "pro",                    // Required | enum: pro|team
  "successUrl": "https://...",
  "cancelUrl": "https://..."
}
```
**Response 200:**
```json
{
  "success": true,
  "data": { "checkoutUrl": "https://checkout.stripe.com/..." }
}
```

---

#### `POST /api/subscriptions/webhook`
**Auth:** Stripe Signature Header (no JWT)  
**Purpose:** Handles Stripe events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`  
**Response 200:** `{ "received": true }`

---

### 5.7 AI Chat Routes

#### `POST /api/projects/:projectId/chat`
**Auth:** Required  
**Body:**
```json
{
  "message": "What tech stack did you recommend and why?",  // Required | max 2000 chars
  "conversationHistory": [                                   // Optional | last 10 messages
    { "role": "user",      "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```
**Response 200:**
```json
{
  "success": true,
  "data": {
    "reply": "Based on your PRD, I recommended React + Node.js because...",
    "modelUsed": "meta/llama-3.1-405b-instruct"
  }
}
```

---

## 6. AI Service Architecture & Fallback Cascade

### 6.1 Provider Configuration

```javascript
const AI_PROVIDERS = [
  {
    id: 'nvidia-primary',
    name: 'NVIDIA NIM — Llama 3.1 405B',
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'meta/llama-3.1-405b-instruct',
    apiKeyEnv: 'NVIDIA_API_KEY',
    priority: 1,
    maxTokens: 8192,
    timeoutMs: 60000
  },
  {
    id: 'openrouter-backup1',
    name: 'OpenRouter — Llama 3.1 405B',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.1-405b-instruct',
    apiKeyEnv: 'OPENROUTER_API_KEY',
    priority: 2,
    maxTokens: 8192,
    timeoutMs: 60000
  },
  {
    id: 'openrouter-backup2',
    name: 'OpenRouter — Llama 3.1 70B',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.1-70b-instruct',
    apiKeyEnv: 'OPENROUTER_API_KEY',
    priority: 3,
    maxTokens: 4096,
    timeoutMs: 45000
  },
  {
    id: 'nvidia-deep-backup',
    name: 'NVIDIA — Nemotron 70B',
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'nvidia/llama-3.1-nemotron-70b-instruct',
    apiKeyEnv: 'NVIDIA_API_KEY',
    priority: 4,
    maxTokens: 4096,
    timeoutMs: 45000
  }
];
```

---

### 6.2 Fallback Cascade Logic

```javascript
// services/AIService.js
class AIService {
  async generate({ systemPrompt, userPrompt, maxTokens = 4096 }) {
    const providers = AI_PROVIDERS.sort((a, b) => a.priority - b.priority);
    let lastError = null;

    for (const provider of providers) {
      try {
        console.log(`[AIService] Attempting: ${provider.name}`);
        const result = await this._callProvider(provider, { systemPrompt, userPrompt, maxTokens });
        console.log(`[AIService] Success: ${provider.name}`);
        return { content: result, modelUsed: provider.model };
      } catch (err) {
        console.error(`[AIService] Failed: ${provider.name} — ${err.message}`);
        lastError = err;

        // Categorize error — don't retry on auth failures
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.error(`[AIService] Auth error on ${provider.name}, skipping...`);
          continue;
        }
        // Brief pause before next provider
        await this._delay(1500);
      }
    }

    // All providers failed
    throw new Error(`All AI providers failed. Last error: ${lastError?.message}`);
  }

  async _callProvider(provider, { systemPrompt, userPrompt, maxTokens }) {
    const response = await axios.post(
      provider.url,
      {
        model: provider.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env[provider.apiKeyEnv]}`,
          'Content-Type': 'application/json'
        },
        timeout: provider.timeoutMs
      }
    );
    return response.data.choices[0].message.content;
  }

  _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}
```

---

### 6.3 Prompt Templates (Per Doc Type)

Each doc type has a dedicated system prompt + dynamic user prompt. Structure:

```javascript
// prompts/prdPrompt.js
const buildPRDPrompt = (wizardAnswers) => ({
  system: `You are a senior product manager. Generate a clinical, detailed PRD in Markdown format.
           Include: Executive Summary, Problem Statement, Target Audience, Feature Matrix (with user stories),
           KPIs, Out-of-Scope items. Be thorough and technically precise. Output ONLY the document.`,
  user: `Generate a PRD for this project:
         Project Type: ${wizardAnswers.projectType}
         Problem: ${wizardAnswers.problemStatement}
         Target Users: ${wizardAnswers.targetAudience}
         Core Features: ${wizardAnswers.coreFeatures.join(', ')}
         Monetization: ${wizardAnswers.monetizationModel}
         Timeline: ${wizardAnswers.timelineWeeks} weeks`
});
```

---

### 6.4 Generation Pipeline (9 Docs)

```
1. Project status → "generating"
2. For each docType in ordered list:
   a. Build prompt from wizardAnswers
   b. Call AIService.generate()
   c. Save document to MongoDB (upsert by projectId + docType)
   d. Update project.docsGenerated[]
   e. Emit notification: "doc_ready"
3. Project status → "complete"
4. On any unrecoverable failure → status: "error" + notification: "generation_failed"
```

**Generation Order (dependency-aware):**
```
1. prd              → Foundation
2. srd              → Based on PRD features
3. techStack        → Based on SRD requirements
4. dbSchema         → Based on features + tech
5. userFlows        → Based on PRD features
6. folderStructure  → Based on techStack
7. mvpPlan          → Based on all above
8. claudeContext    → Summary of all docs
9. agentSystemPrompt → Instructions for AI coders
```

---

## 7. Frontend Architecture

### 7.1 Project Structure

```
src/
├── api/
│   ├── authApi.js          # Auth API calls
│   ├── projectApi.js       # Project CRUD + generation
│   ├── documentApi.js      # Document fetch + edit
│   └── axiosInstance.js    # Configured Axios with interceptors
├── components/
│   ├── ui/                 # Reusable: Button, Input, Modal, Badge, Tooltip
│   ├── layout/             # Navbar, Sidebar, PageWrapper
│   ├── wizard/             # Step components 0-7
│   ├── workspace/          # Kanban, Milestone, DocViewer, ChatPanel
│   └── auth/               # LoginForm, RegisterForm, GoogleOAuthButton
├── pages/
│   ├── Landing.jsx
│   ├── Auth.jsx            # Login + Register tabs
│   ├── Dashboard.jsx       # Project list
│   ├── Workspace.jsx       # Main workspace (post-generation)
│   ├── Wizard.jsx          # 7-step wizard
│   └── Settings.jsx
├── store/
│   ├── authStore.js        # Zustand: user, accessToken, login/logout actions
│   ├── projectStore.js     # Zustand: projects, active project
│   └── uiStore.js          # Zustand: modals, loading states, notifications
├── hooks/
│   ├── useAuth.js          # Wraps authStore
│   ├── useProject.js       # Wraps projectStore + API calls
│   └── useTokenRefresh.js  # Silent token refresh via interceptors
├── utils/
│   ├── validators.js       # Client-side form validation
│   ├── formatters.js       # Date, string formatters
│   └── constants.js        # Enums, limits
└── App.jsx                 # Routes + global providers
```

---

### 7.2 Zustand Store — `authStore`

```javascript
// store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  accessToken: null,       // In-memory ONLY
  user: null,
  isAuthenticated: false,

  setAuth: (accessToken, user) => set({
    accessToken,
    user,
    isAuthenticated: true
  }),

  clearAuth: () => set({
    accessToken: null,
    user: null,
    isAuthenticated: false
  }),

  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  }))
}));
```

---

### 7.3 Axios Interceptors (Token Refresh)

```javascript
// api/axiosInstance.js
import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

// Attach access token to every request
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Handle 401 → silent refresh
let isRefreshing = false;
let failedQueue = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED' && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(token => { original.headers.Authorization = `Bearer ${token}`; return api(original); });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const res = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        const newToken = res.data.data.accessToken;
        useAuthStore.getState().setAuth(newToken, useAuthStore.getState().user);
        failedQueue.forEach(p => p.resolve(newToken));
        failedQueue = [];
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        failedQueue.forEach(p => p.reject(error));
        useAuthStore.getState().clearAuth();
        window.location.href = '/auth';
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

### 7.4 Wizard — Step Structure

| Step | Key Question | Validation |
|---|---|---|
| 0 | Project Type Selection (card UI) | Required |
| 1 | Problem Statement | Required, 20–2000 chars |
| 2 | Target Audience | Required, 10–500 chars |
| 3 | Core Features (multi-input list) | Min 1, max 10 items |
| 4 | Tech Preference | Optional |
| 5 | Monetization Model | Optional |
| 6 | Timeline (weeks, slider) | Optional, 1–104 |
| 7 | Additional Context | Optional, max 1000 chars |

---

## 8. Security Requirements

### 8.1 Authentication & Authorization
- [ ] All protected routes verify JWT via `authenticate` middleware
- [ ] Role-based access: `admin` routes require `authorizeAdmin` middleware
- [ ] Refresh tokens stored as bcrypt hashes (salt rounds: 10) in DB
- [ ] Access tokens kept in-memory only (never localStorage)
- [ ] httpOnly cookies for refresh tokens with `SameSite=Strict` and `Secure=true`

### 8.2 Input Validation
- [ ] All incoming request bodies validated with Joi/Zod schemas before hitting controllers
- [ ] MongoDB ObjectId validated with `mongoose.Types.ObjectId.isValid()` before queries
- [ ] String fields trimmed and length-limited to prevent oversized payloads
- [ ] File uploads (future): MIME type check + max 5MB limit

### 8.3 Rate Limiting

```javascript
// Applied globally
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100,                    // 100 requests per window per IP
  standardHeaders: true,
  message: { success: false, error: 'Too many requests', code: 'RATE_LIMIT_EXCEEDED' }
});

// Applied to auth routes specifically
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,                     // 10 auth attempts per 15 min
  message: { success: false, error: 'Too many auth attempts', code: 'AUTH_RATE_LIMITED' }
});

// Applied to AI generation routes
const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour
  max: 5,                      // Free plan: 5 generations/hour
  message: { success: false, error: 'Generation limit reached', code: 'GENERATION_RATE_LIMITED' }
});
```

### 8.4 General Security Headers

```javascript
// Use helmet.js
app.use(helmet());
// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,           // Allow cookies
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
```

### 8.5 Data Ownership Enforcement
- [ ] Every query filters by `userId` extracted from JWT — users can ONLY access their own data
- [ ] Example: `Project.findOne({ _id: projectId, userId: req.user.userId })`
- [ ] Admin routes use separate `authorizeAdmin` middleware checking `req.user.role === 'admin'`

### 8.6 Stripe Webhook Security
- [ ] All webhook events verified using `stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET)`
- [ ] Raw body parsing enabled for webhook route only (`express.raw({ type: 'application/json' })`)

---

## 9. Error Handling & Response Standards

### 9.1 HTTP Status Codes

| Code | Meaning | When Used |
|---|---|---|
| 200 | OK | Successful GET, PATCH, DELETE |
| 201 | Created | Successful POST (new resource) |
| 202 | Accepted | Async operation started (generation) |
| 400 | Bad Request | Validation failure |
| 401 | Unauthorized | Missing/invalid/expired token |
| 403 | Forbidden | Valid token but insufficient permissions/plan |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource (email, generating state) |
| 422 | Unprocessable Entity | Logically invalid request |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unhandled server errors |
| 503 | Service Unavailable | All AI providers failed |

---

### 9.2 Error Code Reference

| Code | HTTP Status | Description |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Request body failed schema validation |
| `TOKEN_EXPIRED` | 401 | JWT access token has expired |
| `TOKEN_INVALID` | 401 | JWT is malformed or signature mismatch |
| `TOKEN_MISSING` | 401 | No Authorization header present |
| `REFRESH_TOKEN_INVALID` | 401 | Refresh token invalid or expired |
| `UNAUTHORIZED` | 403 | Insufficient role or plan |
| `PLAN_LIMIT_REACHED` | 403 | User hit free plan project limit |
| `NOT_FOUND` | 404 | Resource not found |
| `EMAIL_TAKEN` | 409 | Registration email already exists |
| `ALREADY_GENERATING` | 409 | Generation already in progress |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `AUTH_RATE_LIMITED` | 429 | Too many auth attempts |
| `GENERATION_FAILED` | 503 | All AI providers failed |
| `INTERNAL_ERROR` | 500 | Unhandled server exception |

---

### 9.3 Global Error Handler (Express)

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const code   = err.code       || 'INTERNAL_ERROR';
  const message = err.message   || 'Something went wrong';

  // Don't expose stack trace in production
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${status} ${code}: ${message}`, err.stack);
  }

  res.status(status).json({
    success: false,
    error: message,
    code,
    ...(err.details && { details: err.details })
  });
};
```

---

### 9.4 Frontend Error Handling

```javascript
// Global Axios response error handler (in axiosInstance.js)
// After handling 401 refresh logic:

const errorMessage = error.response?.data?.error || 'Something went wrong. Please try again.';
const errorCode    = error.response?.data?.code;

switch (errorCode) {
  case 'PLAN_LIMIT_REACHED':
    // Show upgrade modal
    useUIStore.getState().openUpgradeModal();
    break;
  case 'RATE_LIMIT_EXCEEDED':
    // Show toast notification
    toast.error('Too many requests. Please wait a moment.');
    break;
  case 'GENERATION_FAILED':
    // Show retry button in workspace
    useProjectStore.getState().setGenerationError(projectId);
    break;
  default:
    toast.error(errorMessage);
}
```

---

## 10. Environment Variables

### Backend `.env`

```bash
# Server
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://aidocs.io

# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/aidocs

# Auth
ACCESS_TOKEN_SECRET=<min-64-char-random-string>
REFRESH_TOKEN_SECRET=<min-64-char-random-string>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Google OAuth
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
GOOGLE_CALLBACK_URL=https://api.aidocs.io/api/auth/google/callback

# AI Providers
NVIDIA_API_KEY=<nvidia-nim-key>
OPENROUTER_API_KEY=<openrouter-key>

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...
```

### Frontend `.env`

```bash
VITE_API_URL=https://api.aidocs.io
VITE_GOOGLE_CLIENT_ID=<from-google-console>
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 11. Deployment Architecture

### 11.1 Server Setup

```
VPS / Cloud Server (e.g., DigitalOcean, AWS EC2)
└── PM2 Cluster Mode
    ├── Instance 1 (Port 5000)
    ├── Instance 2 (Port 5001)
    └── ... (based on CPU cores)
         │
         ▼
    Nginx (Reverse Proxy + SSL)
    └── Proxy → PM2 instances
    └── Serve frontend static files (or use Vercel/Netlify for frontend)
```

### 11.2 PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'aidocs-api',
    script: './src/server.js',
    instances: 'max',              // Use all CPU cores
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    max_memory_restart: '512M',
    error_file: './logs/error.log',
    out_file: './logs/out.log'
  }]
};
```

### 11.3 Frontend Deployment (Vercel / Netlify)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Set `VITE_` vars in dashboard
- Redirect rule: All routes → `index.html` (for React Router)

---

*This TRD is the single source of technical truth for AiDocs v2.1.*  
*Keep in sync with PRD v2.1 at all times.*  
*Last Updated: March 2026*
