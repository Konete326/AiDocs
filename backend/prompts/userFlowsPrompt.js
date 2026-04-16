module.exports = (wizardAnswers, context) => {
  return `You are a senior UX designer and product manager. Generate a highly detailed User Flows document in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Based on the PRD and SRD above, document all critical user flows covering: Onboarding Flow, Core Feature Flows (one per major feature from the PRD), Error & Edge Case Flows, and Admin Flows (if applicable). For each flow provide: Flow Name, Actor, Trigger, Steps (numbered), Success State, and Failure States. Include a Mermaid flowchart for the 2-3 most important flows.`;
};