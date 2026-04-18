# XLSX Skill

Teaches agent to create Excel documents programmatically.

## When to Use
When the user needs to export data as an .xlsx file.

## Basic Usage (Node.js)
```bash
npm install xlsx
```

```js
const XLSX = require('xlsx');

// Create a new workbook
const wb = XLSX.utils.book_new();

// Create a worksheet from data
const ws = XLSX.utils.json_to_sheet([
  { Name: "John Due", Age: 28 },
  { Name: "Jane Doe", Age: 32 }
]);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

// Write to buffer
const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
```

## Placeholder
This is a placeholder skill. Replace with project-specific XLSX generation patterns.
