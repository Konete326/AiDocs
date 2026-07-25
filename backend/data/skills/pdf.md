# PDF Skill

Teaches agent to create PDF documents programmatically.

## When to Use
When the user needs to export content as a .pdf file.

## Basic Usage (Node.js - Puppeteer)
```bash
npm install puppeteer
```

```js
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent('<h1>Hello World</h1>');
const pdf = await page.pdf({ format: 'A4' });
await browser.close();
```

## Alternative: html-pdf-node
```bash
npm install html-pdf-node
```

## Placeholder
This is a placeholder skill. Replace with project-specific PDF generation patterns.
