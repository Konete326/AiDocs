# DOCX Skill

Teaches agent to create Word documents programmatically.

## When to Use
When the user needs to export content as a .docx file.

## Basic Usage (Node.js)
Use the `docx` npm package:
```bash
npm install docx
```

```js
const { Document, Paragraph, TextRun, Packer } = require('docx');
const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ children: [new TextRun('Hello World')] })
    ]
  }]
});
const buffer = await Packer.toBuffer(doc);
```

## Placeholder
This is a placeholder skill. Replace with project-specific DOCX patterns.
