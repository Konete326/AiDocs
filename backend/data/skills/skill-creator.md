# Skill Creator

Use this skill to create new skills for this project.

## What is a Skill
A skill is a markdown file that teaches an AI agent a specific
capability or set of rules for this codebase.

## Creating a New Skill
1. Create a folder: skills/{skill-name}/
2. Create SKILL.md inside it
3. Write clear, specific instructions
4. Include examples where helpful

## Skill File Structure
- What this skill does (1 sentence)
- When to use it
- Step-by-step instructions
- Examples
- What NOT to do

## Good Skill Principles
- Be specific, not generic
- Include real examples from the codebase
- Document anti-patterns clearly
- Keep it under 100 lines — focus on what matters

## Adding External Skills
Run: npx skills add <skill-url> --skill <skill-name>
