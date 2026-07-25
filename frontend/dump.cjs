const fs = require('fs');
const path = require('path');
const folders = ['pages', 'components', 'services', 'routes', 'context'];
const baseDir = path.join(__dirname, 'src');

let fullDump = '';
const getFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) { 
      results = results.concat(getFiles(full));
    } else if (full.endsWith('.jsx') || full.endsWith('.js') || full.endsWith('.css')) { 
      results.push(full);
    }
  });
  return results;
}

folders.forEach(folder => {
  const fPath = path.join(baseDir, folder);
  if(fs.existsSync(fPath)) {
    const files = getFiles(fPath);
    files.forEach(f => {
      const content = fs.readFileSync(f, 'utf8');
      const relPath = path.relative(baseDir, f).replace(/\\/g, '/');
      fullDump += "\n\n==========================================\nFILE: " + relPath + "\nLINES: " + content.split('\n').length + "\n==========================================\n\n" + content;
    });
  }
});

fs.writeFileSync(path.join(__dirname, 'src_dump.txt'), fullDump);
console.log('Dump completed');
