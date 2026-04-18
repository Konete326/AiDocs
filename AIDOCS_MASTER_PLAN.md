# AiDocs — Backend Master Plan
**Version:** 3.0  
**Status:** Complete (Backend)
**Last Updated:** 2026  
**Stack:** Node.js 20 · Express 4 · MongoDB + Mongoose 8 · JWT · Stripe · NVIDIA NIM / OpenRouter · Firebase Auth (Google) · Cloudinary

---

## Table of Contents
1. [Project Summary](#1-project-summary)
2. [What to Remove First](#2-what-to-remove-first)
3. [Target Backend File Structure](#3-target-backend-file-structure)
4. [Module Specifications](#4-module-specifications)
5. [Database Models](#5-database-models)
6. [Security Architecture](#6-security-architecture)
7. [AI Generation Pipeline](#7-ai-generation-pipeline)
8. [Stripe Integration](#8-stripe-integration)
9. [Sprint Plan](#9-sprint-plan)
10. [Environment Variables](#10-environment-variables)
11. [Agent Instructions Per Sprint](#11-agent-instructions-per-sprint)
12. [Completion Tracker](#12-completion-tracker)

---

## 1. Project Summary

**AiDocs** (branded: SwiftDocs AI) is an AI-powered SaaS that generates 9-document technical suites for non-technical founders. Users complete a 7-step wizard; the platform generates a full documentation package (PRD, SRD, Tech Stack, DB Schema, User Flows, MVP Plan, Folder Structure, CLAUDE.md, Agent Prompts) using NVIDIA NIM with a 4-level fallback cascade.

### Business Logic in One Sentence
A user creates a Project → fills a wizard → triggers generation → gets 9 documents → can manage them in a Kanban workspace → can export as ZIP (Pro).

### Subscription Tiers
| Plan | Project Limit | Generation | Chat | ZIP Export |
|------|--------------|------------|------|------------|
| Free | 3 | ✅ | ❌ | ❌ |
| Pro | 10 | ✅ | ✅ | ✅ |
| Team | Unlimited | ✅ | ✅ | ✅ |

---

## 2. What to Remove First

Before writing a single new line, the agent MUST delete or rewrite these:

| Target | Action | Reason |
|--------|--------|--------|
| `controllers/documentController.js` | Delete entire file | Temp CRUD, all routes public, no auth |
| `routes/documentRoutes.js` | Delete entire file | All routes public, doesn't match API contract |
| `routes/userRoutes.js` | Delete entire file | References non-existent controller method |
| `controllers/userController.js` | Delete entire file | Empty placeholder |
| `utils/helpers.js` | Delete entire file | Duplicate of token logic that will live in tokenUtils.js |
| `frontend/src/context/AuthContext.jsx` line 11 | Remove localStorage token write | Security violation |
| `frontend/src/services/api.js` line 15 | Remove localStorage token read | Security violation |
| `frontend/src/pages/Home.jsx` | Delete page | Temp document CRUD UI |
| `models/Document.js` | Rebuild from scratch | Schema is completely wrong |
| `models/User.js` | Rebuild from scratch | Missing 8 required fields |

---

## 3. Target Backend File Structure

```
backend/
├── .env
├── .env.example
├── ecosystem.config.js
├── server.js
├── config/
│   ├── db.js
│   └── passport.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── projectController.js
│   ├── documentController.js
│   ├── subscriptionController.js
│   └── notificationController.js
├── middleware/
│   ├── authenticate.js
│   ├── authorizeAdmin.js
│   ├── validateRequest.js
│   ├── rateLimiter.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Subscription.js
│   ├── Project.js
│   ├── Document.js
│   └── Notification.js
├── prompts/
│   ├── prdPrompt.js
│   ├── srdPrompt.js
│   ├── techStackPrompt.js
│   ├── dbSchemaPrompt.js
│   ├── userFlowsPrompt.js
│   ├── mvpPlanPrompt.js
│   ├── folderStructurePrompt.js
│   ├── claudeContextPrompt.js
│   └── agentSystemPrompt.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   ├── documentRoutes.js
│   ├── subscriptionRoutes.js
│   └── notificationRoutes.js
├── services/
│   ├── AIService.js
│   ├── authService.js
│   ├── projectService.js
│   ├── documentService.js
│   ├── subscriptionService.js
│   ├── stripeService.js
│   └── notificationService.js
└── utils/
    ├── AppError.js
    ├── asyncWrapper.js
    └── tokenUtils.js
```

**Rule:** Controllers are thin — they only parse req/res and call a service. All business logic lives in services. Models contain schema only, no business logic.

---

## 4. Module Specifications

### 4.1 Auth Module

**Routes (`routes/authRoutes.js`)**
```
POST   /api/auth/register          → register
POST   /api/auth/login             → login
POST   /api/auth/refresh           → refreshToken
POST   /api/auth/logout            → logout
GET    /api/auth/google            → googleAuth (passport redirect)
GET    /api/auth/google/callback   → googleAuthCallback
```

**Controller (`controllers/authController.js`)**  
Each handler: validate → call authService → return standardized response. No logic in controller.

**Service (`services/authService.js`)**
- `registerUser(email, password, displayName)` → hash password, create User + Subscription (free), return accessToken + set refresh cookie
- `loginUser(email, password)` → verify credentials, generate token pair
- `refreshAccessToken(refreshToken)` → verify cookie, hash-compare against DB, rotate refresh token, return new access token
- `logoutUser(userId)` → clear refreshTokenHash in DB, clear cookie
- `handleGoogleUser(profile)` → upsert user by googleId, return token pair

**Token Strategy**
- Access token: JWT, 15 minutes, signed with `JWT_ACCESS_SECRET`, sent in response body, stored in memory only (frontend)
- Refresh token: JWT, 7 days, signed with `JWT_REFRESH_SECRET`, sent as httpOnly + Secure + SameSite=Strict cookie, SHA-256 hash stored in User document

---

### 4.2 User Module

**Routes (`routes/userRoutes.js`)**
```
GET    /api/users/me               → getMe
PATCH  /api/users/me               → updateMe
```
All routes use `authenticate` middleware.

**Controller (`controllers/userController.js`)**  
Thin — parse req.user from middleware, call userService, respond.

**Service** — not needed as a separate file; keep user profile logic in userController for now since it's simple read/update operations.

---

### 4.3 Project Module

**Routes (`routes/projectRoutes.js`)**
```
GET    /api/projects               → getAllProjects
POST   /api/projects               → createProject
GET    /api/projects/:id           → getProject
PATCH  /api/projects/:id           → updateProject
DELETE /api/projects/:id           → deleteProject
POST   /api/projects/:id/generate  → triggerGeneration
```
All routes: `authenticate`. POST /: also `validateRequest(createProjectSchema)`.

**Controller (`controllers/projectController.js`)**  
Thin — call projectService, return result.

**Service (`services/projectService.js`)**
- `getUserProjects(userId)` → find all non-archived projects for user
- `createProject(userId, data)` → check subscription project limit → create project with status: 'draft'
- `getProjectById(projectId, userId)` → find + ownership check
- `updateProject(projectId, userId, data)` → ownership check → update
- `deleteProject(projectId, userId)` → ownership check → soft delete (isArchived: true)
- `triggerGeneration(projectId, userId)` → set status: 'generating' → call documentService.generateAll()

**Validation Schema (Joi)**  
`createProjectSchema`: title (string, 3-120), projectType (enum), wizardAnswers (object with all 7 required fields)

---

### 4.4 Document Module

**Routes (`routes/documentRoutes.js`)**
```
GET    /api/projects/:projectId/documents        → getProjectDocuments
GET    /api/projects/:projectId/documents/:type  → getSingleDocument
PATCH  /api/projects/:projectId/documents/:type  → updateDocument (Pro only)
```
All routes: `authenticate`.  
PATCH: also `checkSubscription(['pro', 'team'])`.

**Controller (`controllers/documentController.js`)**  
Thin — call documentService, return result.

**Service (`services/documentService.js`)**
- `getDocumentsByProject(projectId, userId)` → ownership check via project → return docs
- `getSingleDocument(projectId, docType, userId)` → ownership check → return doc
- `updateDocument(projectId, docType, userId, content)` → ownership + subscription check → update, bump version
- `generateAll(projectId, userId)` → run 9 prompts in dependency order via AIService → save each → update project.docsGenerated → set project.status: 'complete' or 'error'

**Generation Dependency Order**
1. prd (no deps)
2. srd (deps: prd)
3. techStack (deps: prd, srd)
4. dbSchema (deps: prd, techStack)
5. userFlows (deps: prd, srd)
6. mvpPlan (deps: prd, srd, techStack)
7. folderStructure (deps: techStack)
8. claudeContext (deps: all above)
9. agentSystemPrompt (deps: all above)

---

### 4.5 Subscription Module

**Routes (`routes/subscriptionRoutes.js`)**
```
GET    /api/subscriptions/me              → getMySubscription
POST   /api/subscriptions/checkout        → createCheckout
POST   /api/subscriptions/webhook         → handleWebhook (raw body, no auth middleware)
```

**Controller (`controllers/subscriptionController.js`)**  
Thin — call subscriptionService / stripeService, return result.

**Service (`services/subscriptionService.js`)**
- `getUserSubscription(userId)` → return subscription doc
- `checkProjectLimit(userId)` → get sub → count projects → compare to limit
- `upgradePlan(userId, stripeData)` → update subscription in DB

**Stripe Service (`services/stripeService.js`)**
- `createCheckoutSession(userId, email, plan)` → create Stripe session with metadata
- `handleWebhookEvent(payload, signature)` → verify signature → switch on event type → call subscriptionService

**Webhook Events to Handle**
- `checkout.session.completed` → upgrade subscription in DB
- `customer.subscription.deleted` → downgrade to free
- `invoice.payment_failed` → set status: 'past_due'

---

### 4.6 Notification Module

**Routes (`routes/notificationRoutes.js`)**
```
GET    /api/notifications          → getNotifications
PATCH  /api/notifications/:id/read → markRead
```
All routes: `authenticate`.

**Service (`services/notificationService.js`)**
- `createNotification(userId, type, title, message, metadata)` → called internally by other services
- `getUserNotifications(userId)` → return unread + last 20 read
- `markAsRead(notificationId, userId)` → ownership check → set isRead: true

---

## 5. Database Models

### User.js
```
_id              ObjectId
email            String, unique, required, lowercase, trim
passwordHash     String (required if !googleId)
googleId         String, sparse index
displayName      String, 2-80 chars, required
avatarUrl        String
role             Enum: ['user', 'admin'], default: 'user'
isVerified       Boolean, default: false
refreshTokenHash String
refreshTokenExpiry Date
createdAt        Date (timestamps: true)
updatedAt        Date (timestamps: true)

Indexes: { email: 1 } unique, { googleId: 1 } sparse
```

### Subscription.js
```
_id                    ObjectId
userId                 ObjectId, ref: User, required, unique
plan                   Enum: ['free', 'pro', 'team'], default: 'free'
status                 Enum: ['active', 'canceled', 'past_due', 'trialing'], default: 'active'
stripeCustomerId       String
stripeSubscriptionId   String
currentPeriodStart     Date
currentPeriodEnd       Date
projectLimit           Number, default: 1

Indexes: { userId: 1 } unique
```

### Project.js
```
_id            ObjectId
userId         ObjectId, ref: User, required
title          String, 3-120 chars, required
projectType    Enum: ['saas', 'mobile', 'ai', 'ecommerce', 'marketplace', 'other']
status         Enum: ['draft', 'generating', 'complete', 'error'], default: 'draft'
wizardAnswers  Object {
  problemStatement   String
  targetAudience     String
  coreFeatures       [String]
  techPreferences    String
  monetizationModel  String
  scaleExpectation   String
  additionalContext  String
}
docsGenerated  [String]
kanbanColumns  [Object] (columns with task arrays)
milestones     [Object] (title, dueDate, isComplete)
isArchived     Boolean, default: false
createdAt      Date
updatedAt      Date

Indexes: { userId: 1, createdAt: -1 }, { userId: 1, status: 1 }, { userId: 1, isArchived: 1 }
```

### Document.js
```
_id               ObjectId
projectId         ObjectId, ref: Project, required
userId            ObjectId, ref: User, required
docType           Enum: ['prd','srd','techStack','dbSchema','userFlows','mvpPlan','folderStructure','claudeContext','agentSystemPrompt']
version           Number, default: 1
content           String (markdown)
contentTokenCount Number
modelUsed         String
generationTimeMs  Number
createdAt         Date
updatedAt         Date

Indexes: { projectId: 1, docType: 1 } unique, { userId: 1, projectId: 1 }
```

### Notification.js
```
_id       ObjectId
userId    ObjectId, ref: User, required
type      Enum: ['doc_ready', 'generation_failed', 'plan_upgraded', 'milestone_due', 'system']
title     String, required
message   String, required
isRead    Boolean, default: false
metadata  Object { projectId: ObjectId, docType: String }
createdAt Date

Indexes: { userId: 1, isRead: 1 }, { userId: 1, createdAt: -1 }
```

---

## 6. Security Architecture

### Middleware Stack

**`middleware/authenticate.js`**  
Reads `Authorization: Bearer <token>` header → verifies JWT with access secret → attaches `req.user = { id, role }` → calls next(). Throws 401 if missing or invalid.

**`middleware/authorizeAdmin.js`**  
Reads `req.user.role` → throws 403 if not 'admin'.

**`middleware/validateRequest.js`**  
Takes a Joi schema → validates `req.body` → throws 400 with validation errors if invalid → calls next() on success.

**`middleware/rateLimiter.js`**  
Export two configs:
- `authLimiter`: 5 requests per 15 minutes per IP (for /auth routes)
- `apiLimiter`: 100 requests per 15 minutes per IP (for all other routes)

**`middleware/errorHandler.js`**  
Global Express error handler. All errors go through here. Returns:
```json
{ "success": false, "error": "message", "code": "ERROR_CODE" }
```
Success responses always: `{ "success": true, "data": {} }`

**`utils/AppError.js`**  
Custom error class: `new AppError('message', statusCode, 'ERROR_CODE')`. Caught by errorHandler.

**`utils/asyncWrapper.js`**  
Wraps async route handlers to forward errors to errorHandler: `(fn) => (req, res, next) => fn(req, res, next).catch(next)`

**`utils/tokenUtils.js`**  
- `generateAccessToken(userId, role)` → sign JWT, 15min
- `generateRefreshToken(userId)` → sign JWT, 7 days
- `verifyAccessToken(token)` → verify + decode
- `verifyRefreshToken(token)` → verify + decode
- `hashToken(token)` → SHA-256 hash (for storing refresh token in DB)

### Security Rules
- CORS: only allow frontend origin from env var, not wildcard
- Helmet: enabled in all environments
- Stripe webhook: raw body parser on webhook route only, verify signature before processing
- No console.log in production (use a proper logger or suppress)
- All async handlers wrapped in asyncWrapper — no unhandled promise rejections

---

## 7. AI Generation Pipeline

### AIService.js — Fallback Cascade

4-level fallback, tried in order:
1. NVIDIA NIM — meta/llama-3.1-405b-instruct
2. OpenRouter — meta-llama/llama-3.1-405b
3. OpenRouter — meta-llama/llama-3.1-70b
4. NVIDIA NIM — nvidia/nemotron-4-340b-instruct

If all 4 fail → throw AppError with type 'generation_failed' → notificationService creates failure notification.

**AIService.js exports:**
- `generateText(prompt, docType)` → tries each provider in order → returns `{ content, modelUsed, generationTimeMs }`
- `buildHeaders(provider)` → returns correct auth headers per provider
- `callProvider(provider, prompt)` → makes axios call to that provider

### Prompt Builders (`prompts/`)

Each file exports a single function: `buildXxxPrompt(wizardAnswers, previousDocs)`.  
- `wizardAnswers`: the full project wizard object
- `previousDocs`: object of already-generated docs `{ prd: '...', srd: '...', ... }`  
- Returns: a string prompt ready to send to AI

Each prompt must instruct the AI to return only raw markdown, no preamble, no code fences around the entire response.

### Generation Flow in documentService.generateAll()

```
1. Fetch project (ownership check)
2. Set project.status = 'generating'
3. Run docs in dependency order (see section 4.4)
4. For each doc:
   a. Build prompt with buildXxxPrompt(wizardAnswers, generatedSoFar)
   b. Call AIService.generateText(prompt, docType)
   c. Save Document to DB (upsert by projectId + docType)
   d. Push docType to generatedSoFar
   e. Push docType to project.docsGenerated
5. If all 9 succeed: project.status = 'complete', create doc_ready notification
6. If any fail: project.status = 'error', create generation_failed notification
7. Save project
```

---

## 8. Stripe Integration

### Checkout Flow
1. Frontend calls `POST /api/subscriptions/checkout` with `{ plan: 'pro' }`
2. stripeService creates Stripe Checkout Session with:
   - `customer_email`: from req.user
   - `metadata.userId`: req.user.id
   - `metadata.plan`: requested plan
   - `success_url`, `cancel_url` from env
3. Return `{ url: session.url }` → frontend redirects

### Webhook Flow
1. Stripe calls `POST /api/subscriptions/webhook` with raw body
2. Verify signature with `stripe.webhooks.constructEvent()`
3. On `checkout.session.completed`:
   - Get userId from `session.metadata.userId`
   - Update Subscription: plan, status: 'active', stripeIds, period dates, new projectLimit
4. On `customer.subscription.deleted`:
   - Find sub by stripeSubscriptionId → reset to free plan
5. On `invoice.payment_failed`:
   - Find sub → set status: 'past_due'

---

## 9. Sprint Plan

### Sprint 1 — Cleanup + Foundation
**Goal:** Working auth with proper security, correct models, safe server

Tasks (in order):
1. Delete all files listed in Section 2
2. Rebuild `models/User.js` per Section 5
3. Create `models/Subscription.js` per Section 5
4. Create `models/Project.js` per Section 5
5. Rebuild `models/Document.js` per Section 5
6. Create `models/Notification.js` per Section 5
7. Create `utils/AppError.js`
8. Create `utils/asyncWrapper.js`
9. Create `utils/tokenUtils.js`
10. Create `middleware/errorHandler.js`
11. Create `middleware/rateLimiter.js`
12. Create `middleware/validateRequest.js`
13. Create `middleware/authenticate.js` (replaces old authMiddleware.js, delete old file)
14. Rebuild `services/authService.js`
15. Rebuild `controllers/authController.js` (thin, calls service)
16. Rebuild `routes/authRoutes.js`
17. Update `config/passport.js` for Google OAuth
18. Update `server.js` — add helmet, proper CORS, rate limiters, error handler, clean up routes
19. Create `.env.example`
20. Test: register, login, refresh, logout all working with httpOnly cookies

**Deliverable:** Secure auth system, correct DB models, no temp code anywhere.

---

### Sprint 2 — Project + User Modules
**Goal:** Full project CRUD with subscription limit enforcement

Tasks (in order):
1. Create `services/subscriptionService.js` (getUserSubscription, checkProjectLimit)
2. Create `models/Subscription.js` auto-creation hook in authService on register
3. Create `controllers/userController.js` (getMe, updateMe)
4. Create `routes/userRoutes.js`
5. Create `services/projectService.js` (all CRUD methods per Section 4.3)
6. Create `controllers/projectController.js`
7. Create `routes/projectRoutes.js`
8. Add `checkSubscription` middleware to project create route
9. Test: create project (limit enforced), read, update, soft-delete

**Deliverable:** Project module complete, subscription limits enforced.

---

### Sprint 3 — AI Generation Pipeline
**Goal:** Full 9-doc generation working end-to-end

Tasks (in order):
1. Create `services/AIService.js` with 4-level fallback cascade
2. Create all 9 prompt files in `prompts/` folder
3. Create `services/documentService.js` (generateAll + fetch methods)
4. Create `controllers/documentController.js`
5. Create `routes/documentRoutes.js`
6. Wire `POST /api/projects/:id/generate` to `projectService.triggerGeneration`
7. Test: trigger generation, verify all 9 docs created in DB with correct fields

**Deliverable:** Generation pipeline working, docs saved to DB correctly.

---

### Sprint 4 — Subscriptions + Stripe
**Goal:** Full Stripe flow, plan upgrades reflected in DB

Tasks (in order):
1. Create `services/stripeService.js` (checkout session, webhook handler)
2. Create `controllers/subscriptionController.js`
3. Create `routes/subscriptionRoutes.js`
4. Wire webhook with raw body parser
5. Test: checkout session created, webhook updates DB, plan limits change

**Deliverable:** Stripe working, subscriptions managed correctly.

---

### Sprint 5 — Notifications + Polish
**Goal:** Notifications wired into generation flow, production-ready server

Tasks (in order):
1. Create `services/notificationService.js`
2. Create `controllers/notificationController.js`
3. Create `routes/notificationRoutes.js`
4. Wire notification creation into documentService (success + failure)
5. Wire notification creation into stripeService (plan_upgraded)
6. Create `ecosystem.config.js` for PM2
7. Full security audit: verify no open routes, no hardcoded secrets, CORS correct
8. Create `middleware/authorizeAdmin.js`

**Deliverable:** Fully functional backend, production-ready.

---

## 10. Environment Variables

All these must be in `.env` and documented in `.env.example`:

```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

MONGODB_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

NVIDIA_API_KEY=
OPENROUTER_API_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_TEAM_PRICE_ID=
STRIPE_SUCCESS_URL=http://localhost:5173/dashboard?upgrade=success
STRIPE_CANCEL_URL=http://localhost:5173/pricing
```

---

## 11. Agent Instructions Per Sprint

Use these prompts verbatim when assigning work to the coding agent.

### Sprint 1 Prompt for Agent:
```
You are working on AiDocs backend. Follow AIDOCS_MASTER_PLAN.md Sprint 1 exactly.

RULES:
- No comments in any code file
- Each file must do exactly one thing
- No file should exceed 120 lines
- Never put business logic in a controller
- All async handlers must use asyncWrapper utility
- All errors must use AppError class
- Responses always follow format: { success: true, data: {} } or { success: false, error: '', code: '' }

START by deleting all files in Section 2 of the master plan.
THEN build in the exact order listed in Sprint 1.
After finishing, update the Completion Tracker section of AIDOCS_MASTER_PLAN.md.
```

### Sprint 2 Prompt for Agent:
```
You are working on AiDocs backend. Sprint 1 is complete. Follow Sprint 2 in AIDOCS_MASTER_PLAN.md.

RULES (same as Sprint 1):
- No comments, thin controllers, asyncWrapper on all handlers, AppError for all errors
- subscriptionService.checkProjectLimit must be called BEFORE project creation
- All project queries must filter by userId — never return another user's data
- Soft delete only (isArchived: true) — never hard delete projects

After finishing, update the Completion Tracker section of AIDOCS_MASTER_PLAN.md.
```

### Sprint 3 Prompt for Agent:
```
You are working on AiDocs backend. Sprints 1-2 are complete. Follow Sprint 3 in AIDOCS_MASTER_PLAN.md.

RULES:
- AIService.js must implement the exact 4-level fallback in the order specified
- Each prompt builder is a pure function — takes wizardAnswers + previousDocs, returns string
- documentService.generateAll must run docs in the dependency order from Section 7
- On generation failure: update project.status to 'error', create failure notification, throw AppError
- Documents must be upserted (not inserted) — re-generation must replace, not duplicate

After finishing, update the Completion Tracker section of AIDOCS_MASTER_PLAN.md.
```

### Sprint 4 Prompt for Agent:
```
You are working on AiDocs backend. Sprints 1-3 are complete. Follow Sprint 4 in AIDOCS_MASTER_PLAN.md.

RULES:
- Webhook route must use express.raw() body parser, NOT express.json()
- Always verify Stripe signature before processing any webhook event
- Subscription updates must be idempotent — running same webhook twice must produce same result
- Never store full card data — Stripe handles that
- stripeService and subscriptionService must be separate files

After finishing, update the Completion Tracker section of AIDOCS_MASTER_PLAN.md.
```

---

## 12. Completion Tracker

### Sprint 1 — Cleanup + Foundation
- [x] All temp files deleted
- [x] All 5 models rebuilt
- [x] Utils created (AppError, asyncWrapper, tokenUtils)
- [x] All middleware created
- [x] Auth service + controller + routes rebuilt
- [x] server.js updated (helmet, CORS, rate limit, error handler)
- [x] .env.example created
- [x] Auth tested (register, login, refresh, logout)

### Sprint 2 — Project + User Modules
- [x] subscriptionService created
- [x] User controller + routes created
- [x] projectService created
- [x] Project controller + routes created
- [x] Subscription limit enforced on project create
- [x] Project CRUD tested

### Sprint 3 — AI Generation Pipeline
- [x] AIService created with 4-level fallback
- [x] All 9 prompt builders created
- [x] documentService created
- [x] Document controller + routes created
- [x] Generation tested end-to-end (NVIDIA + OpenRouter cascade)

### Sprint 4 — Subscriptions + Stripe
- [x] stripeService created
- [x] subscriptionController + routes created
- [x] Webhook wired with raw body parser
- [x] Stripe flow tested (Checkout Session redirection)

### Sprint 5 — Notifications + Polish
- [x] notificationService created
- [x] Notification controller + routes created
- [x] Notifications wired into generation flow
- [x] ecosystem.config.js created
- [x] Security audit passed

### Sprint 6 — Testing + Firebase Google Auth + Cloudinary ← CURRENT
- [x] All existing endpoints tested (register, login, refresh, logout)
- [x] All project CRUD endpoints tested
- [x] Document fetch endpoints tested (implicitly via CRUD tests)
- [x] Subscription endpoints tested
- [x] Notification endpoints tested
- [x] Firebase Admin SDK installed and configured (config/firebase.js)
- [x] Old passport.js Google OAuth removed
- [x] Firebase token verification middleware created (middleware/verifyFirebaseToken.js)
- [x] Google auth endpoint working (POST /api/auth/google)
- [x] User model updated for Firebase UID field
- [x] Cloudinary SDK installed and configured (config/cloudinary.js)
- [x] cloudinaryService.js created (upload, delete)
- [x] uploadMiddleware.js created (multer + cloudinary)
- [x] User avatar upload endpoint added (PATCH /api/users/me/avatar)
- [x] User model avatarUrl saved as Cloudinary URL
- [x] .env.example updated with Firebase + Cloudinary vars

### Sprint 7 — Frontend Auth Connection
- [x] Firebase and Axios dependencies installed
- [x] Frontend variables added (.env, .env.example)
- [x] Services Layer Rebuilt (api.js, authService.js, userService.js, firebase.js)
- [x] AuthContext Rebuilt with memory-based token logic
- [x] Login and Register Pages Rebuilt with glass-theme and video background
- [x] PrivateRoute and AppRoutes configured
- [x] Navbar updated to reflect auth state

### Sprint 8 — Dashboard & Project Creation
- [x] Project and Document services implemented
- [x] Dashboard page with real data fetching created
- [x] ProjectCard and EmptyState components created
- [x] 7-Step Project Creation Wizard implemented
- [x] AI Generation polling logic added to ProjectDetail
- [x] AppRoutes updated with new project routes
- [x] End-to-end frontend-backend connectivity verified
- [x] Wizard refactored into 7 separate step components with Shell-Step architecture

### Sprint 9 — Security Cleanup & Component Refactoring
- [x] Memory-only token state implemented (XSS mitigation)
- [x] Google Auth switched to popup (zero-state-loss flow)
- [x] Native redirect auth logic removed
- [x] Dead code/files deleted (wizard steps, duplicates)
- [x] Landing page refactored (split into sub-components)
- [x] BiomeMenu refactored (split into sub-components)
- [x] AuthContext refactored (reducer extraction)
- [x] Navbar dead routes fixed (/documents → /dashboard)

### Sprint 10 — Final Polish & Constraints Compliance
- [x] Refactored large components to strictly meet 80-line max limit (Navbar, TopPanel, Dashboard, Pricing)
- [x] Extracted components into sensible sub-files and used constants (e.g., pricing plans)
- [x] Migrated auth to memory-only token storage (No localStorage)
- [x] Restored correct pricing values ($19/month for Pro, $49/month for Team)
- [x] NotificationBell component in navbar
- [x] NotificationDropdown with mark-as-read
- [x] NotificationItem with type icons
- [x] Pro-only ZIP download button in ProjectHeader
- [x] /pricing route added with glass theme cards
- [x] Replaced Google Auth redirect with signInWithPopup
- [x] Backend `archiver` integration for ZIP generation
- [x] Subscriptions service updated with Stripe limits logic
- [x] Global apiLimiter implemented on all /api routes
- [x] Multi-format Document Export ready for Pro accounts
- [x] Security Audit Fixes (Salt rounds 12, real limit checks, AI delay, Rate limiting)

### Sprint 11 — Kanban Workspace
- [x] @hello-pangea/dnd installed
- [x] projectService.js updated (updateKanban added)
- [x] Workspace.jsx created (layout, state, drag handlers, save logic)
- [x] KanbanBoard.jsx created (DragDropContext wrapper)
- [x] KanbanColumn.jsx created (Droppable, editable title, task count)
- [x] KanbanCard.jsx created (Draggable, delete on hover)
- [x] AddTaskInput.jsx created (inline input, Ctrl+Enter submit)
- [x] AddColumnButton.jsx created (glass card, plus icon)
- [x] AppRoutes.jsx updated (/projects/:id/workspace route added)
- [x] ProjectHeader.jsx updated (Workspace button added)
- [x] Committed and pushed to GitHub
|
### Sprint 12 — Bug Fixes + AI Chat + Document Export
- [x] Backend projectLimit upgrade logic fixed (subscriptionService)
- [x] SubscriptionBanner updated (dynamic usage/limit display)
- [x] AI Chat Backend implemented (AIService.generateChat, chatService, routes)
- [x] AI Chat Frontend implemented (ProjectChat, Glass Chat UI)
- [x] AI Chat Project-Context awareness added (backend context injection)
- [x] Document Export Backend implemented (ZIP via archiver, PDF via Styled HTML, Word via docx)
- [x] Document Export Frontend integrated (Download All, PDF/Word per doc)
- [x] Pro-only Access Control (Backend and Frontend gates)
- [x] Adhered to 80-line component limit (Refactored ProjectHeader)
- [x] ADOCS_MASTER_PLAN.md updated
- [x] Pushed to GitHub

| - [x] Free tier limit increased (1 → 3 projects)
| - [x] Pro price updated ($19 → $5)
| - [x] Team price updated ($49 → $10)
| - [x] Backend defaults updated (Subscription model & services)
| - [x] Back buttons added (Profile, Pricing, Workspace)
| - [x] Cancel button added (Create Project Wizard)
| - [x] Navbar updated (Pricing link for auth users)
| - [x] GeneratingState updated (Back to Dashboard button)
| - [x] Glass Modal system implemented (`ConfirmModal`, `AlertModal`, `useModal`)
| - [x] Native dialogs (`alert`, `confirm`) replaced across frontend
| - [x] Sprint complete and documentation updated
| ### Sprint 13 — Production Stability & Password Reset
- [x] Vercel deployment overhaul (SPA redirect fix)
- [x] CORS fixed (dynamic origin validation)
- [x] Cross-origin cookies fixed (sameSite: 'none', secure: true)
- [x] Nodemailer integrated (real SMTP emails)
- [x] Secure password reset flow (SHA-256 hashed tokens)
- [x] Forgot password interface (real API connection)
- [x] Reset password interface (token validation, password confirmation)
- [x] VERCEL_ENV_SETUP.md and EMAIL_SETUP.md created
- [x] Sprint 13 completion tracked and documentation updated
| ### Sprint 14 — Avatar System & User Experience
- [x] Backend: Google login auto-syncs avatarUrl
- [x] Backend: Cloudinary optimized upload stream implemented
- [x] Backend: Avatar upload standardized (overwrite current, aidocs/avatars folder)
- [x] Frontend: Reusable UserAvatar component (sm/md/lg/xl, initials fallback)
- [x] Frontend: UserAvatar integrated into ProfileCard with upload overlay
- [x] Frontend: UserAvatar integrated into Navbar (clickable shortcut)
- [x] Frontend: UserAvatar integrated into Dashboard Header
- [x] UX: Profile upload loading state and silent failure handling
- [x] Sprint 14 documentation updated and pushed
|
| ### Sprint 15 — Wizard AI Suggestions
- [x] Backend: Created suggestionController with prompt construction for all wizard fields
- [x] Backend: Created suggestionRoutes and mounted on server `/api/suggestions`
- [x] Frontend: Created suggestionService and useSuggestions custom hook
- [x] Frontend: SuggestionPills reusable UI component implemented
- [x] Frontend: Integrated Real-time AI suggestions across Wizard Steps 1, 2, and 3
- [x] Tested debouncing and context-aware suggestions across all text inputs

---

## 13. Sprint 6 — Testing + Firebase Google Auth + Cloudinary

### 13.1 — API Testing (Do First)

Agent must test every existing endpoint using a REST client (curl or equivalent) and confirm each returns the correct `{ success, data }` or `{ success, error, code }` envelope.

**Auth endpoints to test:**
```
POST /api/auth/register      → { success: true, data: { accessToken, user } }
POST /api/auth/login         → { success: true, data: { accessToken, user } }, refresh cookie set
POST /api/auth/refresh       → { success: true, data: { accessToken } }, new refresh cookie set
POST /api/auth/logout        → { success: true, data: null }, cookie cleared, DB refreshTokenHash cleared
```

**User endpoints to test:**
```
GET  /api/users/me           → { success: true, data: { user } }  (requires Bearer token)
PATCH /api/users/me          → { success: true, data: { user } }  (requires Bearer token)
```

**Project endpoints to test:**
```
POST /api/projects           → { success: true, data: { project } }
GET  /api/projects           → { success: true, data: { projects: [] } }
GET  /api/projects/:id       → { success: true, data: { project } }
PATCH /api/projects/:id      → { success: true, data: { project } }
DELETE /api/projects/:id     → { success: true, data: null }
```

**Document endpoints to test:**
```
GET /api/projects/:id/documents          → { success: true, data: { documents: [] } }
GET /api/projects/:id/documents/:type    → { success: true, data: { document } }
```

**Subscription endpoints to test:**
```
GET /api/subscriptions/me    → { success: true, data: { subscription } }
```

**Notification endpoints to test:**
```
GET /api/notifications       → { success: true, data: { notifications: [] } }
```

For each test:
- Confirm correct HTTP status code (200, 201, 400, 401, 403, 404)
- Confirm response envelope is correct
- Confirm auth-protected routes reject requests without token (401)
- Confirm ownership — user A cannot access user B's project (404)
- After each test, update Sprint 6 tracker

---

### 13.2 — Replace Google OAuth with Firebase Auth

**Why Firebase instead of Passport Google OAuth:**
- No callback URL needed — frontend handles Google sign-in popup
- Firebase gives us a verified ID token — backend just verifies it
- Simpler setup, no redirect flows, works perfectly with SPA

**How it works:**
1. Frontend: user clicks "Sign in with Google" → Firebase JS SDK handles popup → Firebase returns `idToken`
2. Frontend: sends `idToken` to `POST /api/auth/google`
3. Backend: verifies `idToken` using Firebase Admin SDK
4. Backend: extracts email, name, photo, uid from decoded token
5. Backend: upserts User in MongoDB by `firebaseUid`
6. Backend: creates Subscription (free) if new user
7. Backend: issues own JWT access token + refresh token (same as email auth)
8. Backend: returns `{ accessToken, user }` with httpOnly refresh cookie

**Files to create/modify:**

`config/firebase.js`
- Import firebase-admin
- Initialize app with service account credentials from env vars
- Export `admin.auth()` for token verification

`middleware/verifyFirebaseToken.js`
- Reads `idToken` from `req.body.idToken`
- Calls `admin.auth().verifyIdToken(idToken)`
- Attaches decoded token to `req.firebaseUser = { uid, email, name, picture }`
- Throws 401 AppError if token is invalid or expired

`services/authService.js` — add method:
- `handleFirebaseGoogleUser(firebaseUser)` → find or create User by firebaseUid → create Subscription if new → return { accessToken, refreshToken, user }

`controllers/authController.js` — add handler:
- `googleFirebaseAuth(req, res)` → calls `authService.handleFirebaseGoogleUser(req.firebaseUser)` → sets refresh cookie → returns accessToken + user

`routes/authRoutes.js` — add route:
```
POST /api/auth/google   → verifyFirebaseToken middleware → googleFirebaseAuth controller
```

**Remove:**
- `config/passport.js` — delete entire file
- Any passport-related imports in server.js
- `passport` npm package (run npm uninstall passport passport-google-oauth20)

**User model update:**
Add field: `firebaseUid` (String, sparse index, replaces googleId field)
Remove field: `googleId` — replace with `firebaseUid` everywhere

**Install:**
```
npm install firebase-admin
```

**Environment variables to add to .env.example:**
```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```
Note: `FIREBASE_PRIVATE_KEY` must be wrapped in quotes in .env because it contains newlines. In code, use: `process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')`

**How owner gets credentials:**
- Go to Firebase Console → Project Settings → Service Accounts → Generate New Private Key
- Download JSON file
- Copy `project_id` → FIREBASE_PROJECT_ID
- Copy `client_email` → FIREBASE_CLIENT_EMAIL
- Copy `private_key` → FIREBASE_PRIVATE_KEY (the full string including `-----BEGIN...`)

---

### 13.3 — Cloudinary Image Upload

**Architecture:**
- Images are uploaded to Cloudinary via the backend (never directly from frontend)
- Cloudinary URL is stored in MongoDB as `user.avatarUrl`
- Frontend always reads avatar from `user.avatarUrl` — never manages image files

**Files to create:**

`config/cloudinary.js`
- Import cloudinary v2
- Configure with CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET from env
- Export configured cloudinary instance

`services/cloudinaryService.js`
- `uploadImage(fileBuffer, folder, publicId)` → upload buffer to cloudinary → return `{ url, publicId }`
- `deleteImage(publicId)` → delete from cloudinary by publicId
- Folder for user avatars: `aidocs/avatars`

`middleware/uploadMiddleware.js`
- Use `multer` with `memoryStorage()` (store in memory, not disk)
- Accept single image field named `avatar`
- Max file size: 2MB
- Allowed MIME types: image/jpeg, image/png, image/webp
- Export as `uploadAvatar` middleware

`controllers/userController.js` — add handler:
- `uploadAvatar(req, res)` → takes `req.file.buffer` → calls cloudinaryService.uploadImage → updates user.avatarUrl in DB → returns updated user

`routes/userRoutes.js` — add route:
```
PATCH /api/users/me/avatar   → authenticate → uploadAvatar middleware → uploadAvatar controller
```

**Install:**
```
npm install cloudinary multer
```

**Environment variables to add to .env.example:**
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**How owner gets credentials:**
- Go to cloudinary.com → Dashboard
- Copy Cloud Name, API Key, API Secret directly from dashboard

---

## 14. Agent Prompt — Sprint 6

Use this prompt verbatim:

```
You are working on AiDocs backend. Sprints 1-5 are marked complete in AIDOCS_MASTER_PLAN.md. Now execute Sprint 6 in order.

PART 1 — TESTING (do first):
Test every endpoint listed in Section 13.1 of AIDOCS_MASTER_PLAN.md.
For each endpoint: confirm response envelope, correct HTTP status, auth rejection on missing token, ownership enforcement.
Fix any bugs you find before moving to Part 2.
Do NOT proceed to Part 2 until all tests in Part 1 pass.

PART 2 — FIREBASE GOOGLE AUTH:
Follow Section 13.2 exactly.
1. npm uninstall passport passport-google-oauth20
2. npm install firebase-admin
3. Delete config/passport.js
4. Remove all passport imports from server.js
5. Create config/firebase.js
6. Create middleware/verifyFirebaseToken.js
7. Update User model: rename googleId → firebaseUid, add sparse index
8. Add handleFirebaseGoogleUser method to authService.js
9. Add googleFirebaseAuth handler to authController.js
10. Add POST /api/auth/google route to authRoutes.js
11. Update .env.example with Firebase vars

PART 3 — CLOUDINARY:
Follow Section 13.3 exactly.
1. npm install cloudinary multer
2. Create config/cloudinary.js
3. Create services/cloudinaryService.js
4. Create middleware/uploadMiddleware.js
5. Add uploadAvatar handler to userController.js
6. Add PATCH /api/users/me/avatar route to userRoutes.js
7. Update .env.example with Cloudinary vars

RULES (always):
- No comments in any code file
- No file over 120 lines
- All async handlers use asyncWrapper
- All errors use AppError
- Response format: { success: true, data: {} } or { success: false, error: '', code: '' }
- Never put business logic in a controller
- multer uses memoryStorage — never write files to disk

After finishing ALL three parts, update Section 12 Sprint 6 tracker in AIDOCS_MASTER_PLAN.md, marking each completed item.
```

---

*This document is the single source of truth for all backend work. Version 2.0 reflects Sprints 1-5 complete, Sprint 6 in progress.*

---

## Sprint 14 — Skills System + ZIP Structure + Project Scaffolding
**Status:** ✅ Complete  
**Date:** 2026-04-18

### What Was Built

The ZIP export system was completely overhauled to produce a 3-folder structure for Pro users:

```
{slug}-docs/          ← all 9 generated .md documents
{slug}-skills/        ← AI agent skill guides
{slug}-project/       ← pre-configured boilerplate code scaffold
```

### Completion Tracker

- [x] `backend/data/skills/` folder created with all skill .md files
- [x] `backend/data/templates/` folder created with all templates
- [x] `exportService.js` generateZip rewritten (3-folder structure)
- [x] Slug generation working (title → safe folder name via `toSlug()`)
- [x] Docs folder: all available docs as .md files ✓
- [x] Skills folder: SKILLS_README.md + 3 default skills always bundled ✓
- [x] Project-type skills: saas/ecommerce/marketplace → docx+pdf; mobile → mobile; ai → claude-api ✓
- [x] Project folder: correct scaffold structure per projectType ✓
- [x] Template substitution working ({title}, {Project Title}, {project-name} replaced) ✓
- [x] MERN template: package.json valid JSON ✓
- [x] Flutter template: pubspec.yaml valid YAML ✓
- [x] Python template: requirements.txt included ✓
- [x] generatePdf and generateWord unchanged ✓
- [x] AIDOCS_MASTER_PLAN.md updated ✓

### Files Created/Modified
| File | Action |
|------|--------|
| `backend/data/skills/frontend-design.md` | Created |
| `backend/data/skills/skill-creator.md` | Created |
| `backend/data/skills/find-skills.md` | Created |
| `backend/data/skills/docx.md` | Created |
| `backend/data/skills/pdf.md` | Created |
| `backend/data/skills/mobile.md` | Created |
| `backend/data/skills/claude-api.md` | Created |
| `backend/data/templates/skills-readme.md` | Created |
| `backend/data/templates/mern-backend-package.json` | Created |
| `backend/data/templates/vite-frontend-package.json` | Created |
| `backend/data/templates/flutter-pubspec.yaml` | Created |
| `backend/data/templates/python-requirements.txt` | Created |
| `backend/data/templates/project-readme.md` | Created |
| `backend/services/exportService.js` | Rewritten (generateZip only) |

---

## Skills UI and Setup Updates
*   **Backend:**
    *   Created `backend/controllers/skillsController.js` and `backend/routes/skillsRoutes.js` for fetching project-specific AI skills natively with hardcoded configurations.
    *   Added routing bindings directly inside `server.js`.
    *   `backend/prompts/agentSystemPrompt.js` was improved heavily: appended a new `Agent Setup Order` block directly inside every AI assistant system prompt with `npx skills add` execution, explicitly outlining `Step 1 — Install Skills`, `Step 2 — Scaffold Project with Commands`, `Step 3 — Read Documentation in Order`, and `Step 4 — Build`.
    *   `backend/data/templates/project-readme.md` updated entirely with scaffolding commands and `npx skills add` step-by-step instructions.

*   **Frontend:**
    *   Created `frontend/src/services/skillsService.js` to asynchronously fetch skills metadata.
    *   Created `frontend/src/components/project/SkillsList.jsx` holding full UI matching the exact specifications (liquid-glass card styled with copy buttons parsing lucide-react).
    *   `frontend/src/components/project/DocsList.jsx` updated to render a divider + `<SkillsList projectId={projectId} />`.
    *   `frontend/src/pages/ProjectDetail.jsx` passed down the necessary `projectId={id}` property ensuring everything links perfectly to dynamic states.

*Status: Implemented & Confirmed.*
