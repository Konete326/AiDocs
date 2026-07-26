# Agent Custom Rules — ClarifyAI & Generated Projects

## Rule — Non-Blocking Async Installations & Mandatory Runtime Verification

1. **Non-Blocking Development Work During Background Installations**:
   - Whenever long-running commands or package dependency installations (such as `npm install`, `npx create-next-app`, `npx create-vite-app`, `npm run build`, etc.) are launched in the background, the Agent MUST NOT pause, poll, or wait idle.
   - Immediately proceed to write source code files, React components, backend API routes, database schemas, utility functions, and system configurations while `node_modules` are downloading asynchronously in the background.

2. **Mandatory Runtime Verification**:
   - Before finishing any task or declaring success to the user, the Agent MUST verify that all background processes/installations have finished cleanly and execute empirical test or build commands (`npm run build` / `npm run test` / dev server check) to confirm zero runtime or build errors exist.
