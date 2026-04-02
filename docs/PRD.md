# 📄 Product Requirement Document (PRD) — AiDocs

## Version 2.1 | Comprehensive Master Guide
**Title:** AiDocs — "Empowering Non-Tech Visionaries"
**Status:** Live / Active Development
**Date:** March 2026

---

## 1. Executive Summary
**AiDocs** is an AI-powered SaaS platform that bridges the gap between raw startup ideas and professional, production-ready documentation. It allows non-technical founders, students, and early-stage entrepreneurs to generate a full document suite (PRD, SRD, Tech Stack, Roadmap, etc.) by answering a series of business-focused questions.

---

## 2. Product Vision & Goals
- **Vision**: To democratize software planning by making it accessible to individuals without technical backgrounds.
- **Mission**: Automate the most technical and time-consuming parts of the product development lifecycle using state-of-the-art AI.
- **Key Goals**:
  - Reduce documentation time from weeks to minutes.
  - Produce docs high-quality enough to be used directly by AI coding agents (Claude, Cursor, etc.).
  - Provide a visual workspace for tracking product growth.

---

## 3. Target Audience & Personas
| Persona | Pain Point | Solution Provided |
| :--- | :--- | :--- |
| **Non-Tech Founder** | Can't articulate technical specs to devs. | Generates investor-ready docs & dev specs. |
| **Student Builder** | Planning takes longer than coding. | Skips the "blank page" problem. |
| **Freelancer** | Needs fast, professional specs for clients. | Rapid generation of high-quality documentation. |

---

## 4. Problem & Solution
- **The Problem**: Founders often have great ideas but lack the technical vocabulary to create detailed requirements. This leads to miscommunication, budget overruns, and project failure.
- **The Solution**: An interactive wizard that asks non-technical questions and uses AI (Llama 3.1 405B) to "translate" those answers into clinical, structured documentation.

---

## 5. Core Feature Matrix

### 5.1 Document Suite (The Core)
1. **Clinical PRD**: Vision, features, user stories, and KPIs.
2. **SRD (Software Requirements)**: Modular system architecture and API specs.
3. **Tech Stack**: AI-recommended tools (Frontend, Backend, DB, Hosting).
4. **DB Schema**: Detailed Mongoose/PostgreSQL models and relationships.
5. **User Flows**: Step-by-step logic for key actions.
6. **MVP Plan**: Phased development guide from launch to scaling.
7. **Folder Structure**: Clean architecture file/directory maps.
8. **Claude Context (`CLAUDE.md`)**: Specialized documentation for AI coding agents.
9. **Agent System Prompts**: Instructions for LLMs to build the code correctly.

### 5.2 Workspace Features (v2.0)
- **Interactive Wizard**: Step 0 selection for specific project types (SaaS, Mobile, AI, etc.).
- **Smart Kanban Board**: Drag-and-drop feature management linked to the PRD.
- **Milestone Tracker**: Visual timeline and deadline management.
- **AI Co-founder Chat**: Chat with an AI that knows your entire project context.
- **Pitch Deck Outline**: 10-slide outline for investor meetings.

---

## 6. Technical Architecture

### 6.1 Backend (Node.js + Express)
- **API Strategy**: RESTful API with structured responses.
- **Auth**: JWT with `httpOnly` refresh token rotation.
- **AI Service**: Custom wrapper with 4-level fallback (NVIDIA -> OpenRouter).
- **Concurrency**: PM2 cluster for load balancing.

### 6.2 Frontend (React + Tailwind)
- **Design System**: Global tokens for Glassmorphism and premium dark mode.
- **State Management**: Zustand for high-performance, lightweight state.
- **Animations**: Framer Motion for tactile feedback and smooth transitions.

### 6.3 Data Model (MongoDB)
- **Collections**: `users`, `projects`, `documents`, `subscriptions`, `skills`, `notifications`.
- **Indexing**: Compound indexes for performance on project and user lookups.

---

## 7. AI Reliability & Fallbacks
To ensure 100% uptime for document generation, we employ a **fail-safe cascade**:
1. **Primary**: NVIDIA NIM (`meta/llama-3.1-405b-instruct`).
2. **Backup 1**: OpenRouter (`meta-llama/llama-3.1-405b-instruct`).
3. **Backup 2**: OpenRouter (`meta-llama/llama-3.1-70b-instruct`).
4. **Deep Backup**: NVIDIA (`nvidia/llama-3.1-nemotron-70b-instruct`).

---

## 8. Development Roadmap

### Phase 1: Core Automation (Complete)
- 7-Step Wizard & PRD first flow.
- 9-Doc suite generation.
- Stripe/Google Auth integration.

### Phase 2: Workspace Expansion (In Progress)
- Kanban Board & Milestone integration.
- AI Project Chat with context injection.
- Smart suggestions card during the wizard.

### Phase 3: Scaling & Integration (Planned)
- Direct export to GitHub/GitLab.
- Team collaboration (multi-user workspace).
- AI Logic Flow (Auto-generating Mermaid diagrams).

---

## 9. Success Metrics (KPIs)
- **Time-to-Value**: Users should generate a PRD in < 60 seconds.
- **Doc Usability**: > 90% of docs should be usable by AI agents without major edits.
- **Conversion**: Target 12% Free -> Pro conversion through feature gating (ZIP download, unlimited projects).
- **Retention**: Monthly active project creation rate per user.

---
**Single Source of Truth**
*FounderDocs AI is built for the builders of tomorrow.*
