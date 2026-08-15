
const fs = require('fs');
const content = fs.readFileSync('src/views/CatalogView.tsx', 'utf8');

let braces = 0;
let parens = 0;
let curlies = 0;
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  for (let j = 0; j < line.length; j++) {
    let char = line[j];
    if (char === '{') curlies++;
    if (char === '}') curlies--;
    if (char === '(') parens++;
    if (char === ')') parens--;
    if (char === '[') braces++;
    if (char === ']') braces--;
  }
  if (curlies < 0 || parens < 0 || braces < 0) {
    console.log(`Negative balance at line ${i + 1}: curlies=${curlies}, parens=${parens}, braces=${braces}`);
    // Reset to avoid cascading errors for simple count
    if (curlies < 0) curlies = 0;
    if (parens < 0) parens = 0;
    if (braces < 0) braces = 0;
  }
}

console.log(`Final balance: curlies=${curlies}, parens=${parens}, braces=${braces}`);
