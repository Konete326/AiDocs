# AiDocs Global API Documentation 🚀

Standardized response format across the app:
\`\`\`json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "error": "Message", "code": "ERR_CODE" }
\`\`\`

---

## **Auth** (\`/api/auth\`) 
Controls JWT distribution and OAuth redirects.
- \`POST /register\` — Requires email, password, and displayName. Returns token payload.
- \`POST /login\` — Establishes valid session mapped via email/password.
- \`POST /logout\` — Forces flushing of HTTP cookies remotely.
- \`POST /refresh\` — Re-acquires fresh access token exchanging HTTP-only refresh payloads.

---

## **Users** (\`/api/users\`)
Profile management operations.
- \`GET /me\` — Returns user metrics & attached active scopes.
- \`PATCH /me\` — Modify UI-friendly properties (e.g. \`displayName\`, \`avatarUrl\`).

---

## **Projects** (\`/api/projects\`)
Workspace container controls adhering strictly to Subscription tier limits.
- \`GET /\` — Array of accessible, un-archived projects.
- \`POST /\` — Payload requires \`wizardAnswers\` map. Bounces back 403 on max allowance exceeded.
- \`GET /:id\` — Pull direct project container references.
- \`PATCH /:id\` — Target nested objects.
- \`DELETE /:id\` — Silent flips \`isArchived\` = true; no cascade delete enforced for security.
- \`POST /:id/generate\` — Asynchronous fire-and-forget orchestrator spawning the Llama AI generators.

---

## **Documents** (\`/api/projects/:projectId/documents\`)
Files bound dynamically via Project ID nesting.
- \`GET /\` — Pulls down array map of generated outputs securely.
- \`GET /:type\` — Queries via exact match (e.g. \`prd\`, \`dbSchema\`).
- \`PATCH /:type\` — **REQUIRES PRO/TEAM**. Patches text chunk inline safely overriding current blocks.

---

## **Notifications** (\`/api/notifications\`)
In-app bell system. Events spawned securely from AI failure/completion hooks or billing events.
- \`GET /\` — Feed array limit 50. Append \`?unread=true\` to filter natively.
- \`PATCH /read-all\` — Rapid sweep to zero active pings.
- \`PATCH /:id/read\` — Acknowledge specific UI ping block.

---

## **Subscriptions** (\`/api/subscriptions\`)
- \`GET /me\` — Securely checks Stripe validity & outputs projectLimits count.
- \`POST /checkout\` — Builds Stripe redirect URL binding user parameters. Supports \`plan\` equals "pro" or "team".
